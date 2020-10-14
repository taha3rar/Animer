const express = require("express");
const router = express.Router();
const api = require("../api");
const schemas = require("../../mongo/schemas");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helpers = require("../../helpers/helper");
const cheerio = require("cheerio");
const exists = require("url-exists-promise");

router.get("/Search/:query", (req, res) => {
  const query = req.params.query;
  api.search(query).then((search) => {
    res.status(200).json({
      search,
    });
  });
});

router.get("/AnimeEpisodeHandler/:id", (req, res) => {
  const id = req.params.id;
  api.animeEpisodeHandler(id).then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/RecentReleaseEpisodes/:page", (req, res) => {
  const page = parseInt(req.params.page, 10);
  api.recentReleaseEpisodes(page).then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/RecentlyAddedSeries", (req, res) => {
  api.recentlyAddedSeries().then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/OngoingSeries", (req, res) => {
  api.ongoingSeries().then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/Alphabet/:letter/:page", (req, res) => {
  const letter = req.params.letter.toUpperCase();
  const page = parseInt(req.params.page, 10);
  api.alphabetList(letter, page).then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/NewSeasons/:page", (req, res) => {
  const page = parseInt(req.params.page, 10);
  api.newSeasons(page).then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/Movies/:page", (req, res) => {
  const page = parseInt(req.params.page, 10);
  api.movies(page).then((movies) => {
    res.status(200).json({
      movies,
    });
  });
});

router.get("/Popular/:page", (req, res) => {
  const page = parseInt(req.params.page, 10);
  api.popular(page).then((popular) => {
    res.status(200).json({
      popular,
    });
  });
});

router.get("/Genre/:genre/:page", (req, res) => {
  const genre = req.params.genre;
  const page = parseInt(req.params.page, 10);
  api.genres(genre, page).then((anime) => {
    res.status(200).json({
      anime,
    });
  });
});

router.get("/DecodeVidstreamingIframeURL/*", (req, res) => {
  const url = req.originalUrl;
  const urlParts = url.split("/");
  const _url = `${urlParts[4].concat("/" + urlParts[5])}`.trim();
  api.decodeVidstreamingIframeURL(_url).then((videos) => {
    res.status(200).json({
      videos,
    });
  });
});
router.get("/anime*", async (req, res) => {
  const url = req.originalUrl;
  const urlParts = url.split("/");
  const _url = url.substr(url.indexOf("?") + 1);
  api.anime(_url).then((videos) => {
    if (videos === "sad") {
      res.status(404).json("sad");
    } else res.status(200).json(videos);
  });
});
router.post("/db/favorites", async (req, res) => {
  let object = req.body;
  let id = object.id;
  let favorite = {
    anime: [object.anime],
    owner: id,
  };
  let toDelete = object.delete;
  console.log(toDelete);
  const favorites = mongoose.model("favorites", schemas.favorites);
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(404).json("Id doesnt exist");
    } else {
      try {
        //favs
        favs = await helpers.getFavs(id);
        if (favs === null) {
          new favorites(favorite).save().then((monData) => {
            res.status(200).json(monData);
          });
        } else if (!toDelete) {
          favs.anime.push(...favorite.anime);
          favs.save().then((monData) => {
            res.status(200).json(monData);
          });
        } else if (toDelete) {
          index = favs.anime.findIndex((anime) => {
            return anime.title == object.anime.title;
          });
          if (index !== -1) {
            favs.anime.splice(index, 1);
            favs.save().then((monData) => {
              res.status(200).json(monData);
            });
          } else res.status(400).json("handle in frontend");
        }
      } catch (err) {
        //
      }
    }
  } catch (err) {
    res.status(404).send("NOT FOUND");
  }
});
router.post("/db/favorites/delete", async (req, res) => {
  let object = req.body;
  let id = object.id;
  let anime = object.anime;
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(404).json("Id doesnt exist");
    } else {
      try {
        //favs
        const favs = await helpers.getFavs(id);
        favs.anime = anime;
        favs.save().then((monData) => {
          res.status(200).json(monData);
        });
      } catch (err) {
        //
      }
    }
  } catch (err) {
    res.status(404).send("NOT FOUND");
  }
});
router.post("/db/keeps/delete", async (req, res) => {
  let object = req.body;
  let id = object.id;
  let keeper = object.keeper;
  const keep = mongoose.model("keep", schemas.keep);
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(404).json("Id doesnt exist");
    } else {
      try {
        //favs
        keeps = await helpers.getKeeps(id);
        if (keeps === null) {
          new keep({ keeper: keeper, owner: id }).save().then((data) => {
            res.json(data);
          });
        } else {
          keeps.keeper = keeper;
          keeps.save().then((monData) => {
            res.status(200).json(monData);
          });
        }
      } catch (err) {
        //
      }
    }
  } catch (err) {
    res.status(404).send("NOT FOUND");
  }
});
router.post("/db/register", async (req, res) => {
  let user = req.body;
  user.password = await helpers.encrypt(user.password);
  const mongoUser = mongoose.model("user", schemas.user);
  mongoose.model("user").findOne({ userName: user.userName }, (err, data) => {
    if (err) {
      res.status(404).send("NOT FOUND");
    } else if (data === null) {
      new mongoUser(user).save().then((data) => {
        res.status(200).json(data);
      });
    } else {
      res.status(404).json("Username already exists");
    }
  });
});
router.post("/db/login", async (req, res) => {
  let user = req.body;
  let hash = await helpers.encrypt(user.password);
  mongoose
    .model("user")
    .findOne({ userName: user.userName }, async (err, data) => {
      if (err) {
        res.status(404).send("NOT FOUND");
      } else if (data === null) {
        res.status(404).json("Username doesnt exist");
      } else {
        if (await helpers.compare(user.password, data.password))
          res.status(200).json(data);
        else res.status(401).json("Wrong username or password");
      }
    });
});
router.post("/db/watched", async (req, res) => {
  let selected_episode = req.body.watched;
  let id = req.body.id;
  const watched = mongoose.model("watched", schemas.watched);
  mongoose.model("user").findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send("NOT FOUND");
    } else if (data === null) {
      res.status(404).json("Id doesnt exist");
    } else {
      mongoose.model("watched").findOne({ owner: id }, (err, watch) => {
        if (err) {
          console.log(err);
        } else if (watch === null) {
          new watched({ episodes: [selected_episode], owner: id })
            .save()
            .then((monData) => {
              res.status(200).json(monData);
            });
        } else {
          const index = watch.episodes.findIndex((episode) => {
            return episode === selected_episode;
          });
          if (index === -1) {
            watch.episodes.push(selected_episode);
            watch.save().then((episodes) => {
              res.status(200).json(episodes);
            });
          } else res.status(400).json("exists");
        }
      });
    }
  });
});

router.post("/db/keep", async (req, res) => {
  let object = req.body;
  let id = object.id;
  let num = object.keeper.num;
  let episode = object.keeper.episode;
  let keep_object = {
    anime: object.keeper.anime,
    num: num,
    episode: episode,
  };
  let toDelete = object.delete;
  const keep = mongoose.model("keep", schemas.keep);
  mongoose.model("user").findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send("NOT FOUND");
    } else if (data === null) {
      res.status(404).json("Id doesnt exist");
    } else {
      mongoose.model("keep").findOne({ owner: id }, (err, keeps) => {
        if (err) {
          console.log(err);
        } else if (keeps === null) {
          new keep({
            keeper: [keep_object],
            owner: id,
          })
            .save()
            .then((monData) => {
              res.status(200).json(monData);
            });
        } else {
          let foundAnime = -1;
          keeps.keeper.forEach((k, index) => {
            if (k.anime.title === keep_object.anime.title) {
              keeps.keeper[index] = keep_object;
              foundAnime = 1;
            }
          });
          if (foundAnime === -1) {
            keeps.keeper.push(keep_object);
          }
          keeps.save().then((monData) => {
            res.status(200).json(monData);
          });
        }
      });
    }
  });
});
router.get("/db/all/:id", async (req, res) => {
  let id = req.params.id;
  const promise = {
    keeps: {
      keeper: [],
      owner: "",
      _id: "",
    },
    favorites: {
      anime: [],
      owner: "",
      _id: "",
    },
    watched: {
      episodes: [],
      owner: "",
      _id: "",
    },
  };
  try {
    //user
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(404).json("Id doesnt exist");
    } else {
    }
    try {
      //keeps
      const keeps = await helpers.getKeeps(id);
      if (keeps !== null) {
        promise.keeps.keeper.push(...keeps.keeper);
        promise.keeps.owner = id;
        promise.keeps._id = keeps._id;
      }
    } catch (err) {}
    try {
      //favorites
      const favs = await helpers.getFavs(id);
      if (favs !== null) {
        promise.favorites.anime.push(...favs.anime);
        promise.favorites.owner = id;
        promise.favorites._id = favs._id;
      }
    } catch (err) {}
    try {
      const watched = await helpers.getWatched(id);
      if (watched !== null) {
        promise.watched.episodes.push(...watched.episodes);
        promise.watched.owner = id;
        promise.watched._id = watched._id;
      }
    } catch (err) {}
    res.json(promise);
  } catch (err) {
    //no user
    console.log(err);
    res.status(404).send("NOT FOUND");
    return;
  }
});
router.get("/db/favorites/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(400).json("NOT FOUND");
    } else {
      try {
        const favs = await helpers.getFavs(id);
        if (favs !== null) {
          res.status(200).json(favs);
        } else res.status(200).json({});
      } catch (err) {
        res.status(400).json("FAVS NOT FOUND");
      }
    }
  } catch (err) {}
});
router.get("/db/keeps/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(400).json("NOT FOUND");
    } else {
      try {
        const keeps = await helpers.getKeeps(id);
        if (keeps !== null) {
          res.status(200).json(keeps);
        } else res.status(200).json({});
      } catch (err) {
        res.status(400).json("KEEPS NOT FOUND");
      }
    }
  } catch (err) {}
});
router.get("/db/watched/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await helpers.getUser(id);
    if (userData === null) {
      res.status(400).json("NOT FOUND");
    } else {
      try {
        const watched = await helpers.getWatched(id);
        if (watched !== null) {
          res.status(200).json(watched);
        } else res.status(200).json({});
      } catch (err) {
        res.status(400).json("watched NOT FOUND");
      }
    }
  } catch (err) {}
});
const fetch = require("node-fetch");
const { anime, pupe } = require("../api");
const performance = require("perf_hooks").performance;

router.get("/check", async (req, res) => {
  let num = 1;
  let episodes = [];
  let a;
  while (num <= 37) {
    a = await pupe(
      `https://w.gateanime.com/episode/%d8%a7%d9%86%d9%85%d9%8a-death-note-%d8%a7%d9%84%d8%ad%d9%84%d9%82%d8%a9-${num}-%d9%85%d8%aa%d8%b1%d8%ac%d9%85%d8%a9/`
    );
    console.log(a, num);
    episodes.push(a);
    num++;
  }
  // res.json(a);
  const animes = await mongoose
    .model("Animes")
    .findOne({ name: "death-note-ar" })
    .exec();
  console.log(animes);
  const animenz = {
    name: "death-note-ar",
    episodes: episodes,
  };
  const anim = mongoose.model("Animes", schemas.Animes);
  new anim(animenz).save().then((data) => {
    res.status(200).json(data);
  });
});
router.get("/episode/:name/:number", async (req, res) => {
  const name = req.params.name;
  const num = parseInt(req.params.number, 10);
  const episode = await api.getEp(name, num);
  if (episode) {
    res.status(200).json(episode);
  } else res.status(400).json(false);
});
module.exports = router;