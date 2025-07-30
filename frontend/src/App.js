import React, { useState } from "react";

function App() {
  // All your state variables for each input
  const [word, setWord] = useState("");
  const [latin, setLatin] = useState("");
  const [definition, setDefinition] = useState("");
  const [english, setEnglish] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [example, setExample] = useState("");
  const [regional, setRegional] = useState("");
  const [ipa, setIPA] = useState("");

  // This function sends your data to the backend API when you submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://kurdish-dictionary2.onrender.com/words/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word,
          latin,
          definition,
          english,
          synonyms,
          antonyms,
          example,
          regional,
          ipa,
        }),
      });
      if (res.ok) {
        alert("Word added!");
        // Clear form after success
        setWord(""); setLatin(""); setDefinition(""); setEnglish("");
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Kurdish word + IPA beside each other */}
          <div className="flex gap-4">
            <div className="w-2/3">
              <label className="block mb-1 text-right text-blue-900 font-semibold">وشە (کوردی)</label>
              <input
                dir="rtl"
                className="border border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-300 text-lg"
                value={word}
                onChange={e => setWord(e.target.value)}
                required
                placeholder="وشە بنوسە..."
              />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-left font-semibold">IPA</label>
              <input
                dir="ltr"
                className="border border-gray-300 rounded-lg p-3 w-full text-left"
                value={ipa}
                onChange={e => setIPA(e.target.value)}
                placeholder="IPA e.g. [ˈkʊɾdɪ]"
              />
            </div>
          </div>
          {/* Latin + English beside each other */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-right font-semibold">Latin</label>
              <input
                className="border border-gray-300 rounded-lg p-3 w-full"
                value={latin}
                onChange={e => setLatin(e.target.value)}
                placeholder="Latin spelling"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-right font-semibold">English</label>
              <input
                className="border border-gray-300 rounded-lg p-3 w-full"
                value={english}
                onChange={e => setEnglish(e.target.value)}
                placeholder="English translation"
              />
            </div>
          </div>
          {/* Definition */}
          <div>
            <label className="block mb-1 text-right text-purple-800 font-semibold">پێناسە</label>
            <textarea
              dir="rtl"
              className="border border-purple-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-200 text-lg min-h-[80px]"
              value={definition}
              onChange={e => setDefinition(e.target.value)}
              required
              placeholder="پێناسە بنوسە..."
            />
          </div>
          {/* Synonyms */}
          <div>
            <label className="block mb-1 text-right font-semibold">Synonyms</label>
            <input
              dir="rtl"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={synonyms}
              onChange={e => setSynonyms(e.target.value)}
              placeholder="Synonyms (comma-separated)"
            />
          </div>
          {/* Antonyms */}
          <div>
            <label className="block mb-1 text-right font-semibold">Antonyms</label>
            <input
              dir="rtl"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={antonyms}
              onChange={e => setAntonyms(e.target.value)}
              placeholder="Antonyms (comma-separated)"
            />
          </div>
          {/* Regional words */}
          <div>
            <label className="block mb-1 text-right font-semibold">Regional words (شوێن/ناوچە)</label>
            <input
              dir="rtl"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={regional}
              onChange={e => setRegional(e.target.value)}
              placeholder="e.g. سلیمانی، هەولێر، کەرماشان"
            />
          </div>
          {/* Example */}
          <div>
            <label className="block mb-1 text-right font-semibold">Example</label>
            <textarea
              dir="rtl"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={example}
              onChange={e => setExample(e.target.value)}
              placeholder="Example sentence"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-3 font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition"
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
