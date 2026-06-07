import * as fs from 'fs';
const html = fs.readFileSync('scrape.html', 'utf8');
const rootMatch = html.match(/<div [^>]*id="root"[^>]*>([\s\S]*?)<\/div>/i);
if (rootMatch) {
  console.log("Root div content length:", rootMatch[1].length);
} else {
  console.log("No root div found.");
}
console.log("Total HTML length:", html.length);
