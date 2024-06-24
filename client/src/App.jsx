import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("https://content-gen-app.onrender.com/generate", { prompt });
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h3>Gemini AI Content Generator</h3>
      <p>Enter a prompt to craft a unique content.</p>
      <form className="App-form" onSubmit={submitHandler}>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
          className="App-input"
        />
        <button className="App-button" type="submit">
          Generate 
        </button>
      </form>
      <section className="App-response">
        {loading && <p>Generating your content...</p>}
        {error && <p>{error}</p>}
        {response && <p>{response}</p>}
      </section>
    </div>
  );
}

export default App;
