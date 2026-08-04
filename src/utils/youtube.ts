/**
 * Utility function to extract YouTube video ID from various YouTube URL formats
 * e.g.,
 * https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * https://youtu.be/dQw4w9WgXcQ
 * https://www.youtube.com/embed/dQw4w9WgXcQ
 * https://www.youtube.com/v/dQw4w9WgXcQ
 * dQw4w9WgXcQ
 */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  
  // Direct 11-char ID check
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regular expression for extracting YouTube ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return null;
}

/**
 * Returns a high quality thumbnail URL for a given YouTube video ID
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
