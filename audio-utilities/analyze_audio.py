#!/usr/bin/env python3
"""
Audio Analysis Tool
Analyzes audio files and provides optimization recommendations for web usage.
"""

import os
import sys
import json
from pathlib import Path
from typing import Dict, Any, List, Tuple
from datetime import datetime

def get_file_size(file_path: Path) -> Tuple[int, str]:
    """Get file size in bytes and human-readable format."""
    size_bytes = file_path.stat().st_size
    
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return size_bytes, f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    
    return size_bytes * 1024, f"{size_bytes:.2f} GB"

def analyze_audio_metadata(file_path: Path) -> Dict[str, Any]:
    """Analyze audio file using mutagen for metadata."""
    try:
        from mutagen import File
        from mutagen.mp3 import MP3
        
        audio = File(file_path)
        
        if audio is None:
            return {"error": "Unable to read audio file"}
        
        metadata = {
            "format": audio.mime[0] if audio.mime else "unknown",
            "length_seconds": audio.info.length if hasattr(audio.info, 'length') else 0,
            "length_formatted": f"{int(audio.info.length // 60)}:{int(audio.info.length % 60):02d}" if hasattr(audio.info, 'length') else "unknown"
        }
        
        # For MP3 files, get additional info
        if isinstance(audio, MP3):
            metadata.update({
                "bitrate": audio.info.bitrate,
                "bitrate_mode": audio.info.bitrate_mode.name if hasattr(audio.info.bitrate_mode, 'name') else "unknown",
                "sample_rate": audio.info.sample_rate,
                "channels": audio.info.channels,
                "encoder": audio.info.encoder_info if hasattr(audio.info, 'encoder_info') else "unknown"
            })
        else:
            # Generic info for other formats
            if hasattr(audio.info, 'bitrate'):
                metadata["bitrate"] = audio.info.bitrate
            if hasattr(audio.info, 'sample_rate'):
                metadata["sample_rate"] = audio.info.sample_rate
            if hasattr(audio.info, 'channels'):
                metadata["channels"] = audio.info.channels
                
        return metadata
        
    except ImportError:
        return {"error": "mutagen not installed. Run: pip install mutagen"}
    except Exception as e:
        return {"error": f"Error analyzing file: {str(e)}"}

def get_optimization_recommendations(file_path: Path, metadata: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Generate optimization recommendations based on file analysis."""
    recommendations = []
    file_size_bytes, file_size_human = get_file_size(file_path)
    
    # File size recommendations
    if file_size_bytes > 10 * 1024 * 1024:  # > 10MB
        recommendations.append({
            "priority": "high",
            "category": "file_size",
            "issue": f"Large file size ({file_size_human})",
            "recommendation": "Consider compressing to 128kbps for speech content",
            "command": f"ffmpeg -i \"{file_path.name}\" -b:a 128k -ar 44100 \"{file_path.stem}_optimized.mp3\""
        })
    
    # Bitrate recommendations
    bitrate = metadata.get("bitrate", 0)
    if bitrate > 192000:  # > 192kbps
        recommendations.append({
            "priority": "high",
            "category": "bitrate",
            "issue": f"High bitrate ({bitrate // 1000}kbps) for speech content",
            "recommendation": "128kbps is sufficient for speech/meditation audio",
            "command": f"ffmpeg -i \"{file_path.name}\" -b:a 128k \"{file_path.stem}_128k.mp3\""
        })
    
    # Sample rate recommendations
    sample_rate = metadata.get("sample_rate", 0)
    if sample_rate > 44100:
        recommendations.append({
            "priority": "medium",
            "category": "sample_rate",
            "issue": f"High sample rate ({sample_rate}Hz)",
            "recommendation": "44.1kHz is standard for web audio",
            "command": f"ffmpeg -i \"{file_path.name}\" -ar 44100 \"{file_path.stem}_44k.mp3\""
        })
    
    # Format recommendations
    if file_path.suffix.lower() not in ['.mp3', '.m4a', '.webm', '.ogg']:
        recommendations.append({
            "priority": "high",
            "category": "format",
            "issue": f"Non-web-optimized format ({file_path.suffix})",
            "recommendation": "Convert to MP3 for maximum compatibility",
            "command": f"ffmpeg -i \"{file_path.name}\" -b:a 128k -ar 44100 \"{file_path.stem}.mp3\""
        })
    
    # Stereo to mono for speech
    channels = metadata.get("channels", 0)
    if channels > 1:
        recommendations.append({
            "priority": "low",
            "category": "channels",
            "issue": "Stereo audio for speech content",
            "recommendation": "Consider converting to mono to reduce file size",
            "command": f"ffmpeg -i \"{file_path.name}\" -ac 1 \"{file_path.stem}_mono.mp3\""
        })
    
    # Combined optimization command
    if recommendations:
        recommendations.append({
            "priority": "recommended",
            "category": "combined",
            "issue": "Combined optimization",
            "recommendation": "Apply all optimizations in one command",
            "command": f"ffmpeg -i \"{file_path.name}\" -b:a 128k -ar 44100 -ac 1 \"{file_path.stem}_web_optimized.mp3\""
        })
    
    return recommendations

def analyze_audio_file(file_path: str) -> None:
    """Main function to analyze audio file and provide recommendations."""
    path = Path(file_path)
    
    if not path.exists():
        print(f"Error: File '{file_path}' not found")
        return
    
    print(f"\n🎵 Analyzing: {path.name}")
    print("=" * 60)
    
    # Get file info
    file_size_bytes, file_size_human = get_file_size(path)
    print(f"📁 File size: {file_size_human}")
    
    # Analyze metadata
    metadata = analyze_audio_metadata(path)
    
    if "error" in metadata:
        print(f"\n❌ {metadata['error']}")
        return
    
    # Display metadata
    print(f"\n📊 Audio Properties:")
    for key, value in metadata.items():
        if key not in ["error"]:
            print(f"  • {key.replace('_', ' ').title()}: {value}")
    
    # Get recommendations
    recommendations = get_optimization_recommendations(path, metadata)
    
    if recommendations:
        print(f"\n💡 Optimization Recommendations:")
        
        # Group by priority
        high_priority = [r for r in recommendations if r["priority"] == "high"]
        medium_priority = [r for r in recommendations if r["priority"] == "medium"]
        low_priority = [r for r in recommendations if r["priority"] == "low"]
        combined = [r for r in recommendations if r["priority"] == "recommended"]
        
        if high_priority:
            print("\n🔴 High Priority:")
            for rec in high_priority:
                print(f"  • {rec['issue']}")
                print(f"    → {rec['recommendation']}")
                
        if medium_priority:
            print("\n🟡 Medium Priority:")
            for rec in medium_priority:
                print(f"  • {rec['issue']}")
                print(f"    → {rec['recommendation']}")
                
        if low_priority:
            print("\n🟢 Low Priority:")
            for rec in low_priority:
                print(f"  • {rec['issue']}")
                print(f"    → {rec['recommendation']}")
        
        if combined:
            print("\n🚀 Recommended Command:")
            print(f"  {combined[0]['command']}")
            
        # Estimate savings
        if bitrate := metadata.get("bitrate"):
            current_size_mb = file_size_bytes / (1024 * 1024)
            estimated_size_mb = (128000 / bitrate) * current_size_mb
            if metadata.get("channels", 1) > 1:
                estimated_size_mb *= 0.6  # Additional savings from stereo to mono
            savings_percent = ((current_size_mb - estimated_size_mb) / current_size_mb) * 100
            
            print(f"\n💾 Estimated size reduction: {savings_percent:.1f}%")
            print(f"   Current: {current_size_mb:.1f}MB → Optimized: {estimated_size_mb:.1f}MB")
    else:
        print("\n✅ File appears to be already optimized for web usage!")
    
    print("\n" + "=" * 60)

def process_input_folder():
    """Process all audio files in the input folder."""
    script_dir = Path(__file__).parent
    input_dir = script_dir / "input"
    output_dir = script_dir / "output"
    
    if not input_dir.exists():
        print(f"Error: Input directory '{input_dir}' not found")
        return
    
    # Find all audio files in input directory
    audio_extensions = [".mp3", ".wav", ".m4a", ".ogg", ".flac", ".aac"]
    audio_files = []
    
    for ext in audio_extensions:
        audio_files.extend(input_dir.glob(f"*{ext}"))
        audio_files.extend(input_dir.glob(f"*{ext.upper()}"))
    
    if not audio_files:
        print(f"\n📂 No audio files found in {input_dir}")
        print("\nSupported formats: MP3, WAV, M4A, OGG, FLAC, AAC")
        print("\nPlace your audio files from 11Labs in the 'input' folder and run this script again.")
        return
    
    print(f"\n🔍 Found {len(audio_files)} audio file(s) to analyze")
    print("=" * 60)
    
    # Create analysis report
    report_lines = []
    report_lines.append(f"Audio Analysis Report")
    report_lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report_lines.append("=" * 60)
    report_lines.append("")
    
    for i, audio_file in enumerate(audio_files, 1):
        print(f"\n[{i}/{len(audio_files)}] Processing: {audio_file.name}")
        analyze_audio_file(str(audio_file))
        
        # Add to report
        report_lines.append(f"File {i}: {audio_file.name}")
        file_size_bytes, file_size_human = get_file_size(audio_file)
        metadata = analyze_audio_metadata(audio_file)
        
        if "error" not in metadata:
            report_lines.append(f"  Size: {file_size_human}")
            report_lines.append(f"  Duration: {metadata.get('length_formatted', 'unknown')}")
            report_lines.append(f"  Bitrate: {metadata.get('bitrate', 'unknown')}")
            report_lines.append(f"  Sample Rate: {metadata.get('sample_rate', 'unknown')}Hz")
            report_lines.append("")
    
    # Save report
    report_path = output_dir / "analysis_report.txt"
    report_path.write_text("\n".join(report_lines))
    print(f"\n📄 Analysis report saved to: {report_path}")
    
    print("\n✅ All files processed!")
    print(f"\n💡 To optimize these files, run the suggested ffmpeg commands")
    print(f"   and save the output files to: {output_dir}")

def main():
    """Main entry point."""
    if len(sys.argv) > 1:
        # If a file is specified, analyze just that file
        analyze_audio_file(sys.argv[1])
    else:
        # Otherwise, process all files in the input folder
        process_input_folder()

if __name__ == "__main__":
    main()