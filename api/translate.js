// Vercel Serverless Function: /api/translate
// Query: q (text), target (language code, default 'es')
// Uses GOOGLE_API_KEY from Vercel project environment variables.

function extractFirstDefinition(entry) {
  if (!entry || typeof entry !== 'object') return { definition: '', phonetic: '' };
  let definition = '';
  const meanings = entry.meanings;
  if (Array.isArray(meanings)) {
    for (const m of meanings) {
      const defs = m && m.definitions;
      if (Array.isArray(defs)) {
        for (const d of defs) {
          const text = (d && d.definition && String(d.definition).trim()) || '';
          if (text && !/^No definition found/i.test(text)) {
            definition = text;
            break;
          }
        }
        if (definition) break;
      }
    }
  }
  let phonetic = (entry.phonetic && String(entry.phonetic).trim()) || '';
  if (!phonetic && Array.isArray(entry.phonetics)) {
    const withText = entry.phonetics.find(p => p && p.text && String(p.text).trim());
    phonetic = withText ? String(withText.text).trim() : '';
  }
  return { definition, phonetic: phonetic || '' };
}

async function fetchWiktionary(word, langShort) {
  if (!word || !langShort) return null;
  try {
    const domain = `${langShort}.wiktionary.org`;
    const url = `https://${domain}/w/api.php?action=query&titles=${encodeURIComponent(String(word).trim())}&prop=extracts&explaintext=1&exintro=1&exsentences=2&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const j = await res.json();
    const pages = j && j.query && j.query.pages;
    if (!pages) return null;
    const pageId = Object.keys(pages)[0];
    if (!pageId || pageId === '-1') return null;
    const extract = pages[pageId].extract || '';
    if (!extract) return null;
    const lines = extract.split(/\n+/).map(p => p.trim()).filter(Boolean);
    const para = lines.find(p => p.length > 10 && !/^redirect\s*:/i.test(p) && !/^#/i.test(p)) || lines[0] || '';
    if (!para) return null;
    const m = para.match(/[^.!?]+[.!?]?/);
    const sentence = (m ? m[0].trim() : para).replace(/\s*\[[^\]]+\]/g, '').replace(/\s*\([^)]+\)/g, '').trim();
    return sentence.length > 3 ? sentence : null;
  } catch (e) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const q = req.query.q;
  const target = req.query.target || 'es';
  if (!q) {
    return res.status(400).json({ error: 'q required' });
  }

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'GOOGLE_API_KEY not set on server' });
  }

  const targetLang = (target === 'zh-CN' || target === 'zh') ? 'zh' : String(target).split('-')[0] || target;

  let translated = '';
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&target=${encodeURIComponent(target)}&format=text`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    translated = data?.data?.translations?.[0]?.translatedText || '';
  } catch (e) {
    translated = '';
  }
  const wordForDef = (translated || q).trim();

  let definition = '';
  let pronunciation = '';
  try {
    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${encodeURIComponent(targetLang)}/${encodeURIComponent(wordForDef)}`);
    if (dictRes.ok) {
      const dictData = await dictRes.json();
      if (Array.isArray(dictData) && dictData[0]) {
        const out = extractFirstDefinition(dictData[0]);
        definition = out.definition;
        pronunciation = out.phonetic;
      }
    }
  } catch (e) {
    // ignore
  }

  if (!definition) {
    const wikDef = await fetchWiktionary(wordForDef, targetLang);
    if (wikDef) definition = wikDef;
  }

  if (!definition) {
    try {
      const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(String(q).trim())}`);
      if (dictResEn.ok) {
        const dictDataEn = await dictResEn.json();
        if (Array.isArray(dictDataEn) && dictDataEn[0]) {
          const outEn = extractFirstDefinition(dictDataEn[0]);
          let englishDefinition = outEn.definition;
          if (!pronunciation) pronunciation = outEn.phonetic;
          if (!englishDefinition) {
            const wikEn = await fetchWiktionary(q, 'en');
            if (wikEn) englishDefinition = wikEn;
          }
          if (englishDefinition) {
            try {
              const defUrl = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}&q=${encodeURIComponent(englishDefinition)}&target=${encodeURIComponent(target)}&format=text`;
              const defRes = await fetch(defUrl);
              const defData = await defRes.json();
              const translatedDef = defData?.data?.translations?.[0]?.translatedText || '';
              definition = translatedDef || englishDefinition;
            } catch (e) {
              definition = englishDefinition;
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return res.status(200).json({
    translated: translated || q,
    definition: definition || `No definition found for "${translated || q}".`,
    pronunciation: pronunciation || '/No pronunciation available/',
    englishEquivalent: q
  });
};
