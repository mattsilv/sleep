// Helper functions for the audio player components

/**
 * Formats seconds into minutes:seconds format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (e.g. "5:23")
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};