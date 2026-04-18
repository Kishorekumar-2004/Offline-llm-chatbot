// cache references to important dom elements
const q = document.getElementById("q") // textarea for the question
const out = document.getElementById("out") // div where answer appears
const st = document.getElementById("st") // status line for messages

// simple typing effect to make the answer feel alive
function typeWrite(txt) {
  out.textContent = "" // clear previous content
  let i = 0 // start index
  const t = txt || "" // safe fallback to empty string
  const iv = setInterval(() => {
    out.textContent += t.charAt(i) // append one character at a time
    i++ // move to next character
    if (i >= t.length) clearInterval(iv) // stop when done
  }, 10) // speed of typing effect
}

// called when user clicks ask
async function ask() {
  const prompt = (q.value || "").trim() // read text and trim spaces
  if (!prompt) {
    st.textContent = "type something first" // guide the user
    return // stop if no input
  }

  st.textContent = "thinking..." // show loading
  out.textContent = "" // clear previous answer

  try {
    // send the prompt to the server /ask api
    const res = await fetch("/ask", {
      method: "POST", // post because we send data
      headers: { "Content-Type": "application/json" }, // json payload
      body: JSON.stringify({ prompt }), // put prompt in the body
    })

    // check for http errors
    if (!res.ok) throw new Error("network error " + res.status)

    // parse the json response from server
    const data = await res.json()

    // print the answer using typing effect
    typeWrite(data.response || "no answer")
    st.textContent = "done ✅" // show done message
  } catch (e) {
    // if anything fails, show a helpful message
    st.textContent = "could not connect to ollama" // user facing message
    out.textContent = e.message // developer friendly detail
  }
}

// wire up the buttons to actions
document.getElementById("ask").onclick = ask // click ask to send prompt
document.getElementById("clear").onclick = () => {
  q.value = "" // clear input
  out.textContent = "" // clear output
  st.textContent = "" // clear status
}
