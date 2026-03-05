/**
 * Seed concept notes for the learning journey.
 */

export function createSeedNotes() {
  return [
    {
      id: 'note-codec',
      title: 'Codec',
      content: `## Codec

**Codec** stands for **Coder Decoder**.

### Why encode?
- Raw media is very space-consuming
- Encoding compresses media for storage
- When using the media file, we must **decode** it

### Audio vs Video
- Audio and video use different encoding schemes
- They have separate codec families

### Video codecs
- **H.264** (AVC)
- **H.265** (HEVC)
- **VP9**
- **ProRes**
- **DNxHD**

### Audio codecs
- **PCM** (uncompressed)
- **AAC**
- **MP3**

### Container
A **container** is a package/wrapper for the media essence. It defines:
- File format
- How media data is organized in the file

### Video container examples
- **MP4**
- **MXF**
- **QT/MOV** (QuickTime)
- **MKV** (Matroska)

### Audio container examples
- **WAV**
- **M4A**

### Common combinations
- **H.264 + AAC** → MP4
- **ProRes + PCM** → MOV
- **DNxHD + PCM** → MXF`,
      createdAt: new Date().toISOString(),
    },
  ];
}
