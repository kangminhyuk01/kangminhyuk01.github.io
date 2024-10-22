const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config(); // .env 파일을 사용해 환경변수 로드

app.use(express.json());

app.post('/openai-api', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // 환경변수에서 API 키 사용
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            })
        });

        const data = await response.json();
        if (response.ok) {
            res.json({ response: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: data.error.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
