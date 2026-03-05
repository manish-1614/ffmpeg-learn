/**
 * localStorage helpers for concept/learning notes (no database).
 */

import { createSeedNotes } from '../data/seed-notes';

const STORAGE_KEY = 'ffmpeg-learn-notes';
const SEED_INITIALIZED_KEY = 'ffmpeg-learn-notes-initialized';

export function loadNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    let notes = data ? JSON.parse(data) : [];

    if (notes.length === 0 && !localStorage.getItem(SEED_INITIALIZED_KEY)) {
      notes = createSeedNotes();
      saveNotes(notes);
      localStorage.setItem(SEED_INITIALIZED_KEY, '1');
    }
    return notes;
  } catch {
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch {
    return false;
  }
}

export function addNote(noteData) {
  const notes = loadNotes();
  const newNote = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...noteData,
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
}

export function updateNote(id, updates) {
  const notes = loadNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...updates };
  saveNotes(notes);
  return notes[idx];
}

export function removeNote(id) {
  const notes = loadNotes().filter((n) => n.id !== id);
  saveNotes(notes);
  return notes;
}
