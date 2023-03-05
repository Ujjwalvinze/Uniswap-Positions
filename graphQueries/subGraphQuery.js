const { ethers } = require("hardhat");
const { CeloProvider } = require("@celo-tools/celo-ethers-wrapper");
const axios = require("axios");
require("dotenv").config();

const GRAPH_UNISWAP_API = process.env.GRAPH_UNISWAP_API;
const INFURA_RPC_URL = process.env.INFURA_RPC_URL;
const CELO_RPC_URL = process.env.CELO_RPC_URL;

const PROVIDER = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);
const CELO_PROVIDER = new CeloProvider(CELO_RPC_URL);

const {
    abi: positionsABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json");

const POSITIONS_QUERY = `
{
    positions(where: {owner: "0x11e4857bb9993a50c685a79afad4e6f65d518dda"}) {
      id
      owner
    }
}
`;
// 0x11e4857bb9993a50c685a79afad4e6f65d518dda
async function main() {
    const POSITION_ITEMS = await axios.post(GRAPH_UNISWAP_API, { query: POSITIONS_QUERY });
    // console.log(POSITION_ITEMS.data.data.positions);

    const allPositions = POSITION_ITEMS.data.data.positions;

    const INonfungiblePositionManagerAllChains = await ethers.getContractAt(
        positionsABI,
        "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
        PROVIDER
    );
    const INonfungiblePositionManagerCelo = await ethers.getContractAt(
        positionsABI,
        "0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A",
        CELO_PROVIDER
    );

    console.log("For All other chains - ");
    allPositions.map(async (item) => {
        const tokenId = item.id;
        // console.log(tokenId);
        const position = await INonfungiblePositionManagerAllChains.positions(tokenId);
        const { liquidity, tickLower, tickUpper, token0, token1, tokensOwed0, tokensOwed1 } =
            position;
        console.log(`tokenId = ${tokenId.toString()}`);
        // console.log(`tickLower = ${tickLower.toString()}`);
        // console.log(`tickUpper = ${tickUpper.toString()}`);
        console.log(`token0 = ${token0.toString()}`);
        console.log(`token1 = ${token1.toString()}`);
        console.log(`tokensOwed0 = ${tokensOwed0.toString()}`);
        console.log(`tokensOwed1 = ${tokensOwed1.toString()}`);
        console.log("-----------------------------------------");
    });

    // console.log("---------------------------------------------");

    // console.log("For Celo chain - ");

    // allPositions.map(async (item) => {
    //     const tokenId = item.id;
    //     console.log(tokenId);
    //     const position = await INonfungiblePositionManagerCelo.positions(tokenId);
    //     // const { liquidity, tickLower, tickUpper, token0, token1 } = position;
    //     // console.log(`tokenId = ${tokenId.toString()}`);
    //     // // console.log(`tickLower = ${tickLower.toString()}`);
    //     // // console.log(`tickUpper = ${tickUpper.toString()}`);
    //     // console.log(`token0 = ${token0.toString()}`);
    //     // console.log(`token1 = ${token1.toString()}`);
    // });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
