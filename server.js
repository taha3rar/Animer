var express = require("express");
var app = express();
var cors = require('cors')
const puppeteer = require('puppeteer');
const anime = require('gogoanime')
anime.animeEpisodeHandler('naruto-episode-1').then(ep => {
    console.log(ep[0].servers[0].iframe); // this could be a url for any episode just change 'naruto-episode-1' to any anime + '-episode-number' 
})
app.use(cors({ origin: 'http://localhost:8888' }));
app.get('/url', (req, res, next) => {
    var url = req.url.substr(req.url.indexOf('?') + 1)// i send the link for the episode with ?{link} and this is how i get the link in express
    console.log(url);//https://vidstreaming.io/streaming.php?id=MjUwNTQ=&title=Naruto+Episode+1 ins this case
    if (url.includes('http')) {
        pup(url, res);
    }

});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

async function pup(url, res) {
    //executablePath: 'Google/Chrome/Application/chrome',
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('video')
    await page.click('video');
    await page.waitFor(500);
    let pages = await browser.pages();
    // await pages[2].close();//first click opens an ad in a new tab and this closes it
    console.log(pages.length);
    await page.click('video');
    await page.waitForFunction('document.querySelector("video").getAttribute("src").includes("http")');
    console.log('Value changed!')
    let p = await page.evaluate('document.querySelector("video").getAttribute("src")'); //this is how i get the src and thats what i return
    await browser.close();
    res.setHeader('Access-Control-Allow-Origin', '*');// i dont know what this is 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send(p);//responds with the link to the original .mp4 video 
    return p; //not needed 
};
