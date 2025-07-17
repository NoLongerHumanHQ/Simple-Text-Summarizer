# Text Summarization Web App

A modern, responsive web application for summarizing text using AI. Built with React and Tailwind CSS.

## Features

- **Text Input**: Large text area with character/word counter and clipboard integration
- **Summarization Options**: Customize summary length, type, and ratio
- **Multiple AI Options**: Integration with various summarization APIs
- **Output Display**: Clean display with copy, download, and comparison features
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all device sizes

## Technologies Used

- React
- Tailwind CSS
- Axios for API calls
- Lucide React for icons

## Supported APIs

The application can use multiple summarization APIs:

1. **Chrome Summarizer API** (when available in browser)
2. **Hugging Face Transformers.js** (client-side)
3. **Hugging Face Inference API** (with token)
4. **OpenAI API** (with key)
5. Fallback to basic client-side summarization

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/text-summarizer.git
   cd text-summarizer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file by copying `.env.example` and add your API keys:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To build the app for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Netlify

This project is configured for easy deployment to Netlify:

1. Connect your repository to Netlify
2. Configure the environment variables in the Netlify dashboard
3. Deploy

The included `netlify.toml` file handles the configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 