const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const inputJson = `${basePath}/build/json/`;
const inputImgs = `${basePath}/build/images/`;
const outputJson = `${basePath}/build/json_reordered/`;
const outputImgs = `${basePath}/build/images_reordered/`;

_metadataFile = [];
_legendaryIds = [];
for (let i = 0; i < 10; i++) {
    let id = Math.floor(Math.random() * 2222)
    _legendaryIds.push(id);
}
console.log(_legendaryIds.sort((a,b) => a-b));

orderedImgs = fs.readdirSync(inputImgs).sort((a, b) => {
    return parseInt(a.match('[0-9]+')) - parseInt(b.match('[0-9]+'))
});

let edition = 0;
orderedImgs.forEach(img => {
    //if legendary leave a space
    if(_legendaryIds.findIndex(x => parseInt(x.toString().match('[0-9]+')) == edition) > -1) 
        edition++
    //Copy image
    fs.copyFileSync(inputImgs + img, `${outputImgs}${edition}.png`);
    
    //Retrieve metadata
    let metadata = JSON.parse(fs.readFileSync(inputJson + img.match('[0-9]+') + '.json'));
    metadata.edition = edition;
    metadata.name = "Phases #" + edition;
    metadata.image = 'ipfs://placeholder/' + edition + '.png';
    //save and push to metadata file array
    fs.writeFileSync(`${outputJson}${edition}.json`, JSON.stringify(metadata, null, 2));
    _metadataFile.push(metadata);
    edition++
})

//write metadata file
fs.writeFileSync(`${outputJson}_metadata.json`, JSON.stringify(_metadataFile, null, 2));



