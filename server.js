// import express to create a tiny web server
const express = require("express")
// import cors to handle cross origin requests safely
const cors = require("cors")
// import path to serve static files from the public folder
const path = require("path")

// create an express app instance
const app = express()
// choose a port, default to 3000 if not provided
const PORT = process.env.PORT || 3000

// use 127.0.0.1 for windows reliability when talking to ollama
const OLLAMA = "http://127.0.0.1:11434/api/generate"
// choose the local model name to use with ollama
const MODEL = "mistral"

// enable cors on the server
app.use(cors())
// enable json body parsing for incoming requests
app.use(express.json())

// serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")))

// define an api endpoint to receive prompts from the browser and forward to ollama
app.post("/ask", async (req, res) => {
  try {
    // read the prompt from the request body
    const prompt = (req.body?.prompt || "").toString()
    // validate that prompt exists
    if (!prompt) return res.status(400).json({ error: "Missing prompt" })

    // call the local ollama http api with the model and prompt
    const response = await fetch(OLLAMA, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt, stream: false }),
    })

    // if ollama returned a non 200 status, surface the error text
    if (!response.ok) {
      const txt = await response.text()
      console.error("Ollama Error:", txt)
      return res.status(502).json({ error: "Ollama failed", detail: txt })
    }

    // parse the json payload from ollama
    const data = await response.json()
    // extract the text response and send it back to the browser
    res.json({ response: data.response || "No response from model" })
  } catch (err) {
    // log any unexpected server errors
    console.error("Server Error:", err.message)
    // tell the browser the server could not reach ollama
    res.status(500).json({ error: "Failed to connect to Ollama", detail: err.message })
  }
})

// start the server and print the url to open
app.listen(PORT, () => {
  console.log(`✅ Mini ChatGPT running at http://localhost:${PORT}`)
  console.log("👉 ensure ollama is running and mistral is pulled")
})
