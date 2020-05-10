const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
const anime = require("gogoanime");
let numberOfResponses = 0;
app.use(cors()); //idk
app.get("/url", (req, res, next) => {
  let url = req.url.substr(req.url.indexOf("?") + 1); //probably not the best way to get the param but it works lol // i send the link for the episode with ?{link} and this is how i get the link in express
  console.log(url); //https://vidstreaming.io/streaming.php?id=MjUwNTQ=&title=Naruto+Episode+1 in  this case
  if (url.includes("http")) {
    pup(url, res);
  }
});
app.get("/anime", (req, res, next) => {
  let url = req.url.substr(req.url.indexOf("?") + 1); // i send the link for the episode with ?{link} and this is how i get the link in express
  console.log(url); //anime name and episode in this case
  if (url.includes("episode")) {
    anime.animeEpisodeHandler(url).then((ep) => {
      let link = "https://" + ep[0].servers[0].iframe;
      console.log(ep[0].servers[0].iframe);
      let alt = ep[0].servers.find((e, i) => {
        if (e.name.toLowerCase().includes("mp4")) return e;
      });
      if (alt && alt.iframe) {
        console.log(alt);
        pup(link, res, false, alt.iframe);
      } else pup(link, res, false, false);
    });
  }
});
app.get("/hd", (req, res, next) => {
  let url = req.url.substr(req.url.indexOf("?") + 1); // i send the link for the episode with ?{link} and this is how i get the link in express
  console.log(url); //anime name and episode in this case
  if (url.includes("episode")) {
    anime.animeEpisodeHandler(url).then((ep) => {
      let link = "https://" + ep[0].servers[0].iframe;
      console.log(ep[0].servers[0].iframe);
      let alt = ep[0].servers.find((e, i) => {
        if (e.name.toLowerCase().includes("mp4")) return e;
      });
      if (alt && alt.iframe) {
        console.log(alt);
        pup(link, res, false, alt.iframe);
      } else pup(link, res, false, false);
    });
  }
});
app.get("/uses", (req, res, next) => {
  res.send(numberOfResponses);
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

// async function pup(url, res, hd) {
//   const browser = await puppeteer
//     .launch({
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox", // these two args for heroku to use puppeteer
//       ],
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log("sad");
//     });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: "domcontentloaded" });
//   let ure = "";

//   console.log("video found");
//   //   page.on("response", (res) => {
//   //     if (res.url === url) {
//   //       console.log("match");
//   //     }
//   //     uri = res.url();
//   //     console.log(res.url());
//   //     if (uri && uri.includes("https://hls") && uri.includes(".m3u8")) {
//   //       console.log(res.url());
//   //       ure = res.url();
//   //     }
//   //   });
//   let bodyHTML = await page.evaluate(() => document.body.innerHTML);
//   await page.click("html");
//   if (!hd) {
//     console.log("clicked");
//     await page.waitFor(500);
//     page
//       .click("video")
//       .then(async () => {
//         await page.waitForFunction(
//           'document.querySelector("video").getAttribute("src").includes("http")'
//         );
//         let p = await page.evaluate(
//           'document.querySelector("video").getAttribute("src")'
//         ); //this is how i get the src and thats what i return
//         await browser.close();
//         res.setHeader("Access-Control-Allow-Origin", "*"); // i dont know what this is
//         res.setHeader(
//           "Access-Control-Allow-Methods",
//           "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//         ); // If needed
//         res.setHeader(
//           "Access-Control-Allow-Headers",
//           "X-Requested-With,content-type"
//         ); // If needed
//         res.setHeader("Access-Control-Allow-Credentials", true); // If needed
//         numberOfResponses -= -1; //xd
//         console.log(numberOfResponses);
//         res.send(p); //responds with the link to the original .mp4 video
//         console.log(p);
//       })
//       .catch(async () => {
//         res.send(HD(bodyHTML));
//       });
//   } else {
//     res.setHeader("Access-Control-Allow-Origin", "*"); // i dont know what this is
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     ); // If needed
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type"
//     ); // If needed
//     res.setHeader("Access-Control-Allow-Credentials", true); // If needed
//     res.send(HD(bodyHTML));
//   }
// }
function HD(bodyHTML) {
  let p = bodyHTML.slice(
    bodyHTML.lastIndexOf("https://hls"),
    bodyHTML.lastIndexOf(".m3u8") + 5
  );
  console.log(p);
  return p;
}
async function pup(url, res, hd, alt) {
  const browser = await puppeteer
    .launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox", // these two args for heroku to use puppeteer
      ],
    })
    .catch((err) => {
      console.log(err);
      console.log("sad");
    });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  let ure = "";

  console.log("video found");

  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  await page.click("html");
  if (!hd) {
    console.log("clicked");
    await page.waitFor(500);
    page
      .click("video")
      .then(async () => {
        await page.waitForFunction(
          'document.querySelector("video").getAttribute("src").includes("http")'
        );
        let p = await page.evaluate(
          'document.querySelector("video").getAttribute("src")'
        ); //this is how i get the src and thats what i return
        await browser.close();
        res.setHeader("Access-Control-Allow-Origin", "*"); // i dont know what this is
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        ); // If needed
        res.setHeader(
          "Access-Control-Allow-Headers",
          "X-Requested-With,content-type"
        ); // If needed
        res.setHeader("Access-Control-Allow-Credentials", true); // If needed
        numberOfResponses -= -1; //xd
        console.log(numberOfResponses);
        res.send(p); //responds with the link to the original .mp4 video
        console.log(p);
      })
      .catch(async () => {
        if (alt) {
          await page.goto(alt, { waitUntil: "domcontentloaded" });
          console.log(alt);
          page.on("response", async (resp) => {
            uri = resp.url();
            if (uri && uri.includes("video.mp4") && uri.includes("mp4upload")) {
              ure = resp.url();
              console.log(resp.url());
              res.send(ure);
              await browser.close();
            }
          });
        } else {
          console.log("sadd");
          res.send("sadd");
          await browser.close();
        }
      });
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*"); // i dont know what this is
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    ); // If needed
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    ); // If needed
    res.setHeader("Access-Control-Allow-Credentials", true); // If needed
    res.send(HD(bodyHTML));
  }
}
