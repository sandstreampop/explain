import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { readLines } from "https://deno.land/std@0.165.0/io/mod.ts";

interface WikiFetchResult {
  extract?: string;
}

const _permission = await Deno.permissions.request({ name: "net" });

async function explain(term: string) {
  const url = encodeURI(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${term}?redirect=true`,
  );
  const fetchResult = await fetch(url);
  const json: WikiFetchResult = await fetchResult.json();

  const { extract } = json;

  if (extract === undefined) {
    console.log(`Could not fetch wiki for your input: ${term}`);
    Deno.exit();
  }

  if (!extract.includes("may refer to")) {
    console.log(extract);
    Deno.exit();
  }

  handleDisambiguation(term);
}

async function handleDisambiguation(term: string) {
  const htmlUrl = encodeURI(
    `https://en.wikipedia.org/api/rest_v1/page/html/${term}?redirect=true&stash=false`,
  );
  const htmlResult = await fetch(htmlUrl);
  const htmlString = await htmlResult.text();

  const parsedHtml = new DOMParser().parseFromString(htmlString, "text/html");
  const disambiguationList = parsedHtml
    ?.getElementsByTagName("a")
    .filter((el) => el.getAttribute("rel") === "mw:WikiLink")
    .map((el) => el.textContent);

  console.table(disambiguationList);
  console.log(
    "There is more than one match. Please input the index of the term you meant:",
  );

  const data = await readLines(Deno.stdin).next();

  console.log(disambiguationList![data.value]);
  explain(disambiguationList![data.value]);
}

const termFromArgs = Deno.args.join(" ");
explain(termFromArgs);
