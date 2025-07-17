import { useState } from 'react'
import { Clipboard, X } from 'lucide-react'
import toast from 'react-hot-toast'

function TextInput({ text, setText }) {
  const [characterCount, setCharacterCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  const handleChange = (e) => {
    const newText = e.target.value
    setText(newText)
    updateCounts(newText)
  }

  const updateCounts = (text) => {
    setCharacterCount(text.length)
    setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length)
  }

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      updateCounts(clipboardText)
      toast.success('Text pasted from clipboard')
    } catch (err) {
      toast.error('Failed to paste from clipboard. Please paste manually.')
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleClear = () => {
    setText('')
    updateCounts('')
    toast.success('Text cleared')
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Input Text</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePaste}
            className="btn btn-secondary text-sm flex items-center space-x-1"
            title="Paste from clipboard"
            aria-label="Paste from clipboard"
          >
            <Clipboard size={16} />
            <span>Paste</span>
          </button>
          <button
            onClick={handleClear}
            className="btn btn-secondary text-sm flex items-center space-x-1"
            title="Clear text"
            aria-label="Clear text"
            disabled={!text}
          >
            <X size={16} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        className="input flex-1 min-h-[300px] resize-none"
        placeholder="Paste or type your text here to summarize (minimum 500 characters recommended for better results)..."
        aria-label="Input text to summarize"
      ></textarea>

      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
        <span>{characterCount} characters</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  )
}

export default TextInput 