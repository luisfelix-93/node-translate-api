const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());
//token da API
const apiKey = process.env.API_KEY; // Documento  .env

//Endpoint para detectar o idioma de um texto
app.post('/detect-language', async (req, res) => {
    const { text } = req.body;
    url = 'https://translate.yandex.net/api/v1.5/tr.json/detect'

    try{
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                text
            }
        });
        res.status(200).json({language: response.data.lang});
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Erro ao detectar o idioma.'});

    }
});

//endpoint para traduzir o texto enviado no body

app.post('/translate', async (req, res) =>{
    const {text, targetLanguage} = req.body;
    url = 'https://translate.yandex.net/api/v1.5/tr.json/translate'

    try{
        const response = axios.get(url, {
            params: {
                key: apiKey,
                text,
                lang: targetLanguage
            }
        });
        res.status(200).json({translation: response.data.text[0]});
    } catch(error){

    }
})

//Inicie o servidor
const port = process.env.PORT; // a porta do servidor está registrada no documento .env
app.listen(port, () =>{
    console.log(`Servidor iniciado na porta ${port}`);
});


