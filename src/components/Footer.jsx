import { Github } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Text Summarizer. All rights reserved.
        </p>
        
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a 
            href="https://github.com/yourusername/text-summarizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="GitHub repository"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 