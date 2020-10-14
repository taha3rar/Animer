const fetch = require('node-fetch');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const url = require('./urls');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const ongoingSeries = async () => {
  const res = await fetch(`${url.BASE_URL}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  Array.from({ length: 30 }, (v, k) => {
    $('div.main_body div.series nav.menu_series ul li')
      .eq(k + 1)
      .each((index, element) => {
        const $element = $(element);
        const id = $element.find('a').attr('href');
        const title = $element.find('a').text();
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
  query = query.replace(/-/g, ' ');
  console.log(query);
  const res = await fetch(`${url.BASE_URL}/search.html?keyword=${query}`);
  const body = await res.text();
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('a').attr('href');
    const title = $element.find('a').text().trim();
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

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('a').attr('href');
    const title = $element.find('a').text().trim();
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

  $('div.main_body div.anime_list_body ul.listing li').each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find('a').attr('href');
      const title = $element.find('a').text().trim();
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

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element.find('a').text().trim();
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

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element.find('a').text().trim();
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

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element.find('a').text().trim();
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

  $('div.main_body.none div.added_series_body ul.listing li').each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find('a').attr('href');
      const title = $element.find('a').text();
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

  $('div.main_body div.last_episodes.loaddub ul.items li').each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find('p.name a').attr('href');
      const title = $element.find('p.name a').text();
      const episode = parseInt(
        $element.find('p.episode').text().match(/\d+/g),
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

  $('div#wrapper_bg').each((index, element) => {
    const $element = $(element);
    const animeId = $element
      .find('div.anime_video_body div.anime_video_body_cate div.anime-info a')
      .attr('href');
    const category = $element
      .find('div.anime_video_body div.anime_video_body_cate a')
      .attr('href')
      .split('/')[2]
      .trim();

    const servers = [];
    $element.find('div.anime_muti_link ul li').each((j, el) => {
      const $el = $(el);
      const name = $el
        .find('a')
        .text()
        .substring(0, $el.find('a').text().lastIndexOf('C'))
        .trim();
      let iframe = $el.find('a').attr('data-video');
      if (iframe.startsWith('//')) {
        iframe = $el.find('a').attr('data-video').slice(2);
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

  $('div#wrapper_bg').each((index, element) => {
    const $element = $(element);
    const img = $element.find('div.anime_info_body_bg img').attr('src');
    const synopsis = $element
      .find('div.anime_info_body_bg p.type')
      .eq(1)
      .text();
    const genres = [];
    $element
      .find('div.anime_info_body_bg p.type')
      .eq(2)
      .find('a')
      .each((j, el) => {
        const $el = $(el);
        const genre = $el.attr('href').split('/')[4];
        genres.push(genre);
      });
    const released = parseInt(
      $element.find('div.anime_info_body_bg p.type').eq(3).text().match(/\d+/g),
      10
    );
    const status = $element
      .find('div.anime_info_body_bg p.type')
      .eq(4)
      .text()
      .replace('Status:', '')
      .trim();
    const otherName = $element
      .find('div.anime_info_body_bg p.type')
      .eq(5)
      .text()
      .replace('Other name:', '')
      .trim();
    const liTotal = $('div.anime_video_body ul#episode_page li').length;
    let totalEpisodes = 0;
    if (
      $('div.anime_video_body ul#episode_page li')
        .eq(liTotal - 1)
        .find('a')
        .text()
        .includes('-')
    ) {
      totalEpisodes = parseInt(
        $('div.anime_video_body ul#episode_page li')
          .eq(liTotal - 1)
          .find('a')
          .text()
          .split('-')[1],
        10
      );
    } else {
      totalEpisodes = parseInt(
        $('div.anime_video_body ul#episode_page li')
          .eq(liTotal - 1)
          .find('a')
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
  console.log(url);
  const data = await res.text();
  const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const _URLs = String(data)
    .match(match)
    .filter((url) => {
      return (
        (!url.includes('.mp4upload') && url.includes('.mp4')) ||
        url.includes('m3u8') ||
        url.includes('vidstreaming.io/goto.php') ||
        (url.includes('gogo-stream.com') && url.includes('url')) ||
        url.includes('storage.googleapis.com')
      );
    });
  console.log(_URLs);
  const URLs = [];
  Array.from({ length: _URLs.length }, (v, k) => {
    const option = k + 1;
    let url = _URLs[k];
    if (!url.includes('https://')) {
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
  let splitted = _url.split('-episode-');
  const name = splitted[0];
  const num = parseInt(splitted[1], 10);
  console.log(_url); //anime name and episode in this case
  if (_url.includes('-episode')) {
    const ep = await animeEpisodeHandler(_url);
    if (
      ep &&
      ep[0] &&
      ep[0].servers &&
      ep[0].servers[0] &&
      ep[0].servers[0].iframe
    ) {
      let link;
      if (!ep[0].servers[0].iframe.includes('http')) {
        console.log('xd');
        link = 'https://' + ep[0].servers[0].iframe;
      } else {
        link = ep[0].servers[0].iframe;
      }
      console.log(ep[0].servers[0].iframe);
      let vid = await decodeVidstreamingIframeURL(link);
      if (vid.length === 0) {
        vid = await decodeVidstreamingIframeURL(
          link.replace('streaming.php', 'loadserver.php')
        );
        promises = vid;
        if (ep[0].servers && vid.length === 0) {
          console.log('here');
          let alt = ep[0].servers.find((e, i) => {
            if (e.name.toLowerCase().includes('mp4upload')) return e;
          });
          if (alt) {
            promises = await pup(alt.iframe);
          }
        }
      } else {
        promises = vid;
      }
      let vi = [];
      if (
        splitted[0].includes('shingeki-no-kyojin') &&
        splitted[0].includes('season-3') &&
        !splitted[0].includes('part-2')
      ) {
        splitted[0] = 'shingeki-no-kyojin-s3';
      }
      if (splitted && splitted[0] && !splitted[0].includes('one-piece')) {
        vi = await decodeVidstreamingIframeURL(
          'https://4anime.to/' + splitted[0] + '-episode-0' + splitted[1]
        );
        if (vi.length === 0) {
          vi = await decodeVidstreamingIframeURL(
            'https://4anime.to/' + splitted[0] + '-episode-' + splitted[1]
          );
        }
      }
      if (vi.length !== 0) {
        promises.push(vi[0]);
      }
      console.log(vi);
      console.log('that was vi');
      const AU = await getEp(name, num);
      if (AU) {
        promises.push(AU);
      }
      const AR = await getAr(name, num);
      if (AR) {
        promises.push(AR);
      }
      console.log(promises);
      return Promise.all(promises);
    }
    return Promise.all('sad');
  }
};
const pup = async (alt) => {
  return new Promise(async (resolve) => {
    const ure = [];
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox', // these two args for heroku to use puppeteer
      ],
    });
    const page = await browser.newPage();
    await page.goto(alt, { waitUntil: 'domcontentloaded' });
    console.log(alt);
    page.on('response', async (resp) => {
      uri = resp.url();
      if (uri && uri.includes('video.mp4') && uri.includes('mp4upload')) {
        ure.push(resp.url());
        console.log(resp.url());
        resolve(ure);
        await browser.close();
      }
    });
  });
};
const pupe = async (alt) => {
  let i = -1;
  const re = await fetch(alt);
  const body = await re.text();
  const $ = cheerio.load(body);
  let match = 'Solidfiles';
  $('ul.TPlayerNv li').each((index, element) => {
    const $element = $(element);
    if ($element.find('span').text().includes(match)) {
      i = index + 1;
      match = 'oiasjdiowqdjijwqdiowq';
      // console.log(i);
    }
  });
  if (i !== -1) {
    let frame = await puppet(alt, i);
    if (frame !== 'a') {
      let result = await matcher(frame);
      // console.log(result[0]);
      return Promise.resolve('http://' + result[0]);
    } else Promise.resolve('a');
  } else {
    return Promise.resolve('a');
  }
};
const matcher = async (frame) => {
  const res = await fetch(frame[0]);
  const data = await res.text();
  const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const _URLs = String(data)
    .match(match)
    .filter((url) => {
      return url.includes('.mp4');
    });
  return Promise.resolve(_URLs);
};
const puppet = async (alt, i) => {
  let hi = false;
  return new Promise(async (resolve) => {
    const ure = [];
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox', // these two args for heroku to use puppeteer
      ],
      headless: true,
    });
    try {
      const page = await browser.newPage();
      await page.goto(alt, { waitUntil: 'domcontentloaded' });
      try {
        await page.click(`ul.TPlayerNv li[data-tplayernv='Opt${i}']`);
      } catch (e) {
        resolve('a');
        console.log(e);
      }
      page.on('response', async (resp) => {
        uri = resp.url();
        if (uri && uri.includes('solidfiles')) {
          ure.push(resp.url());
          // console.log(resp.url());
          hi = true;
          resolve(ure);
          await browser.close();
        }
        setTimeout(() => {
          if (!hi) {
            resolve('a');
          }

          return;
        }, 7000);
      });
    } catch (e) {
      console.log(e);
      await browser.close();
    }
  });
};
const getEp = async (name, num) => {
  try {
    const eps = await mongoose.model('Animes').findOne({ name: name }).exec();
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
  try {
    const eps = await mongoose
      .model('Animes')
      .findOne({ name: name + '-ar' })
      .exec();
    if (eps == null) {
      console.log('not found');
      return Promise.resolve(false);
    } else {
      if (num > eps.episodes.length) {
        console.log('done');
        return Promise.resolve(false);
      } else if (num > 0) {
        console.log(eps.episodes[num - 1]);
        return Promise.resolve(await ar(eps.episodes[num - 1]));
      }
    }
  } catch (err) {
    // res.status(400).json(false);
    console.log(err);
  }
};
const ar = async (link) => {
  return new Promise(async (resolve) => {
    let a = false;
    setTimeout(() => {
      if (!a) {
        resolve(link);
      }
    }, 3000);
    const res = await fetch(link);
    const data = await res.text();
    const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const _URLs = String(data)
      .match(match)
      .filter((url) => {
        a = true;
        return url.includes('.mp4');
      });
    resolve('http://' + _URLs[0]);
  });
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
  pupe,
};