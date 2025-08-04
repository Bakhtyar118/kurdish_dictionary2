import React, { useState, useEffect } from "react";

export default function App() {
  const [words, setWords] = useState([]);
  // Form states
  const [word, setWord] = useState("");
  const [latin, setLatin] = useState("");
  const [definition, setDefinition] = useState("");
  const [plural, setPlural] = useState("");
  const [english, setEnglish] = useState("");
  const [kurmanji, setKurmanji] = useState("");
  const [arabic, setArabic] = useState("");
  const [farsi, setFarsi] = useState("");
  const [regional, setRegional] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [phrase, setPhrase] = useState("");
  const [example, setExample] = useState("");
  const [note, setNote] = useState("");
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
          word, latin, definition, plural, english, kurmanji, arabic, farsi,
          regional, synonyms, antonyms, phrase, example, note
        }),
      });
      if (res.ok) {
        alert("Word added!");
        setWord(""); setLatin(""); setDefinition(""); setPlural(""); setEnglish(""); setKurmanji(""); setArabic(""); setFarsi(""); setRegional(""); setSynonyms(""); setAntonyms(""); setPhrase(""); setExample(""); setNote("");
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
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
        وشەکان (All Words in the Dictionary)
      </h1>

      {/* Data Entry Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow mb-8 w-full max-w-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">وشە (Kurdish)</label>
            <input className="border rounded w-full p-2" value={word} onChange={e => setWord(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Latin</label>
            <input className="border rounded w-full p-2" value={latin} onChange={e => setLatin(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Plural</label>
            <input className="border rounded w-full p-2" value={plural} onChange={e => setPlural(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">English</label>
            <input className="border rounded w-full p-2" value={english} onChange={e => setEnglish(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Kurmanji</label>
            <input className="border rounded w-full p-2" value={kurmanji} onChange={e => setKurmanji(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Arabic</label>
            <input className="border rounded w-full p-2" value={arabic} onChange={e => setArabic(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Farsi</label>
            <input className="border rounded w-full p-2" value={farsi} onChange={e => setFarsi(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Regional</label>
            <input className="border rounded w-full p-2" value={regional} onChange={e => setRegional(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Synonyms</label>
            <input className="border rounded w-full p-2" value={synonyms} onChange={e => setSynonyms(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Antonyms</label>
            <input className="border rounded w-full p-2" value={antonyms} onChange={e => setAntonyms(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block mb-1">پێناسە (Definition)</label>
          <textarea className="border rounded w-full p-2" value={definition} onChange={e => setDefinition(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Phrase</label>
          <textarea className="border rounded w-full p-2" value={phrase} onChange={e => setPhrase(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Example</label>
          <textarea className="border rounded w-full p-2" value={example} onChange={e => setExample(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Note</label>
          <textarea className="border rounded w-full p-2" value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
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
              <th className="p-2 border">Plural</th>
              <th className="p-2 border">English</th>
              <th className="p-2 border">Kurmanji</th>
              <th className="p-2 border">Arabic</th>
              <th className="p-2 border">Farsi</th>
              <th className="p-2 border">Regional</th>
              <th className="p-2 border">Synonyms</th>
              <th className="p-2 border">Antonyms</th>
              <th className="p-2 border">پێناسە</th>
              <th className="p-2 border">Phrase</th>
              <th className="p-2 border">Example</th>
              <th className="p-2 border">Note</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={14} className="text-center">Loading...</td></tr>
            ) : words.length === 0 ? (
              <tr><td colSpan={14} className="text-center">No words found.</td></tr>
            ) : (
              words.map((w, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{w.word}</td>
                  <td className="p-2 border">{w.latin}</td>
                  <td className="p-2 border">{w.plural}</td>
                  <td className="p-2 border">{w.english}</td>
                  <td className="p-2 border">{w.kurmanji}</td>
                  <td className="p-2 border">{w.arabic}</td>
                  <td className="p-2 border">{w.farsi}</td>
                  <td className="p-2 border">{w.regional}</td>
                  <td className="p-2 border">{w.synonyms}</td>
                  <td className="p-2 border">{w.antonyms}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.definition}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.phrase}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.example}</td>
                  <td className="p-2 border" style={{ maxWidth: 180, whiteSpace: 'pre-wrap' }}>{w.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
