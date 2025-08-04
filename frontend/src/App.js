import React, { useState, useEffect } from "react";

export default function App() {
  const [words, setWords] = useState([]);
  // Form states
  const [word, setWord] = useState("");
  const [latin, setLatin] = useState("");
  const [ipa, setIPA] = useState("");
  const [plural, setPlural] = useState("");
  const [english, setEnglish] = useState("");
  const [kurmanji, setKurmanji] = useState("");
  const [arabic, setArabic] = useState("");
  const [farsi, setFarsi] = useState("");
  const [definition, setDefinition] = useState("");
  const [phrase, setPhrase] = useState("");
  const [example, setExample] = useState("");
  const [note, setNote] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [regional, setRegional] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  async function fetchWords() {
    setLoading(true);
    try {
      const res = await fetch("https://kurdish-dictionary2.onrender.com/words/");
      const data = await res.json();
      setWords(data);
    } catch (err) {
      alert("Couldn't fetch words: " + err.message);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://kurdish-dictionary2.onrender.com/words/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word, latin, ipa, plural, english, kurmanji, arabic, farsi,
          definition, phrase, example, note, synonyms, antonyms, regional
        }),
      });
      if (res.ok) {
        alert("Word added!");
        setWord(""); setLatin(""); setIPA(""); setPlural(""); setEnglish("");
        setKurmanji(""); setArabic(""); setFarsi(""); setDefinition(""); setPhrase("");
        setExample(""); setNote(""); setSynonyms(""); setAntonyms(""); setRegional("");
        fetchWords();
      } else {
        const err = await res.json();
        alert("Failed: " + (err.detail || "Unknown error"));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center drop-shadow">
        وشەکان <span className="text-xl">(All Words in the Dictionary)</span>
      </h1>

      {/* Data Entry Form */}
      <form onSubmit={handleSubmit} className="bg-white/95 p-8 rounded-2xl shadow-xl mb-12 w-full max-w-3xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-blue-800 mb-1">وشە (Kurdish/Arabic/Latin)</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={word} onChange={e => setWord(e.target.value)} required placeholder="وشە بنوسە..." />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Latin</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={latin} onChange={e => setLatin(e.target.value)} placeholder="Latin spelling" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">IPA</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={ipa} onChange={e => setIPA(e.target.value)} placeholder="IPA e.g. [ˈkʊɾdɪ]" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Plural</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={plural} onChange={e => setPlural(e.target.value)} placeholder="Plural form" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">English</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={english} onChange={e => setEnglish(e.target.value)} placeholder="English translation" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Kurmanji</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={kurmanji} onChange={e => setKurmanji(e.target.value)} placeholder="Kurmanji translation" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Arabic</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={arabic} onChange={e => setArabic(e.target.value)} placeholder="Arabic translation" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Farsi</label>
            <input className="border border-blue-300 rounded-lg p-3 w-full" value={farsi} onChange={e => setFarsi(e.target.value)} placeholder="Farsi translation" />
          </div>
        </div>

        {/* Expandable fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-purple-800 mb-1">پێناسە (Definition)</label>
            <textarea className="border border-purple-300 rounded-lg p-3 w-full min-h-[56px]" value={definition} onChange={e => setDefinition(e.target.value)} required placeholder="پێناسە بنوسە..." />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Phrase</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={phrase} onChange={e => setPhrase(e.target.value)} placeholder="Phrase..." />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Example</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={example} onChange={e => setExample(e.target.value)} placeholder="Example sentence" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Note</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={note} onChange={e => setNote(e.target.value)} placeholder="Note..." />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Synonyms</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={synonyms} onChange={e => setSynonyms(e.target.value)} placeholder="Synonyms (comma-separated)" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Antonyms</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={antonyms} onChange={e => setAntonyms(e.target.value)} placeholder="Antonyms (comma-separated)" />
          </div>
          <div>
            <label className="block font-semibold text-blue-800 mb-1">Regional</label>
            <textarea className="border border-blue-300 rounded-lg p-3 w-full min-h-[56px]" value={regional} onChange={e => setRegional(e.target.value)} placeholder="e.g. سلیمانی، هەولێر، کەرماشان" />
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-3 px-8 font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition mx-auto block mt-4" type="submit">
          زیادکردن
        </button>
      </form>

      {/* Table of Words */}
      <div className="w-full max-w-7xl overflow-x-auto">
        <table className="min-w-full border rounded-xl bg-white">
          <thead>
            <tr>
              <th className="p-2 border">وشە</th>
              <th className="p-2 border">Latin</th>
              <th className="p-2 border">IPA</th>
              <th className="p-2 border">Plural</th>
              <th className="p-2 border">English</th>
              <th className="p-2 border">Kurmanji</th>
              <th className="p-2 border">Arabic</th>
              <th className="p-2 border">Farsi</th>
              <th className="p-2 border">پێناسە</th>
              <th className="p-2 border">Phrase</th>
              <th className="p-2 border">Example</th>
              <th className="p-2 border">Note</th>
              <th className="p-2 border">Synonyms</th>
              <th className="p-2 border">Antonyms</th>
              <th className="p-2 border">Regional</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={15} className="text-center">Loading...</td></tr>
            ) : words.length === 0 ? (
              <tr><td colSpan={15} className="text-center">No words found.</td></tr>
            ) : (
              words.map((w, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{w.word}</td>
                  <td className="p-2 border">{w.latin}</td>
                  <td className="p-2 border">{w.ipa}</td>
                  <td className="p-2 border">{w.plural}</td>
                  <td className="p-2 border">{w.english}</td>
                  <td className="p-2 border">{w.kurmanji}</td>
                  <td className="p-2 border">{w.arabic}</td>
                  <td className="p-2 border">{w.farsi}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.definition}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.phrase}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.example}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.note}</td>
                  <td className="p-2 border" style={{ maxWidth: 140, whiteSpace: 'pre-wrap' }}>{w.synonyms}</td>
                  <td className="p-2 border" style={{ maxWidth: 140, whiteSpace: 'pre-wrap' }}>{w.antonyms}</td>
                  <td className="p-2 border">{w.regional}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">
        Kurdish Dictionary • Designed by Bakhtyar
      </footer>
    </div>
  );
}
