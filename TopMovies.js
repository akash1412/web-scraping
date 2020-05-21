const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.imdb.com/chart/top/";
  await page.goto(url, { timeout: 0 });
  await page.setDefaultNavigationTimeout(0);

  const moviesList = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("tbody.lister-list > tr > td.titleColumn")
    ).map((el) => el.innerText)
  );

  fs.writeFileSync("top-movies.json", JSON.stringify(moviesList), () => {
    console.log("file written succesfully");
  });

  await browser.close();
})();

// (async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("https://www.edureka.co/all-courses", { timeout: 0 });

//     const NodeList = await page.evaluate(() =>
//       Array.from(
//         document.querySelectorAll(
//           "a.coursecardblock > div.card > div.courseinfo h3"
//         )
//       ).map((el) => el.innerText)
//     );

//     // console.log(NodeList);

//     const rating = await page.evaluate(() => {
//       return Array.from(
//         document.querySelectorAll(
//           "a.coursecardblock > div.card > div.courseinfo > div.numinforight span.rating"
//         )
//       ).map((rating) => rating.innerText);
//     });

//     const courses = [];

//     for (let i = 0; i < NodeList.length; i++) {
//       courses.push({
//         courseTitle: NodeList[i],
//         rating: rating[i],
//       });
//     }

//     fs.writeFileSync("courses.json", JSON.stringify(courses), () => {
//       console.log("file written succesfully");
//     });

//     await browser.close();
//   } catch (error) {
//     console.log(error);
//   }
// })();
