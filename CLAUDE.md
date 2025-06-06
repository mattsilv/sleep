# Project-Specific Instructions for Claude

## Python Script Execution Best Practices

When running Python scripts in this project:

1. **Use uv for Python dependency management**
   - Always use `uv run python` to execute scripts (ensures correct environment)
   - Example: `uv run python audio-utilities/analyze_audio.py`

2. **Path handling**
   - Use absolute paths when running scripts from different directories
   - The audio-utilities folder has its own virtual environment managed by uv

3. **Working with audio-utilities**
   - Scripts are in `audio-utilities/` directory
   - Dependencies are managed via `pyproject.toml`
   - Virtual environment is at `audio-utilities/.venv/`

## Audio Processing Workflow

- Raw audio files from 11Labs should be placed in `audio-utilities/input/`
- Processed files will be saved to `audio-utilities/output/`
- The analyze script will process all files in the input folder

## Project Structure Notes

- Main app: React-based meditation app
- Audio files: Located in `public/` directory
- Audio utilities: Python scripts for audio analysis and optimization