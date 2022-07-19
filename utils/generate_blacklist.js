const fs = require("fs");
let string = "[";


fs.readFile("./src/Blacklist.csv",  "utf-8", (err, data) => {
    let counter = 0;
    data.split(/\r?\n/).forEach(line => {
        let [Layer1, Trait1, Layer2, Trait2] = line.split(',');
        string += `{"layer1": "${Layer1}", "trait1": "${Trait1}", "layer2": "${Layer2}", "trait2": "${Trait2 }"},`;
        counter++;
    });
    string = string.substring(0, string.length - 1);

    console.log(counter);
    string += "]";
    fs.writeFileSync("./src/Blacklist.json", string);

})
