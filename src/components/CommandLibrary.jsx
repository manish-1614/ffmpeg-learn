import { groupCommandsByTool } from '../utils/commandUtils'
import CommandCard from './CommandCard'
import './CommandLibrary.css'

const TOOL_LABELS = {
  ffprobe: 'FFprobe',
  ffplay: 'FFplay',
  ffmpeg: 'FFmpeg',
};

const TOOL_DESCRIPTIONS = {
  ffprobe: 'Media stream analyzer — inspect format, streams, and metadata',
  ffplay: 'Media player — play video/audio from the command line',
  ffmpeg: 'Encode, decode, transcode — convert and stream media',
};

export default function CommandLibrary({ commands, selectedId, onExpand, onRemove, onUpdate, onReorder }) {
  const grouped = groupCommandsByTool(commands);

  return (
    <div className="command-library">
      {(['ffprobe', 'ffplay', 'ffmpeg']).map((tool) => {
        const items = grouped[tool] || [];
        if (items.length === 0) return null;
        return (
          <section key={tool} className="library-category">
            <header className="category-header">
              <h3 className="category-title">{TOOL_LABELS[tool]}</h3>
              <p className="category-desc">{TOOL_DESCRIPTIONS[tool]}</p>
              <span className="category-count">{items.length} command{items.length !== 1 ? 's' : ''}</span>
            </header>
            <div className="category-commands">
              {items.map((cmd, idx) => (
                <CommandCard
                  key={cmd.id}
                  command={cmd}
                  isExpanded={selectedId === cmd.id}
                  onExpand={() => onExpand(selectedId === cmd.id ? null : cmd.id)}
                  onRemove={() => onRemove(cmd.id)}
                  onUpdate={onUpdate ? (u) => onUpdate(cmd.id, u) : undefined}
                  onReorder={onReorder ? (dir) => onReorder(cmd.id, dir) : undefined}
                  isFirstInCategory={idx === 0}
                  isLastInCategory={idx === items.length - 1}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
