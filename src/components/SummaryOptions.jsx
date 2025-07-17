function SummaryOptions({ options, setOptions }) {
  const handleLengthChange = (length) => {
    setOptions({ ...options, length })
  }

  const handleTypeChange = (type) => {
    setOptions({ ...options, type })
  }

  const handleRatioChange = (e) => {
    setOptions({ ...options, ratio: Number(e.target.value) })
  }

  return (
    <div className="card mt-4">
      <h2 className="text-lg font-semibold mb-4">Summarization Options</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Summary Length</label>
          <div className="flex space-x-2">
            <button
              className={`btn ${options.length === 'short' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleLengthChange('short')}
            >
              Short
            </button>
            <button
              className={`btn ${options.length === 'medium' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleLengthChange('medium')}
            >
              Medium
            </button>
            <button
              className={`btn ${options.length === 'long' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleLengthChange('long')}
            >
              Long
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Summary Type</label>
          <div className="flex space-x-2">
            <button
              className={`btn ${options.type === 'paragraph' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleTypeChange('paragraph')}
            >
              Paragraph
            </button>
            <button
              className={`btn ${options.type === 'bullet' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleTypeChange('bullet')}
            >
              Bullet Points
            </button>
            <button
              className={`btn ${options.type === 'key-points' ? 'btn-primary' : 'btn-secondary'} flex-1`}
              onClick={() => handleTypeChange('key-points')}
            >
              Key Points
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Summary Ratio: {options.ratio}%
          </label>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={options.ratio}
            onChange={handleRatioChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>50%</span>
            <span>90%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryOptions 