const _permission = await Deno.permissions.request({ name: "net" });

const term = Deno.args.join(" ");

const fetchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${term}?redirect=true`;

const result = await fetch(fetchUrl);

const json = await result.json();

if (json.extract) {
  console.log(json.extract);
} else {
  console.log(`Could not fetch wiki for your input: ${term}`);
}
