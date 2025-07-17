import { Sun, Moon, FileText } from 'lucide-react'

function Header({ theme, toggleTheme }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText size={24} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold">Text Summarizer</h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-800" />
          ) : (
            <Sun size={20} className="text-yellow-300" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header 