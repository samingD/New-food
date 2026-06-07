const fs = require("fs");
const html = fs.readFileSync("scrape.html", "utf-8");
fs.writeFileSync("output.txt", html.substring(0, 5000));
