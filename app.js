const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const movie = "https://www.imdb.com/title/tt1229340/";

(async () => {
  let imdbData = [];

  const response = await request({
    uri: movie,
    headers: {
      path: "/title/tt1229340/",
      scheme: "https",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": " gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8,ru;q=0.7",
      "cache-control": " max-age=0",
    },
    gzip: true,
  });

  let $ = cheerio.load(response);

  let title = $('div[class="title_wrapper"] > h1').text().trim();
  let rating = $('div[class="ratingValue"] > strong > span').text();
  let movieLength = $('div[class="subtext"] > time[datetime="PT119M"]')
    .text()
    .trim();

  imdbData.push({
    title,
    rating,
    movieLength,
  });

  imdbObject = { title, rating, movieLength };

  const j2cp = new json2csv();
  const csv = j2cp.parse(imdbData);

  fs.writeFileSync("./imdb.csv", csv, "utf-8");
})();
