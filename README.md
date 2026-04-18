# Mini ChatGPT — Local AI Chatbot 💬

A lightweight AI chatbot that runs **completely offline** on your laptop.  
No internet. No API key. Powered by **Ollama + Mistral** model.

---

## 📁 Project Structure

```
kishore/
├── server.js           # Express backend — talks to Ollama
├── public/
│   ├── index.html      # Chat UI
│   ├── script.js       # Frontend logic + typewriter effect
│   └── style.css       # Dark theme styling
└── package.json        # Node.js dependencies
```

---

## ⚙️ How It Works

```
You type a question in the browser
        ↓
Express server receives it via POST /ask
        ↓
Server sends it to Ollama on localhost:11434
        ↓
Mistral model processes it locally
        ↓
Answer appears in browser with typewriter effect ✨
```

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | HTML, CSS, JavaScript       |
| Backend   | Node.js, Express.js         |
| AI Engine | Ollama (local LLM runtime)  |
| AI Model  | Mistral (runs 100% offline) |

---

## 🚀 How to Run

### 1. Install Ollama
Download from [https://ollama.com](https://ollama.com) and install it.

### 2. Pull the Mistral model
```bash
ollama pull mistral
```

### 3. Start Ollama
```bash
ollama serve
```

### 4. Install dependencies
```bash
npm install
```

### 5. Start the server
```bash
node server.js
```

### 6. Open in browser
```
http://localhost:3000
```

---

## ✨ Features

- 🔒 Fully offline — no data sent anywhere
- ⌨️ Typewriter animation on responses
- 🌑 Clean dark theme UI
- ⚡ No React or heavy frameworks — pure HTML/CSS/JS
- 🔄 Clear button to reset the chat

---

## 👤 Author

**Kishore Kumar**  
Final Year B.E. CSE — PSNA College of Engineering & Technology, Dindigul

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://in.linkedin.com/in/kishore-kumar-2004k)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Kishorekumar-2004)
