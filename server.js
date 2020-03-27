const express = require("express");
const app = express();
const cors = require('cors')
const puppeteer = require('puppeteer');
const anime = require('gogoanime')
let numberOfResponses = 0;
app.use(cors({ origin: 'http://localhost:8888' }));//idk
app.get('/url', (req, res, next) => {
    let url = req.url.substr(req.url.indexOf('?') + 1)//probably not the best way to get the param but it works lol // i send the link for the episode with ?{link} and this is how i get the link in express
    console.log(url);//https://vidstreaming.io/streaming.php?id=MjUwNTQ=&title=Naruto+Episode+1 in  this case
    if (url.includes('http')) {
        pup(url, res);
    }

});
app.get('/anime', (req, res, next) => {
    let url = req.url.substr(req.url.indexOf('?') + 1)// i send the link for the episode with ?{link} and this is how i get the link in express
    console.log(url);//anime name and episode in this case
    if (url.includes('episode')) {
        anime.animeEpisodeHandler(url).then(ep => {
            let link = "https://" + ep[0].servers[0].iframe
            console.log(ep[0].servers[0].iframe)
            pup(link, res);
        })
    }

});
app.get('/uses', (req, res, next) => {
    res.send(numberOfResponses);

});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

async function pup(url, res) {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',// these two args for heroku to use puppeteer
        ],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    console.log('video found');

    await page.click('html');
    console.log('clicked');
    await page.waitFor(500);
    await page.click('video');
    await page.waitForFunction('document.querySelector("video").getAttribute("src").includes("http")');
    let p = await page.evaluate('document.querySelector("video").getAttribute("src")'); //this is how i get the src and thats what i return
    await browser.close();
    res.setHeader('Access-Control-Allow-Origin', '*');// i dont know what this is 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    numberOfResponses -= -1; //xd
    console.log(numberOfResponses);
    res.send(p);//responds with the link to the original .mp4 video 
};
///
// const express = require("express");
// const app = express();
// const cors = require('cors')
// const puppeteer = require('puppeteer');
// const anime = require('gogoanime')
// let numberOfResponses = 0;
// app.use(cors({ origin: 'http://localhost:8888' }));//idk
// app.get('/url', (req, res, next) => {
//     let url = req.url.substr(req.url.indexOf('?') + 1)//probably not the best way to get the param but it works lol // i send the link for the episode with ?{link} and this is how i get the link in express
//     console.log(url);//https://vidstreaming.io/streaming.php?id=MjUwNTQ=&title=Naruto+Episode+1 in  this case
//     if (url.includes('http')) {
//         pup(url, res);
//     }

// });
// app.get('/anime', (req, res, next) => {
//     let url = req.url.substr(req.url.indexOf('?') + 1)// i send the link for the episode with ?{link} and this is how i get the link in express
//     console.log(url);//anime name and episode in this case
//     if (url.includes('episode')) {
//         anime.animeEpisodeHandler(url).then(ep => {
//             let link = "https://" + ep[0].servers[0].iframe
//             console.log(ep[0].servers[0].iframe)
//             pup(link, res);
//         })
//     }

// });
// app.get('/uses', (req, res, next) => {
//     res.send(numberOfResponses);

// });
// app.listen(process.env.PORT || 3000, () => {
//     console.log("Server running on port 3000");
// });

// async function pup(url, res) {
//     const browser = await puppeteer.launch({
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',// these two args for heroku to use puppeteer
//         ],
//     });
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.waitForSelector('video')
//     await page.click('video');
//     await page.waitFor(500);
//     await page.click('video');
//     await page.waitForFunction('document.querySelector("video").getAttribute("src").includes("http")');
//     let p = await page.evaluate('document.querySelector("video").getAttribute("src")'); //this is how i get the src and thats what i return
//     await browser.close();
//     res.setHeader('Access-Control-Allow-Origin', '*');// i dont know what this is 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//     numberOfResponses -= -1; //xd
//     console.log(numberOfResponses);
//     res.send(p);//responds with the link to the original .mp4 video 
// };
///