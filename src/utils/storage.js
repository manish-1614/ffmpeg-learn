/**
 * localStorage helpers for persisting commands (no database).
 */

import { createSeedCommands } from '../data/seed-commands';
import { parseCommand } from '../utils/commandParser';
import { getCommandTool } from '../utils/commandUtils';

const STORAGE_KEY = 'ffmpeg-learn-commands';
const SEED_INITIALIZED_KEY = 'ffmpeg-learn-seed-initialized';

export function loadCommands() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    let commands = data ? JSON.parse(data) : [];

    if (commands.length === 0 && !localStorage.getItem(SEED_INITIALIZED_KEY)) {
      commands = createSeedCommands();
      saveCommands(commands);
      localStorage.setItem(SEED_INITIALIZED_KEY, '1');
    }

    // Ensure order for backward compat
    commands = commands.map((cmd, i) => ({
      ...cmd,
      order: cmd.order ?? (cmd.createdAt ? new Date(cmd.createdAt).getTime() : i),
      notes: cmd.notes ?? '',
      tags: cmd.tags ?? [],
    }));

    // Re-parse each command for fresh parts
    commands = commands.map((cmd) => ({
      ...cmd,
      parts: parseCommand(cmd.raw),
    }));
    return commands;
  } catch {
    return [];
  }
}

export function saveCommands(commands) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(commands));
    return true;
  } catch {
    return false;
  }
}

export function addCommand(commandData) {
  const commands = loadCommands();
  const maxOrder = Math.max(0, ...commands.map((c) => c.order ?? 0));
  const newCmd = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    order: maxOrder + 1,
    notes: commandData.notes ?? '',
    tags: commandData.tags ?? [],
    ...commandData,
  };
  commands.push(newCmd);
  saveCommands(commands);
  return newCmd;
}

export function updateCommand(id, updates) {
  const commands = loadCommands();
  const idx = commands.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  commands[idx] = { ...commands[idx], ...updates };
  saveCommands(commands);
  return commands[idx];
}

export function removeCommand(id) {
  const commands = loadCommands().filter((c) => c.id !== id);
  saveCommands(commands);
  return commands;
}

/**
 * Move a command up or down within its tool category.
 */
export function reorderCommand(id, direction) {
  const commands = loadCommands();
  const inCategory = commands
    .filter((c) => getCommandTool(c) === getCommandTool(commands.find((x) => x.id === id)))
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
  const idx = inCategory.findIndex((c) => c.id === id);
  if (idx === -1) return commands;

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= inCategory.length) return commands;

  const idToSwap = inCategory[swapIdx].id;
  const cmdById = Object.fromEntries(commands.map((c) => [c.id, c]));
  const o1 = cmdById[id].order;
  const o2 = cmdById[idToSwap].order;
  cmdById[id].order = o2;
  cmdById[idToSwap].order = o1;
  saveCommands(commands);
  return loadCommands();
}
