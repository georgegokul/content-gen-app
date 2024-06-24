require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = process.env.PORT || 8080
//Express instance
const app = express();
//Middlewares
const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173","https://content-gen-app.onrender.com",
          "https://6679851d70b58fb0729eb532--glittery-lily-ebdd44.netlify.app/","https://content-gen-app.onrender.com/generate"],
};
app.use(cors(corsOptions));
app.use(express.json());
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//Generate content route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});

//Start the server
app.listen(PORT, console.log("Server is running"+PORT));
