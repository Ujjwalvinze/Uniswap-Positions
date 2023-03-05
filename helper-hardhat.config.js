const { ethers } = require("hardhat");

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "6851",
        callbackGasLimit: "500000",
        interval: "30",
        mintFee: "10000000000000000",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },

    31337: {
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.001"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000",
        interval: "30",
        mintFee: "10000000000000000",
    },
};

const DECIMALS = "18";
const INITIAL_PRICE = "200000000000000000000";
const developmentChains = ["hardhat", "localhost"];
const frontEndContractsFile =
    "../nextjs-nft-marketplace-moralis-fcc/constants/networkMapping.json";
const frontEndContractsFile2 =
    "../nextjs-nft-marketplace-thegraph/constants/networkMapping.json";
const frontEndAbiLocation = "../nextjs-nft-marketplace-moralis-fcc/constants/";
const frontEndAbiLocation2 = "../nextjs-nft-marketplace-thegraph/constants/";
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndContractsFile2,
    frontEndAbiLocation,
    frontEndAbiLocation2,
};
