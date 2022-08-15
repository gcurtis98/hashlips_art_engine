const fs = require("fs");

arr = [];
fs.readFileSync("./src/wl.csv", 'utf-8').split(/\r?\n/).forEach(line => {
    let wallet = line.trim();
    if(arr.findIndex(x => x == wallet) == -1)
        arr.push(wallet);
});
console.log('Whitelisted wallets: ', arr.length);
fs.writeFileSync("./src/wl.json", JSON.stringify(arr, null, 2));
