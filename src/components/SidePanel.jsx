import { groupCommandsByTool } from '../utils/commandUtils'
import './SidePanel.css'

const TOOL_LABELS = { ffprobe: 'FFprobe', ffplay: 'FFplay', ffmpeg: 'FFmpeg' };

export default function SidePanel({ commands, selectedId, onSelectCommand, onSearch, searchQuery, isOpen, onToggle }) {
  const grouped = groupCommandsByTool(commands);

  return (
    <>
      <button
        type="button"
        className={`side-panel-toggle ${isOpen ? 'side-panel-toggle-panel-open' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close library' : 'Open library'}
        title={isOpen ? 'Close library' : 'Open library'}
      >
        {isOpen ? '◀' : '▶'}
      </button>
      <aside className={`side-panel ${isOpen ? 'side-panel-open' : ''}`}>
        <div className="side-panel-header">
          <h2>Command Library</h2>
          <p className="side-panel-hint">Click a command to view breakdown</p>
          {onSearch && (
            <input
              type="search"
              className="side-panel-search"
              placeholder="Search commands, notes…"
              value={searchQuery ?? ''}
              onChange={(e) => onSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        <nav className="side-panel-nav">
          {(['ffprobe', 'ffplay', 'ffmpeg']).map((tool) => {
            const items = grouped[tool] || [];
            if (items.length === 0) return null;
            return (
              <div key={tool} className="nav-category">
                <h3 className="nav-category-title">{TOOL_LABELS[tool]}</h3>
                <ul className="nav-command-list">
                  {items.map((cmd) => (
                    <li key={cmd.id}>
                      <button
                        type="button"
                        className={`nav-command-btn ${selectedId === cmd.id ? 'nav-command-btn-active' : ''}`}
                        onClick={() => onSelectCommand(cmd.id)}
                        title={cmd.raw}
                      >
                        <code className="nav-command-preview">
                          {cmd.raw.length > 48 ? cmd.raw.slice(0, 45) + '…' : cmd.raw}
                        </code>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
        {commands.length === 0 && (
          <p className="side-panel-empty">No commands yet. Add one above.</p>
        )}
      </aside>
    </>
  );
}
