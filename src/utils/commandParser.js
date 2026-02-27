/**
 * Parses FFmpeg/FFprobe/FFplay commands and generates explanations for each part.
 * Groups options with their values (e.g. -x 600 as one unit) for intelligent display.
 */

import ffmpegKnowledge from '../data/ffmpeg-knowledge.json';

const FFPROBE_OPTS = ffmpegKnowledge.ffprobe_options;
const FFMPEG_OPTS = ffmpegKnowledge.ffmpeg_options;
const FFPLAY_OPTS = ffmpegKnowledge.ffplay_options || {};
const ALL_OPTS = { ...FFPROBE_OPTS, ...FFMPEG_OPTS, ...FFPLAY_OPTS };

// Options that are boolean flags – they never take a separate value
const BOOLEAN_FLAGS = new Set([
  '-noborder', '-fs', '-an', '-vn'
]);

// Options that take a value (used when option not in knowledge base – pair anyway if next token looks like value)
const OPTS_TAKE_VALUE = new Set([
  '-x', '-y', '-top', '-left', '-v', '-t', '-ss', '-to', '-loop', '-showmode',
  '-show_entries', '-select_streams', '-print_format', '-i', '-c', '-codec',
  '-f', '-filter', '-filter_complex', '-map'
]);

/**
 * Returns true if the next token looks like a value for the previous option (not a new flag).
 */
function looksLikeValue(token, optKey) {
  if (!token || token.startsWith('-')) return false;
  // -i (input) accepts paths and URLs as values
  if (optKey === '-i') return true;
  if (isUrl(token) && optKey !== '-i') return false;
  // Paths (e.g. file.mp4) are usually inputs, not option values – except for -i
  if (isPath(token) && !/^-?\d+$/.test(token)) return false;
  // Numeric values (pixels, duration, etc.)
  if (/^-?\d+$/.test(token) || /^\d+\.\d+$/.test(token)) return true;
  // Keywords: error, json, default, waves, etc.
  if (/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(token) && token.length < 30) return true;
  // Key=value format for -show_entries
  if (token.includes('=')) return true;
  return false;
}

/**
 * Returns true if this option takes a value (we should pair with next token).
 */
function optionTakesValue(optKey, optInfo) {
  if (BOOLEAN_FLAGS.has(optKey)) return false;
  if (optInfo?.values) return true;
  if (OPTS_TAKE_VALUE.has(optKey)) return true;
  return false;
}

/**
 * Tokenizes a command string, respecting quoted strings.
 */
function tokenize(command) {
  const tokens = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < command.length; i++) {
    const char = command[i];
    if (inQuotes) {
      if (char === quoteChar) {
        inQuotes = false;
        if (current) tokens.push(current);
        current = '';
      } else {
        current += char;
      }
    } else if (char === '"' || char === "'") {
      inQuotes = true;
      quoteChar = char;
      if (current.trim()) tokens.push(current.trim());
      current = '';
    } else if (char === ' ' || char === '\t') {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += char;
    }
  }
  if (current.trim()) tokens.push(current.trim());
  return tokens;
}

function isUrl(token) {
  return /^(https?|rtsp|rtmp|ftp|sftp):\/\//i.test(token) || token.startsWith('www.');
}

function isPath(token) {
  if (token.startsWith('-')) return false;
  return /^[./]|^[A-Za-z]:\/|^~\//.test(token) ||
    (token.includes('.') && !token.startsWith('-') && token.length > 3);
}

export function parseCommand(command) {
  const tokens = tokenize(command.trim());
  const parts = [];
  let tool = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];
    const optKey = token.startsWith('-') ? token.split('=')[0] : null;

    let part = {
      raw: token,
      type: 'unknown',
      explanation: null,
      details: null
    };

    // Detect tool (first non-flag token)
    if (!tool && !token.startsWith('-')) {
      const baseName = token.split(/[/\\]/).pop().toLowerCase().replace(/\.(exe|bin)$/, '');
      if (ffmpegKnowledge.tools[baseName]) {
        tool = baseName;
        part.type = 'tool';
        part.explanation = ffmpegKnowledge.tools[baseName].description;
        part.details = ffmpegKnowledge.tools[baseName].docs;
      } else if (baseName.includes('ffprobe') || baseName.includes('ffmpeg')) {
        tool = baseName.includes('ffprobe') ? 'ffprobe' : 'ffmpeg';
        part.type = 'tool';
        part.explanation = ffmpegKnowledge.tools[tool]?.description || `Invokes ${token}`;
        part.details = ffmpegKnowledge.tools[tool]?.docs || '';
      }
    }

    if (token.startsWith('-')) {
      const lookupKey = optKey;
      let optInfo = FFPROBE_OPTS[lookupKey] || FFMPEG_OPTS[lookupKey] || FFPLAY_OPTS[lookupKey] || ALL_OPTS[lookupKey];

      if (!optInfo) {
        for (const key of Object.keys(ALL_OPTS)) {
          if (key === token || token.startsWith(key + '=')) {
            optInfo = ALL_OPTS[key];
            break;
          }
        }
      }

      const shouldPair = optionTakesValue(optKey, optInfo) && looksLikeValue(nextToken, optKey);
      const optWithValue = shouldPair ? { token: nextToken } : null;

      if (optInfo) {
        part.type = 'option';
        part.explanation = optInfo.description;
        part.details = optInfo.docs || '';

        if (optWithValue) {
          part.raw = `${token} ${nextToken}`;
          if (optInfo.values && optInfo.values[nextToken]) {
            part.valueExplanation = optInfo.values[nextToken];
          } else if (optKey === '-show_entries' && nextToken.includes('=')) {
            part.valueExplanation = `Selects entries: ${nextToken}. Format: stream=key1,key2 or format=key1. Common keys: codec_name, width, height.`;
          } else if (optKey === '-print_format') {
            const baseFormat = nextToken.split('=')[0];
            if (nextToken.includes(':') || (nextToken.includes('=') && baseFormat !== nextToken)) {
              part.valueExplanation = `Format: ${baseFormat} with options. noprint_wrappers=1 removes [STREAM] wrappers; nokey=1 outputs values only.`;
            } else {
              part.valueExplanation = optInfo.values?.[baseFormat] || optInfo.values?.default || nextToken;
            }
          } else if (optKey === '-select_streams' && /^[vas](:\d+)?$/.test(nextToken)) {
            part.valueExplanation = optInfo.values?.[nextToken[0]] || optInfo.values?.[nextToken] ||
              `Stream: ${nextToken} (v=video, a=audio, s=subtitle).`;
          } else if (optKey === '-x' || optKey === '-y' || optKey === '-top' || optKey === '-left') {
            part.valueExplanation = `${nextToken} pixels`;
          } else if (optKey === '-loop') {
            part.valueExplanation = optInfo.values?.[nextToken] || (nextToken === '0' || nextToken === '-1' ? 'Loop forever' : nextToken);
          } else {
            part.valueExplanation = optInfo.values?.[nextToken] ?? nextToken;
          }
          i++;
        } else if (token.includes('=')) {
          const [, val] = token.split(/=(.+)/);
          if (optInfo.values?.[val]) {
            part.valueExplanation = optInfo.values[val];
          } else if (optKey === '-print_format' && val?.includes(':')) {
            part.valueExplanation = `Format options: ${val}. noprint_wrappers=1, nokey=1 for compact output.`;
          }
        }
      } else {
        part.type = 'option';
        if (optWithValue) {
          part.raw = `${token} ${nextToken}`;
          part.explanation = `Option with value.`;
          part.valueExplanation = nextToken;
          part.details = 'Documentation for this option may not be in the knowledge base yet.';
          i++;
        } else {
          part.explanation = `Flag: ${token}`;
          part.details = 'Documentation for this option may not be in the knowledge base yet. Consider adding it.';
        }
      }
    } else if (part.type !== 'tool') {
      if (isUrl(token)) {
        part.type = 'input';
        part.explanation = ffmpegKnowledge.input_types.url.description;
        part.details = ffmpegKnowledge.input_types.url.docs;
      } else if (isPath(token) && tool) {
        part.type = 'input';
        part.explanation = 'Local file path or input source.';
        part.details = ffmpegKnowledge.input_types.path?.docs || 'Path to the media file.';
      }
    }

    parts.push(part);
  }

  return parts;
}
