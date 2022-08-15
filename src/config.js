const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
const path = require("path");
const fs = require("fs");
const { Module } = require("module");
const buildDir = path.join(basePath, "/build");
const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Phases";
const description = "Phase into Phases, a world where you can be and feel, just like yourself.";
const baseUri = "ipfs://placeholder";

// const solanaMetadata = {
//   symbol: "YC",
//   seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
//   external_url: "https://www.youtube.com/c/hashlipsnft",
//   creators: [
//     {
//       address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
//       share: 100,
//     },
//   ],
// };

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    //legendaries
    // growEditionSizeTo: 10,
    // layersOrder: [{ name: "Legendary" }],
    //edition 1
    growEditionSizeTo: 500,
    layersOrder: [
      { name: "Background 1", options: { displayName: "Background" } },
      { name: "Skin 1", options: { displayName: "Skin" } },
      { name: "Umbrella 1", options: { displayName: "Umbrella" } },
      { name: "Face Art 1", options: { displayName: "Face Art" } },
      { name: "Eyes 1", options: { displayName: "Eyes" } },
      { name: "Earrings 1", options: { displayName: "Earrings" } },
      { name: "Glasses 1", options: { displayName: "Glasses", blend: MODE.hardLight } },
      { name: "Hair 1", options: { displayName: "Hair" } },
      { name: "Headwear 1", options: { displayName: "Headwear" } },
      { name: "Side Masks 1", options: { displayName: "Side Masks" } },
      { name: "Magic 1", options: { displayName: "Magic" } },
      { name: "Weapons 1", options: { displayName: "Weapons" } }
    ]
  },
  // {
  //   growEditionSizeTo: 50,
  //   layersOrder: [
  //     { name: "Background 2" },
  //     { name: "Skin 2", options: { displayName: "Skin" } },
  //     { name: "Face Art 2", options: { displayName: "Face Art" } },
  //     { name: "Eyes 2", options: { displayName: "Eyes" } },
  //     { name: "Mouth 2", options: { displayName: "Mouth" } },
  //     { name: "Clothing 2", options: { displayName: "Clothing" } }
  //   ]
  // }
  // {
  //   // boys
  //   growEditionSizeTo: 50,
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Boy_Face", options: { displayName: "Face" } },
  //     { name: "Boy_Eyes", options: { displayName: "Eyes" } },
  //     { name: "Face Accessory" },
  //     {
  //       name: "Face Accessory_Multiply", options: {
  //         displayName: "Face Accessory_Multiply", blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },

  //     { name: "Boy_Hair", options: { displayName: "Hair" } },
  //     {
  //       name: "Boy_Hair_Multiply", options: {
  //         displayName: "Hair_Multiply",
  //         blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },
  //     { name: "Boy_Clothes", options: { displayName: "Clothes" } },
  //     {
  //       name: "Boy_Clothes_Multiply",
  //       options: {
  //         displayName: "Clothes_Multiply",
  //         blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },
  //     { name: "Nose" },
  //     { name: "Nose_Multiply", options: { blend: MODE.multiply, bypassDNA: true } },
  //     { name: "Mouth" },
  //     { name: "Accessory" },
  //     { name: "Accessory_Multiply", options: { blend: MODE.multiply, bypassDNA: true } },
  //   ],
  // },
  // {
  //   //girls
  //   growEditionSizeTo: 100,
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Girl_Face", options: { displayName: "Face" } },
  //     { name: "Girl_Eyes", options: { displayName: "Eyes" } },
  //     { name: "Face Accessory" },
  //     {
  //       name: "Face Accessory_Multiply", options: {
  //         displayName: "Face Accessory_Multiply", blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },
  //     { name: "Girl_Hair", options: { displayName: "Hair" } },

  //     {
  //       name: "Girl_Hair_Multiply", options: {
  //         displayName: "Hair_Multiply",
  //         blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },
  //     { name: "Girl_Clothes", options: { displayName: "Clothes" } },
  //     {
  //       name: "Girl_Clothes_Multiply",
  //       options: {
  //         displayName: "Clothes_Multiply",
  //         blend: MODE.multiply,
  //         bypassDNA: true
  //       }
  //     },
  //     {
  //       name: "Girl_Hair_Up", options: {
  //         displayName: "Hair_Up",
  //         bypassDNA: true
  //       }
  //     },
  //     { name: "Nose" },
  //     { name: "Nose_Multiply", options: { blend: MODE.multiply, bypassDNA: true } },
  //     { name: "Mouth" },
  //     { name: "Accessory" },
  // { name: "Accessory_Multiply", options: { blend: MODE.multiply, bypassDNA: true } },
  //   ],
  // },
];

//Trait combinations to blacklist, layer1 should be first layer
const blacklistCombinations = JSON.parse(fs.readFileSync("src\\Blacklist.json", "utf-8"));
// const blacklistCombinations = [];



//Layers that must match
// let dependantLayers = [
//   { dependancy: "Accessory", dependants: ["Accessory_Multiply"], value: "" },
//   { dependancy: "Face Accessory", dependants: ["Face Accessory_Multiply"], value: "" },
//   { dependancy: "Nose", dependants: ["Nose_Multiply"], value: "" },
//   { dependancy: "Hair", dependants: ["Hair_Multiply", "Hair_Up"], value: "" },
//   { dependancy: "Clothes", dependants: ["Clothes_Multiply"], value: "" },
// ];
let dependantLayers = [];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 780,
  height: 780,
  smoothing: true,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  buildDir,
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  blacklistCombinations,
  dependantLayers,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  // solanaMetadata,
  gif,
  preview_gif,
};
