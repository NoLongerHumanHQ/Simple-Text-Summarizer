// API endpoints
export const API_ENDPOINTS = {
  HUGGINGFACE: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
  OPENAI: 'https://api.openai.com/v1/chat/completions',
}

// Summary options
export const SUMMARY_LENGTH_OPTIONS = [
  { id: 'short', label: 'Short', description: 'Brief summary with key points only' },
  { id: 'medium', label: 'Medium', description: 'Balanced summary with main points and some details' },
  { id: 'long', label: 'Long', description: 'Comprehensive summary with most details included' },
]

export const SUMMARY_TYPE_OPTIONS = [
  { id: 'paragraph', label: 'Paragraph', description: 'Continuous text in paragraph form' },
  { id: 'bullet', label: 'Bullet Points', description: 'Key points in bullet form' },
  { id: 'key-points', label: 'Key Points', description: 'Numbered key takeaways' },
]

// Recommended text lengths
export const MIN_RECOMMENDED_CHARS = 500
export const MAX_RECOMMENDED_CHARS = 50000

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'text-summarizer-theme',
  HISTORY: 'text-summarizer-history',
}

// Summary history
export const MAX_HISTORY_ITEMS = 10 