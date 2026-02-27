/**
 * Command utilities: tool detection, grouping, ordering.
 */

const TOOLS = ['ffprobe', 'ffplay', 'ffmpeg'];

export function getCommandTool(command) {
  if (!command?.raw) return null;
  const firstToken = command.raw.trim().split(/\s+/)[0];
  const baseName = firstToken.split(/[/\\]/).pop().toLowerCase().replace(/\.(exe|bin)$/, '');
  return TOOLS.includes(baseName) ? baseName : null;
}

export function groupCommandsByTool(commands) {
  const groups = { ffprobe: [], ffplay: [], ffmpeg: [] };
  for (const cmd of commands) {
    const tool = getCommandTool(cmd);
    if (tool && groups[tool]) {
      groups[tool].push(cmd);
    }
  }
  for (const tool of TOOLS) {
    groups[tool].sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
  }
  return groups;
}

export function filterCommands(commands, search) {
  if (!search.trim()) return commands;
  const q = search.toLowerCase().trim();
  return commands.filter(
    (cmd) =>
      cmd.raw?.toLowerCase().includes(q) ||
      cmd.notes?.toLowerCase().includes(q) ||
      (cmd.tags ?? []).some((t) => t.toLowerCase().includes(q))
  );
}
