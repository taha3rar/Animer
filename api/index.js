const express = require('express');
const routes = require('./routes/index');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'FBI OPEN UP',
    entries: [
      {
        "Search": "/Search/:query",
        "anime": "/Anime",
        "AnimeEpisodeHandler": "/AnimeEpisodeHandler/:id",
        "RecentReleaseEpisodes": "/RecentReleaseEpisodes/:page",
        "RecentlyAddedSeries": "/RecentlyAddedSeries",
        "OngoingSeries": "/OngoingSeries",
        "Alphabet": "/Alphabet/:letter/:page",
        "NewSeasons": "/NewSeasons/:page",
        "Movies": "/Movies/:page",
        "Popular": "/Popular/:page",
        "Genre": "/Genre/:genre/:page",
        "DecodeVidstreamingIframeURL": "/DecodeVidstreamingIframeURL"
      }
    ]
  });
});

router.use('/', routes);

module.exports = router;