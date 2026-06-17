"use client";

import { useState } from "react";

export default function TestPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askMarcus = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/interrogate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();

      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Marcus Reed Test
      </h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask Marcus a question..."
        className="w-full max-w-xl rounded border p-3 text-black"
      />

      <button
        onClick={askMarcus}
        className="mt-4 rounded border px-4 py-2"
      >
        Ask
      </button>

      {loading && (
        <p className="mt-4">
          ...asking Marcus
        </p>
      )}

      {response && (
        <div className="mt-6 max-w-2xl rounded border p-4">
          <strong>Marcus:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </main>
  );
}