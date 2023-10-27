const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


sendButton.disabled = true;

// Add an event listener to the input field to enable/disable the "Send" button
userInput.addEventListener("input", function() {
    if (userInput.value.trim() === "") {
        sendButton.disabled = true;
    } else {
        sendButton.disabled = false;
    }
});

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    appendMessage("You", userMessage);
    userInput.value = "";
    sendButton.disabled = true; 

    
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: userMessage,
        max_tokens: 50  
    }, {
        headers: {
            'Authorization': 'Bearer API-KEY',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const botResponse = response.data.choices[0].text;
        appendMessage("Chatbot", botResponse);
    })
    .catch(error => {
        console.error(error);
        appendMessage("Chatbot", "Oops! Something went wrong.");
    });
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
