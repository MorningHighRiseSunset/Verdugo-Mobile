// Vercel deployment instructions
// -----------------------------------------------------
// Recommended (secure): Use Vercel environment variables and the included
// serverless function `/api/translate` which uses `GOOGLE_API_KEY`.
//
// Set the environment variable in the Vercel dashboard:
//   Project -> Settings -> Environment Variables
//   Name:  GOOGLE_API_KEY
//   Value: your Google Cloud Translation API key
//
// Apply to Production (and Preview/Development if you use those).
// Redeploy after adding or changing the variable.
//
// After deploying, the client calls:
//   `/api/translate?q=word&target=es`
// and the function uses the server-side key without exposing it to users.

// Quick insecure option (for local testing only): create `config.js` (DO NOT commit)
// with this line and include it in `index.html` before `script.js`:
//
// window.GOOGLE_API_KEY = 'YOUR_KEY';

// Security note:
// - DO NOT commit real keys. Rotate keys if they were exposed publicly.
// - Prefer server-side usage of keys to avoid abuse and unexpected charges.
