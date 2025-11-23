import { useState } from "react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm TravelBuddy — your AI travel assistant. Ask me about routes, flight prices, or the best time to book!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await res.json();

      const botMsg = { role: "assistant", text: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠️ Sorry, I couldn't connect to the server." }
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-3 text-center">TravelBuddy AI Assistant</h2>

      <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-white shadow">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm italic text-center mt-2">
            TravelBuddy is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask TravelBuddy..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
