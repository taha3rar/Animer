var express = require("express");
var app = express();
var cors = require('cors')
const puppeteer = require('puppeteer');
const anime = require('gogoanime')
anime.animeEpisodeHandler('naruto-episode-1').then(ep => {
    console.log(ep[0].servers[0].iframe);
})
app.use(cors({origin: 'http://localhost:8888'}));
app.get('/url', (req, res, next) => {
    var url = req.url.substr(req.url.indexOf('?') + 1)
    console.log(url);
    if (url.includes('http')) {
        pup(url, res);
    }
    // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food", pup(url)]);

});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

async function pup(url, res) {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('video')
    await page.click('video');
    await page.waitFor(500);
    let pages = await browser.pages();
    await pages[2].close();
    await page.click('video');
    await page.waitForSelector('.jw-state-playing');
    let p = await page.evaluate('document.querySelector("video").getAttribute("src")');
    await browser.close();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send(p);
    return p;
};