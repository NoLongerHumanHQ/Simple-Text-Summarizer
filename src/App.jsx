import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'
import SummaryOptions from './components/SummaryOptions'
import SummaryOutput from './components/SummaryOutput'
import { useSummarization } from './hooks/useSummarization'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [text, setText] = useState('')
  const [options, setOptions] = useState({
    length: 'medium', // short, medium, long
    type: 'paragraph', // paragraph, bullet, key-points
    ratio: 50 // percentage of original text
  })
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const { summary, loading, error, summarizeText } = useSummarization()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleSubmit = async () => {
    if (!text.trim()) return
    await summarizeText(text, options)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col h-full">
            <TextInput text={text} setText={setText} />
            <SummaryOptions options={options} setOptions={setOptions} />
            <div className="mt-4">
              <button 
                className="btn btn-primary w-full"
                onClick={handleSubmit}
                disabled={loading || !text.trim()}
              >
                {loading ? 'Summarizing...' : 'Summarize'}
              </button>
            </div>
          </div>
          
          <SummaryOutput summary={summary} loading={loading} error={error} originalText={text} />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App 