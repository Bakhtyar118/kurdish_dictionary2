import React, { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [plural, setPlural] = useState("");
  const [latin, setLatin] = useState("");
  const [definition, setDefinition] = useState("");
  const [english, setEnglish] = useState("");
  const [kurmanji, setKurmanji] = useState("");
  const [arabic, setArabic] = useState("");
  const [farsi, setFarsi] = useState("");
  const [phrase, setPhrase] = useState("");
  const [note, setNote] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [example, setExample] = useState("");
  const [regional, setRegional] = useState("");
  const [ipa, setIPA] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://kurdish-dictionary2.onrender.com/words/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word, plural, latin, definition, english, kurmanji, arabic, farsi, phrase, note,
          synonyms, antonyms, example, regional, ipa,
        }),
      });
      if (res.ok) {
        alert("Word added!");
        setWord(""); setPlural(""); setLatin(""); setDefinition(""); setEnglish("");
        setKurmanji(""); setArabic(""); setFarsi(""); setPhrase(""); setNote("");
        setSynonyms(""); setAntonyms(""); setExample(""); setRegional(""); setIPA("");
      } else {
        const err = await res.json();
        alert("Failed: " + (err.detail || "Unknown error"));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-xl shadow-2xl bg-white/95 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2 justify-end" dir="rtl">
          <span role="img" aria-label="key">🔑</span> وشە زیاد بکە
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-right">وشە</label>
              <input
                dir="rtl"
                className="border rounded-lg p-2 w-full"
                value={word}
                onChange={e => setWord(e.target.value)}
                required
                placeholder="وشە/Word (any script)"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-right">Plural</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={plural}
                onChange={e => setPlural(e.target.value)}
                placeholder="Plural form"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-right">Latin</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={latin}
                onChange={e => setLatin(e.target.value)}
                placeholder="Latin spelling"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-right">IPA</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={ipa}
                onChange={e => setIPA(e.target.value)}
                placeholder="IPA [ˈkʊɾdɪ]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-right">Definition (کوردی)</label>
            <textarea
              dir="rtl"
              className="border rounded-lg p-2 w-full"
              value={definition}
              onChange={e => setDefinition(e.target.value)}
              placeholder="پێناسە / Definition"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1">English</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={english}
                onChange={e => setEnglish(e.target.value)}
                placeholder="English translation"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Kurmanji</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={kurmanji}
                onChange={e => setKurmanji(e.target.value)}
                placeholder="Kurmanji translation"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1">Arabic</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={arabic}
                onChange={e => setArabic(e.target.value)}
                placeholder="Arabic translation"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Farsi</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={farsi}
                onChange={e => setFarsi(e.target.value)}
                placeholder="Farsi translation"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Phrase</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={phrase}
              onChange={e => setPhrase(e.target.value)}
              placeholder="Phrase example"
            />
          </div>
          <div>
            <label className="block mb-1">Note</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Any extra info"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1">Synonyms</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={synonyms}
                onChange={e => setSynonyms(e.target.value)}
                placeholder="Synonyms (comma separated)"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Antonyms</label>
              <input
                className="border rounded-lg p-2 w-full"
                value={antonyms}
                onChange={e => setAntonyms(e.target.value)}
                placeholder="Antonyms (comma separated)"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Example</label>
            <textarea
              className="border rounded-lg p-2 w-full"
              value={example}
              onChange={e => setExample(e.target.value)}
              placeholder="Example sentence"
            />
          </div>
          <div>
            <label className="block mb-1">Regional</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={regional}
              onChange={e => setRegional(e.target.value)}
              placeholder="Regions"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-3 font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition"
          >
            زیادکردن
          </button>
        </form>
      </div>
      <footer className="mt-6 text-gray-500 text-sm">
        <span role="img" aria-label="sparkles">✨</span> Kurdish Dictionary Entry • Designed by Bakhtyar
      </footer>
    </div>
  );
}

export default App;
