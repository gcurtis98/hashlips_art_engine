const path = require("path");
const basePath = process.cwd();
const fs = require("fs");

const { buildDir, description, namePrefix} = require(path.join(basePath, "/src/config.js"));

let template = {
    name: namePrefix + " #",
    description: description,
    image: "ipfs://bafybeicgcgbupylqnemvloixjnyyxlues2yhbnr7goonp6tuhh6oybfbvq/pre-reveal.gif",
    edition: 0,
    date: 1657951593226,
    attributes: [
        {
            trait_type: "Revealed",
            value: "No"
        }
    ]
};

let supply = 2200;
let startingIndex = 0;

for(i = startingIndex; i < supply + startingIndex; i++ ) {
    let metadata = {...template};
    metadata.name += i;
    metadata.edition = i;
    
    fs.writeFileSync(path.join(buildDir, `/prereveal/${i}.json`), JSON.stringify(metadata, null, 2))
}
