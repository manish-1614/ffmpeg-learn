export default function VideoReferences() {
  return (
    <div className="video-refs">
      <h2>Learning Videos</h2>
      <p className="video-hint">
        Place your learning videos in the <code>videos/</code> directory.
        Reference them in commands using relative paths like <code>videos/myfile.mp4</code>.
      </p>
      <div className="video-list">
        <p className="empty-videos">No videos in <code>videos/</code> yet.</p>
      </div>
    </div>
  )
}
