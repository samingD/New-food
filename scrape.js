const fs = require("fs");
fetch("https://nigeriacharcoal.com/")
  .then(r => r.text())
  .then(t => {
    fs.writeFileSync("scrape.html", t);
    console.log("Scraped to scrape.html");
  })
  .catch(console.error);
