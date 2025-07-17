import { useState, useCallback } from 'react'
import axios from 'axios'
import { formatSummary } from '../utils/textProcessing'

export function useSummarization() {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Use Chrome Summarizer API if available
  const useChromeSummarizer = async (text) => {
    if ('ai' in window && 'summarizer' in window.ai) {
      const summarizer = await window.ai.summarizer.create()
      const result = await summarizer.summarize(text)
      return result
    }
    return null
  }

  // Use Transformers.js (client-side)
  const useTransformersJs = async (text) => {
    try {
      // Dynamic import to avoid bundling it when not used
      const { pipeline } = await import('@xenova/transformers')
      const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6')
      const result = await summarizer(text)
      return result[0]?.summary_text || null
    } catch (err) {
      console.warn('Transformers.js not available:', err)
      return null
    }
  }

  // Use Hugging Face Inference API
  const useHuggingFace = async (text) => {
    try {
      // Check if HF_TOKEN is configured in environment variables
      const HF_TOKEN = import.meta.env.VITE_HF_TOKEN
      if (!HF_TOKEN) {
        console.warn('Hugging Face token not found')
        return null
      }

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        { inputs: text },
        { 
          headers: { Authorization: `Bearer ${HF_TOKEN}` },
          timeout: 15000 // 15 seconds timeout
        }
      )

      return response.data[0]?.summary_text || null
    } catch (err) {
      console.warn('Hugging Face API error:', err)
      return null
    }
  }

  // Use OpenAI API
  const useOpenAI = async (text, options) => {
    try {
      // Check if OPENAI_KEY is configured in environment variables
      const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY
      if (!OPENAI_KEY) {
        console.warn('OpenAI key not found')
        return null
      }

      // Prepare the prompt based on options
      let prompt = `Summarize the following text`
      
      if (options.length === 'short') {
        prompt += ' in a very brief way'
      } else if (options.length === 'long') {
        prompt += ' comprehensively'
      }
      
      if (options.type === 'bullet') {
        prompt += ' into bullet points'
      } else if (options.type === 'key-points') {
        prompt += ' highlighting only the key points'
      }
      
      prompt += `. Use approximately ${options.ratio}% of the original length: ${text}`

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        },
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}` 
          },
          timeout: 30000 // 30 seconds timeout
        }
      )

      return response.data.choices[0]?.message?.content || null
    } catch (err) {
      console.warn('OpenAI API error:', err)
      return null
    }
  }

  // Fallback to client-side summarization when APIs fail
  const clientSideSummarization = (text, options) => {
    // This is a very simple extractive summarization
    // Better algorithms would be used in a production app
    const sentences = text.match(/[^.!?]+[.!?]+/g) || []
    const totalSentences = sentences.length
    const sentencesToExtract = Math.max(1, Math.floor(totalSentences * (options.ratio / 100)))
    
    // Just get the first N sentences based on ratio
    // In a real app, you'd use a better algorithm to select the most important sentences
    const extractedSentences = sentences.slice(0, sentencesToExtract)
    return extractedSentences.join(' ')
  }

  const summarizeText = useCallback(async (text, options) => {
    if (!text.trim()) {
      setError('Please enter text to summarize')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Try each API in sequence until one works
      let summaryText = null

      // 1. Try Chrome Summarizer API
      summaryText = await useChromeSummarizer(text)
      
      // 2. Try Transformers.js
      if (!summaryText) {
        summaryText = await useTransformersJs(text)
      }
      
      // 3. Try Hugging Face
      if (!summaryText) {
        summaryText = await useHuggingFace(text)
      }
      
      // 4. Try OpenAI
      if (!summaryText) {
        summaryText = await useOpenAI(text, options)
      }
      
      // 5. Fallback to simple client-side summarization
      if (!summaryText) {
        summaryText = clientSideSummarization(text, options)
      }

      // Format the summary based on the chosen options
      const formattedSummary = formatSummary(summaryText, options.type)
      setSummary(formattedSummary)
    } catch (err) {
      console.error('Summarization error:', err)
      setError('Failed to generate summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { summary, loading, error, summarizeText }
} 