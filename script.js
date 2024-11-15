document.getElementById('generate-quiz').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const response = await fetch('https://your-api-url/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
    });

    const data = await response.json();
    document.getElementById('quiz-result').innerHTML = data.response;
});
