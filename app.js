// Fetch the elements from the DOM
const inputText = document.getElementById('inputText');
const keyLog = document.getElementById('keyLog');

// Function to log key presses
function logKey(event) {
    const key = event.key;

    // Special handling for backspace and enter keys
    if (key === 'Backspace') {
        keyLog.textContent = keyLog.textContent.slice(0, -1);
    } else if (key === 'Enter') {
        keyLog.textContent += '\n';
    } else {
        keyLog.textContent += key;
    }

    // Send the key to the backend (logging on the server)
    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Key logged:', data);
    })
    .catch((error) => {
        console.error('Error logging key:', error);
    });

    // Scroll the log box to show the latest key
    keyLog.scrollTop = keyLog.scrollHeight;
}

// Add event listener to the textarea for keydown events
inputText.addEventListener('keydown', logKey);
