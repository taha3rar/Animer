const fetch = require("node-fetch");
const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const url = require("./urls");
const puppeteer = require("puppeteer-extra");
const mongoose = require("mongoose");
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
  const res = await fetch(`${url.BASE_URL}/search.html?keyword=${query}`);
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
  const res = await fetch(`${url.BASE_URL}/${id}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div#wrapper_bg").each((index, element) => {
    const $element = $(element);
    const animeId = $element
      .find("div.anime_video_body div.anime_video_body_cate div.anime-info a")
      .attr("href");
    const category = $element
      .find("div.anime_video_body div.anime_video_body_cate a")
      .attr("href")
      .split("/")[2]
      .trim();

    const servers = [];
    $element.find("div.anime_muti_link ul li").each((j, el) => {
      const $el = $(el);
      const name = $el
        .find("a")
        .text()
        .substring(0, $el.find("a").text().lastIndexOf("C"))
        .trim();
      let iframe = $el.find("a").attr("data-video");
      if (iframe.startsWith("//")) {
        iframe = $el.find("a").attr("data-video").slice(2);
      }
      servers.push({
        name: name,
        iframe: iframe,
      });
    });
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
  const res = await fetch(`${url.BASE_URL}${id}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $("div#wrapper_bg").each((index, element) => {
    const $element = $(element);
    const img = $element.find("div.anime_info_body_bg img").attr("src");
    const synopsis = $element
      .find("div.anime_info_body_bg p.type")
      .eq(1)
      .text();
    const genres = [];
    $element
      .find("div.anime_info_body_bg p.type")
      .eq(2)
      .find("a")
      .each((j, el) => {
        const $el = $(el);
        const genre = $el.attr("href").split("/")[4];
        genres.push(genre);
      });
    const released = parseInt(
      $element.find("div.anime_info_body_bg p.type").eq(3).text().match(/\d+/g),
      10
    );
    const status = $element
      .find("div.anime_info_body_bg p.type")
      .eq(4)
      .text()
      .replace("Status:", "")
      .trim();
    const otherName = $element
      .find("div.anime_info_body_bg p.type")
      .eq(5)
      .text()
      .replace("Other name:", "")
      .trim();
    const liTotal = $("div.anime_video_body ul#episode_page li").length;
    let totalEpisodes = 0;
    if (
      $("div.anime_video_body ul#episode_page li")
        .eq(liTotal - 1)
        .find("a")
        .text()
        .includes("-")
    ) {
      totalEpisodes = parseInt(
        $("div.anime_video_body ul#episode_page li")
          .eq(liTotal - 1)
          .find("a")
          .text()
          .split("-")[1],
        10
      );
    } else {
      totalEpisodes = parseInt(
        $("div.anime_video_body ul#episode_page li")
          .eq(liTotal - 1)
          .find("a")
          .text(),
        10
      );
    }

    const episodes = Array.from({ length: totalEpisodes }, (v, k) => {
      const animeId = `${id}-episode-${k + 1}`.slice(10);
      return {
        id: animeId,
      };
    });
    promises.push({
      img: img,
      synopsis: synopsis,
      genres: genres,
      released: released,
      status: status,
      otherName: otherName,
      totalEpisodes: totalEpisodes,
      episodes: episodes,
    });
  });
  return await Promise.all(promises);
};

const decodeVidstreamingIframeURL = async (url) => {
  const _url = `${url}`;
  const res = await fetch(_url);
  const data = await res.text();
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
      ep[0].servers[0].iframe
    ) {
      let link = "https://" + ep[0].servers[0].iframe;
      console.log(ep[0].servers[0].iframe);
      console.log(link);
      let vid = await decodeVidstreamingIframeURL(link);
      if (vid.length === 0) {
        vid = await decodeVidstreamingIframeURL(
          link.replace("streaming.php", "loadserver.php")
        );
        console.log(vid);
        promises = vid;
        if (ep[0].servers && vid.length === 0) {
          console.log("here");
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
      const AR = await getAr(name, num);
      if (AR) {
        promises.push(...AR);
      }
      console.log(promises);
      return Promise.all(promises);
    }
    return Promise.all("sad");
  }
};
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const pup = async (alt) => {
  return new Promise(async (resolve) => {
    const ure = [];
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox", // these two args for heroku to use puppeteer
      ],
      headless: true,
    });
    try {
      const page = await browser.newPage();
      await page.goto(alt, { waitUntil: "domcontentloaded" });
      console.log(alt);
      try {
        page.on("response", async (resp) => {
          uri = resp.url();
          console.log(uri);
          if (uri && uri.includes("video.mp4") && uri.includes("mp4upload")) {
            ure.push(resp.url());
            console.log(resp.url());
            resolve(ure);
            await browser.close();
          } else if (uri && uri.includes("4shared") && uri.includes(".mp4")) {
            ure.push(resp.url());
            console.log(resp.url());
            browser.close();
            resolve(ure);
          }
        });
      } catch (e) {
        console.log(e);
        browser.close();
      }
    } catch (e) {
      console.log(e);
      browser.close();
    }
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
const getAr = async (name, num) => {
  console.log(name);
  if (name === "naruto-shippuden") {
    let id = "naruto-shippuden-ar";
    // let start_id = 8714;
    let episodes = [];
    over = "";
    let ep = 1;
    ep_number = 1;
    // let url = "https://storage.googleapis.com/linear-theater-254209.appspot.com/v3.4animu.me/One-Piece/One-Piece-Episode-710-1080p.mp4";
    // let thing = "1_8714.mp4";
    // let new_url = url + thing;

    let new_url = `https://www.xsanime.com/episode/naruto-shippuuden-%D8%A7%D9%84%D8%AD%D9%84%D9%82%D8%A9-${num}/`;
    let reso = "";
    let body;
    let _URLs;
    let i = 0;
    reso = await fetch(new_url);
    body = await reso.text();
    const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    _URLs = String(body)
      .match(match)
      .filter((url) => {
        return url.includes("4shared") && url.includes("embed");
      });
    if (_URLs) {
      return Promise.resolve(await pup("https://" + _URLs));
      // reso = await fetch("https://" + _URLs, {
      //       headers: {
      //         accept:
      //           "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      //         "accept-language": "en-GB,en;q=0.9,he-IL;q=0.8,he;q=0.7,en-US;q=0.6",
      //         "cache-control": "max-age=0",
      //         "sec-fetch-dest": "document",
      //         "sec-fetch-mode": "navigate",
      //         "sec-fetch-site": "none",
      //         "sec-fetch-user": "?1",
      //         "upgrade-insecure-requests": "1",
      //         cookie:
      //           "hostid=423655283; Login=1423343796; Password=96cdd64d029d16f47012e6c89ab93f3f; 4langcookie=en; ulin=true; day1host=h; cd1v=QQea9niq1Dea",
      //       },
      //       referrerPolicy: "no-referrer-when-downgrade",
      //       body: null,
      //       method: "GET",
      //       mode: "cors",
      //     });
      //     let a = await reso.text();
      //     let p = String(a)
      //       .match(match)
      //       .filter((url) => {
      //         return url.includes(".mp4");
      //       });
      //     if (p) {
      //       i++;
      //       return Promise.resolve(p);
      //     }
      //   } else {
      //     console.log("nope");
      //   }
      // }
      // )
    }
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
