import { useEffect, useRef, useState } from 'react'

export default function CommandCard({
  command,
  isExpanded,
  onExpand,
  onRemove,
  onUpdate,
  onReorder,
  isFirstInCategory,
  isLastInCategory,
}) {
  const { raw, parts, createdAt, notes } = command
  const cardRef = useRef(null)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesDraft, setNotesDraft] = useState(notes ?? '')

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isExpanded])

  useEffect(() => {
    setNotesDraft(notes ?? '')
  }, [notes])

  const handleSaveNotes = () => {
    onUpdate?.({ notes: notesDraft.trim() })
    setEditingNotes(false)
  }

  return (
    <article className="command-card" ref={cardRef}>
      <header className="card-header" onClick={() => onExpand()}>
        <pre className="card-raw">{raw}</pre>
        <div className="card-meta">
          <div className="card-actions">
            {onReorder && (
              <>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={(e) => { e.stopPropagation(); onReorder('up'); }}
                  disabled={isFirstInCategory}
                  title="Move up"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={(e) => { e.stopPropagation(); onReorder('down'); }}
                  disabled={isLastInCategory}
                  title="Move down"
                  aria-label="Move down"
                >
                  ↓
                </button>
              </>
            )}
            <span className="card-date">
              {new Date(createdAt).toLocaleDateString()}
            </span>
            <button
              type="button"
              className="btn-icon btn-remove"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              title="Remove command"
              aria-label="Remove command"
            >
              ×
            </button>
          </div>
        </div>
      </header>

      {isExpanded && (
        <div className="card-body">
          {(notes || editingNotes) && (
            <div className="card-notes">
              <h4 className="notes-label">My notes</h4>
              {editingNotes ? (
                <div className="notes-editor">
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="What did you learn? When would you use this?"
                    rows={3}
                    className="notes-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="notes-editor-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) => { e.stopPropagation(); setEditingNotes(false); setNotesDraft(notes ?? ''); }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => { e.stopPropagation(); handleSaveNotes(); }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="notes-content" onClick={(e) => { e.stopPropagation(); setEditingNotes(true); }}>
                  {notes || <span className="notes-placeholder">Click to add notes…</span>}
                </p>
              )}
            </div>
          )}
          {!notes && !editingNotes && (
            <button
              type="button"
              className="btn-add-notes"
              onClick={(e) => { e.stopPropagation(); setEditingNotes(true); }}
            >
              + Add learning notes
            </button>
          )}
          <h4 className="parts-title">Command breakdown</h4>
          <ul className="parts-list">
            {parts.map((part, i) => (
              <li key={i} className={`part part-${part.type}`}>
                <code className="part-raw">{part.raw}</code>
                {part.explanation && (
                  <p className="part-explanation">{part.explanation}</p>
                )}
                {part.valueExplanation && (
                  <p className="part-value">Value: {part.valueExplanation}</p>
                )}
                {part.details && (
                  <p className="part-details">{part.details}</p>
                )}
                {part.type === 'unknown' && !part.explanation && (
                  <p className="part-unknown">No explanation available for this token.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
