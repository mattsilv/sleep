# Audio Utilities

Tools for analyzing and optimizing audio files for web usage.

## Setup

Install dependencies using uv:

```bash
cd audio-utilities
uv pip install -e .
```

Or with pip:

```bash
cd audio-utilities
pip install -e .
```

## Usage

### Analyze Audio File

```bash
python analyze_audio.py /path/to/audio/file.mp3
```

This will analyze the audio file and provide recommendations for optimization, including:
- File size reduction
- Bitrate optimization
- Sample rate adjustment
- Format conversion
- Stereo to mono conversion for speech

## Dependencies

- Python 3.8+
- mutagen (for audio metadata analysis)
- ffmpeg (for audio conversion - must be installed separately)