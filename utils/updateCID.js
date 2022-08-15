const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const inputJson = `${basePath}/build/json_reordered/`;

let CID = "bafybeihgitsoew6iefqjnd64dlyyx7lagavlgttanthtuggdmrwthfdwou";

fs.readdirSync(inputJson).forEach(file => {
    if(file != "_metadata.json") {
        let metadata = JSON.parse(fs.readFileSync(inputJson + file));
        console.log(metadata.image);
        metadata.image = metadata.image.toString().replace("placeholder", CID);
        fs.writeFileSync(inputJson + file, JSON.stringify(metadata, null, 2));
    }
  
})