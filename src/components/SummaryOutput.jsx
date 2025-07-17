import { Copy, Download, ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function SummaryOutput({ summary, loading, error, originalText }) {
  const [showComparison, setShowComparison] = useState(false)

  const handleCopy = () => {
    if (!summary) return
    navigator.clipboard.writeText(summary)
      .then(() => toast.success('Summary copied to clipboard'))
      .catch(() => toast.error('Failed to copy to clipboard'))
  }

  const handleDownload = () => {
    if (!summary) return
    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'summary.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Summary downloaded')
  }

  const toggleComparison = () => {
    setShowComparison(!showComparison)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-red-500 dark:text-red-400 p-4 border border-red-300 dark:border-red-800 rounded-md bg-red-50 dark:bg-red-900/20">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      )
    }

    if (!summary) {
      return (
        <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
          <p>Your summary will appear here</p>
        </div>
      )
    }

    if (showComparison) {
      return (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 overflow-auto h-[300px]">
            <h3 className="font-semibold mb-2 text-sm">Original</h3>
            <div className="text-sm">{originalText}</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 overflow-auto h-[300px]">
            <h3 className="font-semibold mb-2 text-sm">Summary</h3>
            <div className="text-sm whitespace-pre-wrap">{summary}</div>
          </div>
        </div>
      )
    }

    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 overflow-auto h-[300px]">
        <div className="whitespace-pre-wrap">{summary}</div>
      </div>
    )
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="flex space-x-2">
          {summary && (
            <>
              <button
                onClick={handleCopy}
                className="btn btn-secondary text-sm flex items-center space-x-1"
                title="Copy to clipboard"
                aria-label="Copy to clipboard"
              >
                <Copy size={16} />
                <span>Copy</span>
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-secondary text-sm flex items-center space-x-1"
                title="Download as text file"
                aria-label="Download as text file"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button
                onClick={toggleComparison}
                className={`btn ${showComparison ? 'btn-primary' : 'btn-secondary'} text-sm flex items-center space-x-1`}
                title="Toggle side-by-side comparison"
                aria-label="Toggle side-by-side comparison"
              >
                <ArrowLeftRight size={16} />
                <span>Compare</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {renderContent()}
      </div>
      
      {summary && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Summary length: {summary.length} characters
        </div>
      )}
    </div>
  )
}

export default SummaryOutput 