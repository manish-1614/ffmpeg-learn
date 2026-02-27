import { useState } from 'react'

const EXAMPLE = 'ffprobe -v error https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/1080/Big_Buck_Bunny_1080_10s_5MB.mp4 -show_format -show_streams -print_format json'

export default function AddCommandForm({ onAdd }) {
  const [command, setCommand] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const trimmed = command.trim()
    if (!trimmed) {
      setError('Please enter a command.')
      return
    }
    if (!/ff(mpeg|probe|play)/i.test(trimmed)) {
      setError('Command should start with ffmpeg, ffprobe, or ffplay.')
      return
    }
    onAdd(trimmed, notes.trim())
    setCommand('')
    setNotes('')
    setShowNotes(false)
  }

  const fillExample = () => {
    setCommand(EXAMPLE)
    setError('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add FFmpeg Command</h2>
      <p className="form-hint">
        Paste an FFmpeg or FFprobe command below. Each part will be explained automatically.
      </p>
      <div className="input-group">
        <textarea
          className="command-input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="e.g. ffprobe -v error input.mp4 -show_format -show_streams -print_format json"
          rows={3}
          spellCheck={false}
        />
        {error && <p className="form-error">{error}</p>}
      </div>
      {showNotes ? (
        <div className="notes-group">
          <label className="notes-label-inline">Learning notes (optional)</label>
          <textarea
            className="command-input notes-input-inline"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you learn? When would you use this?"
            rows={2}
          />
          <button type="button" className="btn-text" onClick={() => setShowNotes(false)}>
            Hide notes
          </button>
        </div>
      ) : (
        <button type="button" className="btn-text" onClick={() => setShowNotes(true)}>
          + Add notes while adding
        </button>
      )}
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={fillExample}>
          Use example
        </button>
        <button type="submit" className="btn btn-primary">
          Add &amp; Explain
        </button>
      </div>
    </form>
  )
}
