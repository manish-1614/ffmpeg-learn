import { useState, useEffect } from 'react'
import './NotesSection.css'

function formatNoteContent(content) {
  const lines = content.split('\n')
  const result = []
  let listItems = []

  const flushList = () => {
    if (listItems.length > 0) {
      result.push(
        <ul key={result.length} className="note-ul">
          {listItems.map((text, i) => (
            <li key={i} className="note-li">{text}</li>
          ))}
        </ul>
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList()
      result.push(<h3 key={`h3-${i}`} className="note-h3">{line.slice(3)}</h3>)
    } else if (line.startsWith('### ')) {
      flushList()
      result.push(<h4 key={`h4-${i}`} className="note-h4">{line.slice(4)}</h4>)
    } else if (line.startsWith('- ') || /^-\s*/.test(line)) {
      listItems.push(line.replace(/^-\s*/, ''))
    } else if (line.trim() === '') {
      flushList()
      result.push(<br key={`br-${i}`} />)
    } else {
      flushList()
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      const formatted = parts.map((part, j) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={j}>{part.slice(2, -2)}</strong>
          : part
      )
      result.push(<p key={`p-${i}`} className="note-p">{formatted}</p>)
    }
  })
  flushList()
  return result
}

function NoteCard({ note, isExpanded, onExpand }) {
  const { title, content } = note

  return (
    <article className="note-card">
      <header
        className="note-card-header"
        onClick={() => onExpand()}
      >
        <h3 className="note-card-title">{title}</h3>
        <span className="note-card-toggle">{isExpanded ? '▼' : '▶'}</span>
      </header>
      {isExpanded && (
        <div className="note-card-body">
          <div className="note-content">
            {formatNoteContent(content)}
          </div>
        </div>
      )}
    </article>
  )
}

export default function NotesSection({ notes, selectedNoteId, onSelectNote }) {
  return (
    <section className="section notes-section">
      <h2>Learning Notes</h2>
      <p className="notes-section-hint">
        Concept notes and definitions to support your FFmpeg learning journey.
      </p>
      {notes.length === 0 ? (
        <p className="empty-state">No notes yet. Add concept notes as you learn.</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isExpanded={selectedNoteId === note.id}
              onExpand={() => onSelectNote(selectedNoteId === note.id ? null : note.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
