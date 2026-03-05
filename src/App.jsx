import { useState, useEffect } from 'react'
import { parseCommand } from './utils/commandParser'
import { loadCommands, addCommand, removeCommand, updateCommand, reorderCommand } from './utils/storage'
import { loadNotes } from './utils/notesStorage'
import { filterCommands } from './utils/commandUtils'
import AddCommandForm from './components/AddCommandForm'
import CommandLibrary from './components/CommandLibrary'
import NotesSection from './components/NotesSection'
import SidePanel from './components/SidePanel'
import VideoReferences from './components/VideoReferences'
import ConfirmDialog from './components/ConfirmDialog'
import './App.css'

function App() {
  const [commands, setCommands] = useState([])
  const [notes, setNotes] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [sidePanelOpen, setSidePanelOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [removeConfirmId, setRemoveConfirmId] = useState(null)
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    setCommands(loadCommands())
    setNotes(loadNotes())
  }, [])

  useEffect(() => {
    if (addSuccess) {
      const t = setTimeout(() => setAddSuccess(false), 3000)
      return () => clearTimeout(t)
    }
  }, [addSuccess])

  const filteredCommands = filterCommands(commands, searchQuery)

  const handleAddCommand = (rawCommand, notes = '') => {
    const parts = parseCommand(rawCommand)
    const newCmd = addCommand({ raw: rawCommand, parts, notes })
    setCommands(loadCommands())
    setSelectedId(newCmd.id)
    setAddSuccess(true)
  }

  const handleRemoveRequest = (id) => {
    setRemoveConfirmId(id)
  }

  const handleRemoveConfirm = () => {
    if (removeConfirmId) {
      removeCommand(removeConfirmId)
      setCommands(loadCommands())
      if (selectedId === removeConfirmId) setSelectedId(null)
      setRemoveConfirmId(null)
    }
  }

  const handleUpdateCommand = (id, updates) => {
    updateCommand(id, updates)
    setCommands(loadCommands())
  }

  const handleReorderCommand = (id, direction) => {
    setCommands(reorderCommand(id, direction))
  }

  return (
    <div className="app">
      <SidePanel
        commands={filteredCommands}
        selectedId={selectedId}
        onSelectCommand={setSelectedId}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        isOpen={sidePanelOpen}
        onToggle={() => setSidePanelOpen((o) => !o)}
      />
      <div className={`app-content ${sidePanelOpen ? 'app-content-with-panel' : ''}`}>
        <header className="app-header">
          <h1>FFmpeg Learn</h1>
          <p className="tagline">Explore FFmpeg & FFprobe commands with auto-generated explanations</p>
        </header>

        <main className="app-main">
          <section className="section add-section">
            {addSuccess && <p className="add-success">✓ Command added! Expand it below to add your notes.</p>}
            <AddCommandForm onAdd={handleAddCommand} />
          </section>

          <NotesSection
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelectNote={setSelectedNoteId}
          />

          <section className="section commands-section">
            <h2>Command Library</h2>
            {commands.length === 0 ? (
              <p className="empty-state">
                No commands yet. Paste an FFmpeg or FFprobe command above and click &quot;Add &amp; Explain&quot; to get started.
              </p>
            ) : filteredCommands.length === 0 ? (
              <p className="empty-state">No commands match your search. Try a different term.</p>
            ) : (
              <CommandLibrary
                commands={filteredCommands}
                selectedId={selectedId}
                onExpand={setSelectedId}
                onRemove={handleRemoveRequest}
                onUpdate={handleUpdateCommand}
                onReorder={handleReorderCommand}
              />
            )}
          </section>

          <section className="section videos-section">
            <VideoReferences />
          </section>
        </main>

        <footer className="app-footer">
          <p>Place learning videos in the <code>videos/</code> folder</p>
        </footer>
      </div>

      <ConfirmDialog
        open={!!removeConfirmId}
        title="Remove command?"
        message="This will remove the command from your library. You can add it again later."
        confirmLabel="Remove"
        onConfirm={handleRemoveConfirm}
        onCancel={() => setRemoveConfirmId(null)}
      />
    </div>
  )
}

export default App
