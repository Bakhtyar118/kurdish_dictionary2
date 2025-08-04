import React, { useEffect, useState } from "react";

const API_URL = "https://kurdish-dictionary2.onrender.com";

const fieldList = [
  { name: "word", label: "وشە (کوردی)", rtl: true },
  { name: "latin", label: "Latin" },
  { name: "plural", label: "Plural" },
  { name: "ipa", label: "IPA" },
  { name: "definition", label: "پێناسە", rtl: true, textarea: true },
  { name: "english", label: "English" },
  { name: "kurmanji", label: "Kurmanji" },
  { name: "arabic", label: "Arabic" },
  { name: "farsi", label: "Farsi" },
  { name: "phrase", label: "Phrase", textarea: true },
  { name: "note", label: "Note", textarea: true },
  { name: "synonyms", label: "Synonyms", textarea: true },
  { name: "antonyms", label: "Antonyms", textarea: true },
  { name: "example", label: "Example", textarea: true },
  { name: "regional", label: "Regional", textarea: true },
];

function App() {
  const [words, setWords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(
    Object.fromEntries(fieldList.map((f) => [f.name, ""]))
  );

  // Load words on mount
  useEffect(() => {
    fetchWords();
  }, []);

  function fetchWords() {
    fetch(`${API_URL}/words/`)
      .then((res) => res.json())
      .then(setWords)
      .catch(() => setWords([]));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = editingId
      ? `${API_URL}/words/${editingId}`
      : `${API_URL}/words/`;
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert(editingId ? "Word updated!" : "Word added!");
        setForm(Object.fromEntries(fieldList.map((f) => [f.name, ""])));
        setEditingId(null);
        fetchWords();
      } else {
        const err = await res.json();
        alert("Failed: " + (err.detail || "Unknown error"));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  }

  function handleEdit(wordObj) {
    setForm(wordObj);
    setEditingId(wordObj.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API_URL}/words/${id}`, { method: "DELETE" });
    setWords(words.filter((w) => w.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-2xl rounded-xl shadow-2xl bg-white/95 p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2 justify-end" dir="rtl">
          <span role="img" aria-label="key">🔑</span> وشە زیاد بکە
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fieldList.map(({ name, label, rtl, textarea }) => (
            <div key={name}>
              <label className={`block mb-1 font-semibold text-right`}>
                {label}
              </label>
              {textarea ? (
                <textarea
                  name={name}
                  value={form[name] || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full min-h-[60px] focus:ring-2 focus:ring-purple-200"
                  dir={rtl ? "rtl" : "ltr"}
                  placeholder={label}
                  rows={2}
                />
              ) : (
                <input
                  name={name}
                  value={form[name] || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-300"
                  dir={rtl ? "rtl" : "ltr"}
                  placeholder={label}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-3 font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition"
          >
            {editingId ? "Update" : "زیادکردن"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setForm(Object.fromEntries(fieldList.map((f) => [f.name, ""]))); setEditingId(null); }}
              className="ml-2 px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-xl mb-3 text-purple-800">Words List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border">
            <thead>
              <tr>
                {fieldList.slice(0, 8).map(f => (
                  <th key={f.name}>{f.label}</th>
                ))}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {words.map((w) => (
                <tr key={w.id}>
                  {fieldList.slice(0, 8).map(f => (
                    <td key={f.name}>{w[f.name]}</td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(w)} className="text-blue-600 underline">Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(w.id)} className="text-red-600 underline">Delete</button>
                  </td>
                </tr>
              ))}
              {!words.length && (
                <tr>
                  <td colSpan={10}>No words found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="mt-6 text-gray-500 text-sm">
        <span role="img" aria-label="sparkles">✨</span> Kurdish Dictionary Entry • Designed by Bakhtyar
      </footer>
    </div>
  );
}

export default App;
