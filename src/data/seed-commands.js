/**
 * Seed commands to pre-populate the app with the user's learning commands.
 * Excludes non-FFmpeg commands (e.g. dir).
 */

import { parseCommand } from '../utils/commandParser';

const RAW_COMMANDS = [
  'ffprobe chopper.mp4',
  'ffprobe -v error chopper.mp4',
  'ffprobe -v error chopper.mp4 -show_format',
  'ffprobe -v error chopper.mp4 -show_format -show_streams',
  'ffprobe -v error chopper.mp4 -show_format -show_streams -print_format json',
  'ffprobe -v error chopper.mp4 -show_streams -select_streams v',
  'ffprobe -v error chopper.mp4 -show_streams -select_streams v -show_entries stream=codec_name',
  'ffprobe -v error chopper.mp4 -select_streams v -show_entries stream=codec_name',
  'ffprobe -v error chopper.mp4 -select_streams v -show_entries stream=codec_name -print_format default',
  'ffprobe -v error chopper.mp4 -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1=1:nokey=1',
  'ffprobe -v error chopper.mp4 -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1:nokey=1',
  'ffprobe -v error https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/1080/Big_Buck_Bunny_1080_10s_5MB.mp4 -show_format -show_streams -print_format json',
  'ffplay bunny.mp4',
  'ffplay bunny.mp4 -x 600 -y 600',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder',
  'ffplay -x 600 -y 600 -noborder -top 0 -left 0 bunny.mp4',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -top 0 -left 0',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -fs',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -an',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -vn',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -showmode waves',
  'ffplay bunny.mp4 -x 600 -y 600 -noborder -loop 0',
];

export function createSeedCommands() {
  const baseTime = Date.now();
  return RAW_COMMANDS.map((raw, i) => ({
    id: `seed-${i}`,
    raw,
    parts: parseCommand(raw),
    createdAt: new Date(baseTime - (RAW_COMMANDS.length - i) * 60000).toISOString(),
    order: baseTime + i,
    notes: '',
    tags: [],
  }));
}
