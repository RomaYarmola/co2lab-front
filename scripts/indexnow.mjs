/**
 * Надсилає всі URL із карт сайту в IndexNow (Bing, Yandex, Seznam, Naver).
 * Google протокол не підтримує — для нього лишається Search Console.
 *
 * Ключ лежить у /public/138df6de77dbfa4a8e05d4180ee8bd89.txt: IndexNow перевіряє, що ключ відкривається
 * на тому самому домені, тож змінювати файл і константу треба разом.
 *
 *   node scripts/indexnow.mjs                 # усі URL із sitemap.xml
 *   node scripts/indexnow.mjs /uk/catalog …   # лише перелічені шляхи
 */
const HOST = "www.co2lab.pro";
const KEY = "138df6de77dbfa4a8e05d4180ee8bd89";
const ORIGIN = `https://${HOST}`;

async function sitemapUrls() {
  const index = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const map of maps) {
    const xml = await (await fetch(map)).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return [...new Set(urls)];
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((path) => `${ORIGIN}${path}`) : await sitemapUrls();

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

console.log(`IndexNow: ${response.status} ${response.statusText} — надіслано ${urlList.length} URL`);
if (response.status >= 400) {
  console.log(await response.text());
  process.exit(1);
}
