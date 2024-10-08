const { JSDOM } = require("jsdom");
const JSON5 = require("json5");
const fs = require("fs");

const champ_name = "Poppy"
const skill_name = "Hammer Shock"

  // const skillDataUrl = `https://leagueoflegends.fandom.com/wiki/Template:Data_${champ_name
  //     .trim()
  //     .replace(/ /g, '_')}/${skill_name.trim().replace(/ /g, '_')}?action=edit`;

  ; (async () => {
  const raw = await fetchWiki("https://leagueoflegends.fandom.com/wiki/Module:ChampionData/data");
  const x = moduleToJSON(raw);
  fs.promises.writeFile("championData.json", JSON.stringify(x || {}, null, 2))
})()

async function fetchWiki(url) {
  console.log('Fetching (wiki):', url);
  const response = await fetch(url);
  if (response.redirected)
    console.info(`[WARN] Page redirected from ${url} to ${response.url}`);

  const dom = new JSDOM(await response.text());
  console.log(dom.window.document)
  const text = dom.window.document.querySelector('pre.mw-code.mw-script');
  if (text) return text.textContent || '';
  console.info(`[ERROR] Page had no content from ${response.url}`);
  return '';
}

function moduleToJSON(text) {
  // Converts Lua data to json data.
  const results = [];
  for (const line of text.split('\n')) {
    const tline = line.trim();
    if (tline === '' || tline.startsWith('--')) continue;
    if (tline.startsWith('return')) {
      results.push('{');
      continue;
    }
    results.push(
      tline
        //replaces [" and "] with "
        .replace(/\["|"]/g, `"`)
        //replaces = with :
        .replace(/=/g, `:`)
        //replaces [1] : with nothing if line has a { or is after a ', '
        .replace(/, \[\d] : /g, `, `)
        .replace(/{\[\d] : /g, `{`)
        //replaces { and } with [ and ] only if line has both
        .replace(/{(.*)}/g, `[$1]`)
        //replaces [12] : with "12" :
        .replace(/\[(\d+)] : /g, `"$1" : `)
        //replaces -- with //
        .replace(/--/g, '//'),
    );
  }
  // return parsed JSON as a javascript object.
  return JSON5.parse(results.join(""));
}