const path = require("path");
const basePath = process.cwd();
const fs = require("fs");

const { buildDir, description, namePrefix} = require(path.join(basePath, "/src/config.js"));

let template = {
    // name: namePrefix + " #",
    // description: description,
    name: "Gold Pass #",
    description: description,
    image: "ipfs://bafybeihrjqggg7j4j22od3doa3nbn66abzivjaipnxq6h6a74rcfoib4wu/pass.gif",
    edition: 0,
    date: Date.now(),

};

let supply = 750;
let startingIndex = 0;

for(i = startingIndex; i < supply + startingIndex; i++ ) {
    let metadata = {...template};
    metadata.name += i;
    metadata.edition = i;
    
    fs.writeFileSync(path.join(buildDir, `/prereveal/${i}.json`), JSON.stringify(metadata, null, 2))
}