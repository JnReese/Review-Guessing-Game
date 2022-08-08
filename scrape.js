const puppeteer = require("puppeteer");
const fs = require("fs");

const urls = {
  runescape: "https://steamcommunity.com/app/1343370/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  ark: "https://steamcommunity.com/app/346110/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  borderlands: "https://steamcommunity.com/app/397540/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  dungeonDefenders: "https://steamcommunity.com/app/65800/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  GTA: "https://steamcommunity.com/app/271590/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  monsterTrain: "https://steamcommunity.com/app/1102190/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  riskOfRain: "https://steamcommunity.com/app/632360/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  skyrim: "https://steamcommunity.com/app/489830/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  terraria: "https://steamcommunity.com/app/105600/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
  theBindingOfIsaac: "https://steamcommunity.com/app/250900/reviews/?browsefilter=funny&snr=1_5_100010_&p=1",
};

const removeFromString = (blacklistedWord, reviewStrings) => {
  return reviewStrings.map((str) => str.toLowerCase().replaceAll(blacklistedWord, "_________").trim());
};

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false }); //browser initiate
  const page = await browser.newPage(); // opening a new blank page
  for (key in urls) {
    console.log(key);
    await page.goto(urls[key], {
      waitUntil: "domcontentloaded",
    });
    const spanTexts = await page.$$eval(".apphub_CardTextContent", (elements) => elements.map((el) => el.innerText));

    await fs.writeFile(`${key}.json`, JSON.stringify(removeFromString(key, spanTexts), null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved Successfully!");
      }
    });
  }
};
scrape();
