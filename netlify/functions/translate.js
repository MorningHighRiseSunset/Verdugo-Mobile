// Netlify Function: translate
// Expects query param `q` (text) and optional `target` (language code, default 'es')
// Uses environment variable GOOGLE_API_KEY (set via Netlify UI or `netlify env:set`).

exports.handler = async function(event, context) {
  const params = event.queryStringParameters || {};
  const q = params.q;
  const target = params.target || 'es';
  if (!q) return { statusCode: 400, body: JSON.stringify({ error: 'q required' }) };

  const key = process.env.GOOGLE_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: 'GOOGLE_API_KEY not set on server' }) };

  let translated = '';
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&target=${encodeURIComponent(target)}&format=text`;
    const res = await fetch(url);
    const data = await res.json();
    translated = data?.data?.translations?.[0]?.translatedText || '';
  } catch (e) {
    translated = '';
  }

  // Try to fetch a definition in the target language
  let definition = '';
  let pronunciation = '';
  try {
    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${encodeURIComponent(target)}/${encodeURIComponent(translated)}`);
    const dictData = await dictRes.json();
    if (Array.isArray(dictData) && dictData[0]) {
      definition = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
      pronunciation = dictData[0].phonetic || '';
    }
  } catch (e) {
    // ignore
  }

  // Fallback: try to get English definition for the source word if target definition missing
  if (!definition) {
    try {
      const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`);
      const dictDataEn = await dictResEn.json();
      if (Array.isArray(dictDataEn) && dictDataEn[0]) {
        const englishDefinition = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
        if (englishDefinition) {
          // Translate the English definition into the target language using the same Google API key
          try {
            const defUrl = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}&q=${encodeURIComponent(englishDefinition)}&target=${encodeURIComponent(target)}&format=text`;
            const defRes = await fetch(defUrl);
            const defData = await defRes.json();
            const translatedDef = defData?.data?.translations?.[0]?.translatedText || '';
            definition = translatedDef || englishDefinition;
          } catch (e) {
            // If translation fails, fall back to the raw English definition
            definition = englishDefinition;
          }
        }

        if (!pronunciation) pronunciation = dictDataEn[0].phonetic || '';
      }
    } catch (e) {
      // ignore
    }
  }

  const body = {
    translated: translated || q,
    definition: definition || `No definition found for "${translated || q}".`,
    pronunciation: pronunciation || '/No pronunciation available/',
    englishEquivalent: q
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  };
};
