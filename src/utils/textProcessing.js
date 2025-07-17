/**
 * Format the summary text according to the selected output type
 * @param {string} text - The summary text to format
 * @param {string} type - The format type: paragraph, bullet, or key-points
 * @returns {string} - The formatted summary
 */
export function formatSummary(text, type) {
  if (!text) return ''
  
  switch (type) {
    case 'bullet':
      return formatAsBulletPoints(text)
    case 'key-points':
      return formatAsKeyPoints(text)
    case 'paragraph':
    default:
      return formatAsParagraphs(text)
  }
}

/**
 * Format text as paragraphs
 */
function formatAsParagraphs(text) {
  // Clean up extra spaces and line breaks
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=\.|\?|\!)\s+/g)
    .map(sentence => sentence.trim())
    .filter(Boolean)
    .join('\n\n')
}

/**
 * Format text as bullet points
 */
function formatAsBulletPoints(text) {
  // If the text already contains bullet points, return as is
  if (text.includes('•') || text.includes('* ') || text.includes('- ')) {
    return text
  }
  
  // Otherwise, convert sentences to bullet points
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=\.|\?|\!)\s+/g)
    .map(sentence => sentence.trim())
    .filter(Boolean)
  
  return sentences.map(sentence => `• ${sentence}`).join('\n')
}

/**
 * Format text as key points
 */
function formatAsKeyPoints(text) {
  // If the text already contains numbered points, return as is
  if (/^\d+\.\s/.test(text)) {
    return text
  }
  
  // Otherwise, convert sentences to numbered key points
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=\.|\?|\!)\s+/g)
    .map(sentence => sentence.trim())
    .filter(Boolean)
  
  return sentences
    .map((sentence, index) => `${index + 1}. ${sentence}`)
    .join('\n')
}

/**
 * Count words in a text
 */
export function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(text) {
  const wordsPerMinute = 200
  const words = countWords(text)
  return Math.max(1, Math.ceil(words / wordsPerMinute))
} 