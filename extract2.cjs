import * as fs from 'fs';
import { parse } from 'node-html-parser';

const html = fs.readFileSync('scrape.html', 'utf8');
const root = parse(html);

const texts = root.querySelectorAll('p, h1, h2, h3, h4').map(x => x.text.trim()).filter(x => x.length > 0);
console.log(texts.join('\n'));
