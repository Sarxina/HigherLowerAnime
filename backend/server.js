const axios = require('axios')

const express = require('express');
const app = express();

const util = require('util');
const sleep = util.promisify(setTimeout);

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fetchAnimeWithDelay = async (pageNumber) => {
  await sleep(1200)
  return axios.get(`https://api.jikan.moe/v4/top/anime?page=${pageNumber}`);
}

app.get('/api/anime/random', async (req, res) => {
    try {
      // Define the maximum number of top anime to consider
      const topN = 1000; // You can change this number as needed

      // Calculate the number of pages to fetch (each page has 25 anime)
      const totalPages = Math.ceil(topN / 25);

      // Randomly select a page number
      const randomPage = Math.floor(Math.random() * totalPages) + 1;

      let response;
      let success = false;
      let retries = 3;

      // Fetch the top anime list from the Jikan API
      response = await fetchAnimeWithDelay(randomPage);

      // Get the list of anime from the response
      const animeList = response.data.data;

      // Randomly select an anime from the fetched list
      const randomAnime = animeList[Math.floor(Math.random() * animeList.length)];

      // Send the random anime data as JSON
      res.json(randomAnime);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
