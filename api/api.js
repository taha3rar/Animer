const fetch = require("node-fetch");
const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const url = require("./urls");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const { BASE_URL_4 } = require("./urls");
const ongoingSeries = async () => {
  const res = await fetch(`${url.BASE_URL}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  Array.from({ length: 30 }, (v, k) => {
    $("div.main_body div.series nav.menu_series ul li")
      .eq(k + 1)
      .each((index, element) => {
        const $element = $(element);
        const id = $element.find("a").attr("href");
        const title = $element.find("a").text();
        promises.push(
          animeContentHandler(id).then((extra) => ({
            title: title ? title : null,
            img: extra[0] ? extra[0].img : null,
            synopsis: extra[0] ? extra[0].synopsis : null,
            genres: extra[0] ? extra[0].genres : null,
            released: extra[0] ? extra[0].released : null,
            status: extra[0] ? extra[0].status : null,
            otherName: extra[0] ? extra[0].otherName : null,
            totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
            episodes: extra[0] ? extra[0].episodes : null,
          }))
        );
      });
  });
  return await Promise.all(promises);
};

const search = async (query) => {
  const res = await fetch(`${BASE_URL_4}/?s=${query}`, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-GB,en;q=0.9,he-IL;q=0.8,he;q=0.7,en-US;q=0.6",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: `${BASE_URL_4}/?s=${query}`,
    referrerPolicy: "no-referrer-when-downgrade",
    body:
      "asl_active=1&p_asl_data=qtranslate_lang%3D0%26set_intitle%3DNone%26customset%255B%255D%3Danime",
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];
  $("#headerDIV_95").each((index, element) => {
    const $element = $(element);
    const id = $element.find("a").attr("href");
    const title = $element.find("a div").text().trim();
    promises.push(
      animeContentHandler(id).then((extra) => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const genres = async (genre, page) => {
  const res = await fetch(`${url.BASE_URL}/genre/${genre}?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.last_episodes ul.items li").each((index, element) => {
    const $element = $(element);
    const id = $element.find("a").attr("href");
    const title = $element.find("a").text().trim();
    promises.push(
      animeContentHandler(id).then((extra) => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const alphabetList = async (letter, page) => {
  const res = await fetch(`${url.BASE_URL}/anime-list-${letter}?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.anime_list_body ul.listing li").each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find("a").attr("href");
      const title = $element.find("a").text().trim();
      promises.push(
        animeContentHandler(id).then((extra) => ({
          title: title ? title : null,
          img: extra[0] ? extra[0].img : null,
          synopsis: extra[0] ? extra[0].synopsis : null,
          genres: extra[0] ? extra[0].genres : null,
          released: extra[0] ? extra[0].released : null,
          status: extra[0] ? extra[0].status : null,
          otherName: extra[0] ? extra[0].otherName : null,
          totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
          episodes: extra[0] ? extra[0].episodes : null,
        }))
      );
    }
  );
  return await Promise.all(promises);
};

const newSeasons = async (page) => {
  const res = await fetch(`${url.BASE_URL}/new-season.html?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.last_episodes ul.items li").each((index, element) => {
    const $element = $(element);
    const id = $element.find("div.img a").attr("href");
    const title = $element.find("a").text().trim();
    promises.push(
      animeContentHandler(id).then((extra) => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const movies = async (page) => {
  const res = await fetch(`${url.BASE_URL}/anime-movies.html?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.last_episodes ul.items li").each((index, element) => {
    const $element = $(element);
    const id = $element.find("div.img a").attr("href");
    const title = $element.find("a").text().trim();
    promises.push(
      animeContentHandler(id).then((extra) => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const popular = async (page) => {
  const res = await fetch(`${url.BASE_URL}/popular.html?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.last_episodes ul.items li").each((index, element) => {
    const $element = $(element);
    const id = $element.find("div.img a").attr("href");
    const title = $element.find("a").text().trim();
    promises.push(
      animeContentHandler(id).then((extra) => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const recentlyAddedSeries = async () => {
  const res = await fetch(`${url.BASE_URL}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body.none div.added_series_body ul.listing li").each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find("a").attr("href");
      const title = $element.find("a").text();
      promises.push(
        animeContentHandler(id).then((extra) => ({
          title: title ? title : null,
          img: extra[0] ? extra[0].img : null,
          synopsis: extra[0] ? extra[0].synopsis : null,
          genres: extra[0] ? extra[0].genres : null,
          released: extra[0] ? extra[0].released : null,
          status: extra[0] ? extra[0].status : null,
          otherName: extra[0] ? extra[0].otherName : null,
          totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
          episodes: extra[0] ? extra[0].episodes : null,
        }))
      );
    }
  );
  return await Promise.all(promises);
};

const recentReleaseEpisodes = async (page) => {
  const res = await fetch(`${url.BASE_URL}/?page=${page}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div.main_body div.last_episodes.loaddub ul.items li").each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find("p.name a").attr("href");
      const title = $element.find("p.name a").text();
      const episode = parseInt(
        $element.find("p.episode").text().match(/\d+/g),
        10
      );
      promises.push(
        animeEpisodeHandler(id).then((extra) => ({
          title: title || null,
          img: extra[0].img || null,
          synopsis: extra[0].synopsis || null,
          genres: extra[0].genres || null,
          category: extra[0].category || null,
          episode: episode || null,
          totalEpisodes: extra[0].totalEpisodes || null,
          released: extra[0].released || null,
          status: extra[0].status || null,
          otherName: extra[0].otherName || null,
          servers: extra[0].servers || null,
        }))
      );
    }
  );
  return await Promise.all(promises);
};

const animeEpisodeHandler = async (id) => {
  const res = await fetch(`${url.BASE_URL_4}/${id}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];
  $("div#app-mount").each((index, element) => {
    const $element = $(element);
    const animeId = $element.find("a#titleleft").attr("href").trim();
    const category = "TV Series";
    const servers = [
      { name: "4anime", iframe: $element.find("#videoo1").attr("src") },
    ];
    promises.push(
      animeContentHandler(animeId).then((extra) => ({
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        category: category ? category : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        servers: servers ? servers : null,
      }))
    );
  });
  return await Promise.all(promises);
};

const animeContentHandler = async (id) => {
  console.log("id", id);
  const res = await fetch(`${id}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("#info").each((index, element) => {
    const $element = $(element);
    const img = $element.find(".cover img").attr("src");
    const synopsis =
      $element.find("#description-mob p").eq(0).text() +
      $element.find("#description-mob p").eq(1).text();
    const genres = [];
    $element.find(".ui.tag.horizontal.list a").each((j, el) => {
      const $el = $(el);
      const genre = $el.text();
      genres.push(genre);
    });
    const released =
      $element.find(".detail").eq(2).find(".data").eq(0).text() +
      ", " +
      $element.find(".detail").eq(2).find(".data").eq(1).text();
    const status = $element.find(".detail").eq(3).find(".data").text();
    let num = 0;
    $element.find(".episodes.range li").each((i, el) => {
      num++;
    });
    const totalEpisodes = num;
    const name = id.slice(id.lastIndexOf("/") + 1);
    const episodes = [...new Array(totalEpisodes)].map((a, ind) => {
      return { id: `${name}-episode-${ind + 1}` };
    });

    promises.push({
      img: img,
      synopsis: synopsis.slice(11),
      genres: genres,
      released: released,
      status: status,
      otherName: "",
      totalEpisodes: totalEpisodes,
      episodes: episodes,
    });
  });
  return await Promise.all(promises);
};

const decodeVidstreamingIframeURL = async (url) => {
  const _url = `${url}`;
  let realUrl = "";
  if (_url.includes("streaming")) {
    realUrl = _url.replace(/streaming/g, "check").trim();
    if (realUrl.includes("vidcheck.io")) {
      realUrl = _url.replace(/vidcheck.io/g, "vidstreaming.io").trim();
    }
  }
  if (_url.includes("load")) {
    realUrl = _url.replace(/load/g, "check").trim();
  }
  if (_url.includes("server")) {
    realUrl = _url.replace(/server/g, "check").trim();
  }

  const data = await cloudscraper(realUrl);
  const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const _URLs = String(data)
    .match(match)
    .filter((url) => {
      return (
        (!url.includes(".mp4upload") && url.includes(".mp4")) ||
        url.includes("m3u8") ||
        url.includes("vidstreaming.io/goto.php")
      );
    });

  const URLs = [];
  Array.from({ length: _URLs.length }, (v, k) => {
    const option = k + 1;
    let url = _URLs[k];
    if (!url.includes("https://")) {
      url = `https://${url}`;
    }
    URLs.push(url);
  });

  return Promise.all(URLs);
};
const anime = async (url) => {
  const _url = url;
  url = _url;
  let promises = [];
  let splitted = _url.split("-episode-");
  const name = splitted[0];
  const num = parseInt(splitted[1], 10);
  console.log(name, num);
  console.log(_url); //anime name and episode in this case
  if (_url.includes("-episode")) {
    const ep = await animeEpisodeHandler(_url);
    if (
      ep &&
      ep[0] &&
      ep[0].servers &&
      ep[0].servers[0] &&
      ep[0].servers[0].iframe &&
      ep[0].servers[0].name !== "4anime"
    ) {
      let link = "https://" + ep[0].servers[0].iframe;
      console.log(ep[0].servers[0].iframe);
      let vid = await decodeVidstreamingIframeURL(link);
      if (vid.length === 0) {
        if (ep[0].servers) {
          let alt = ep[0].servers.find((e, i) => {
            if (e.name.toLowerCase().includes("mp4upload")) return e;
          });
          if (alt) {
            promises = await pup(alt.iframe);
          }
        }
      } else {
        promises = vid;
      }
      const AU = await getEp(name, num);
      if (AU) {
        promises.push(AU);
      }
      console.log(promises);
      return Promise.all(promises);
    }
    if (ep[0].servers[0].name === "4anime") {
      return Promise.all([ep[0].servers[0].iframe]);
    }
    return Promise.all("sad");
  }
};
const pup = async (alt) => {
  return new Promise(async (resolve) => {
    const ure = [];
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox", // these two args for heroku to use puppeteer
      ],
    });
    const page = await browser.newPage();
    await page.goto(alt, { waitUntil: "domcontentloaded" });
    console.log(alt);
    page.on("response", async (resp) => {
      uri = resp.url();
      if (uri && uri.includes("video.mp4") && uri.includes("mp4upload")) {
        ure.push(resp.url());
        console.log(resp.url());
        resolve(ure);
        await browser.close();
      }
    });
  });
};
const getEp = async (name, num) => {
  try {
    const eps = await mongoose.model("Animes").findOne({ name: name }).exec();
    if (eps == null) {
      return Promise.resolve(false);
    } else {
      if (num > eps.episodes.length) {
        return Promise.resolve(false);
      } else if (num > 0) {
        console.log(eps.episodes[num - 1]);
        return Promise.resolve(eps.episodes[num - 1]);
      }
    }
  } catch (err) {
    res.status(400).json(false);
  }
};
module.exports = {
  animeEpisodeHandler,
  recentReleaseEpisodes,
  recentlyAddedSeries,
  ongoingSeries,
  alphabetList,
  newSeasons,
  movies,
  popular,
  search,
  genres,
  decodeVidstreamingIframeURL,
  anime,
  getEp,
};
