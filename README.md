# Verdugo-Mobile

A speech-to-text hangman game with multi-language support.

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   - Make sure your code is pushed to a GitHub repository

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel project settings, add the following environment variable:
     - `GOOGLE_API_KEY`: Your Google Translate API key
   - Get your API key from: https://console.cloud.google.com/apis/credentials

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically detect the static files and serverless functions

### Local Development

1. **Install Dependencies**
   - No build process required - this is a static HTML/JS/CSS application

2. **Set Environment Variable**
   - Create a `.env` file (copy from `.env.example`)
   - Add your `GOOGLE_API_KEY`

3. **Run Local Server**
   - Use any static file server:
     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using Node.js (if you have http-server installed)
     npx http-server -p 8000
     ```

4. **API Function Locally**
   - To test the API function locally, you can use Vercel CLI:
     ```bash
     npm install -g vercel
     vercel dev
     ```

## Project Structure

- `index.html` - Main HTML file
- `script.js` - Main application logic
- `style.css` - Styling
- `phonetic-engine.js` - Phonetic matching for voice recognition
- `api/translate.js` - Vercel serverless function for translation
- `sounds/` - Audio files for the game
- `comprehensive_webster.json` - Dictionary data
- `es_ES.txt` - Spanish dictionary data

## Features

- Multi-language support (English, Spanish, Chinese, Hindi, French)
- Voice recognition for letter input
- Translation API integration
- Dictionary API integration
- Responsive design for mobile and desktop