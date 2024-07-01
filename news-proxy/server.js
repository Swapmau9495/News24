const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=2aeadb34b95f4769a3691bfd6b18af63', {
      params: {
        // country: 'in',
        // apiKey: '2aeadb34b95f4769a3691bfd6b18af63',
        page: req.query.page,
        pageSize: req.query.pageSize,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
