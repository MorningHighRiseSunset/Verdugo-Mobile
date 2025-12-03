// Netlify deployment instructions for Google Translate
// -----------------------------------------------------
// Recommended (secure): Use Netlify environment variables and the included
// Netlify Function `/.netlify/functions/translate` which uses `GOOGLE_API_KEY`.
// 
// Set the environment variable with the Netlify CLI (in your project folder):
//
//   netlify login
//   netlify link   # if not already linked to a site
//   netlify env:set GOOGLE_API_KEY "YOUR_REAL_KEY_HERE"
//
// Or set `GOOGLE_API_KEY` in the Netlify UI: Site settings -> Build & deploy -> Environment
// variables.
// After deploying, the client will call the serverless function at
// `/.netlify/functions/translate?q=word&target=es` and the function will use the
// server-side `GOOGLE_API_KEY` without exposing it to users.

// Quick insecure option (for local testing only): create `config.js` (DO NOT commit)
// with this line and include it in `index.html` before `script.js`:
//
// window.GOOGLE_API_KEY = 'YOUR_KEY';

// Security note:
// - DO NOT commit real keys. Rotate keys if they were exposed publicly.
// - Prefer server-side usage of keys to avoid abuse and unexpected charges.
