require("@nomiclabs/hardhat-waffle");
const fs=require('fs');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const projectId="a54e26e2de3c42f19eb6b90ef02e05f9"
const privateKey=fs.readFileSync('.secret').toString();

module.exports = {
  networks:{
    hardhat:{
      chainId:1337
    },
    mumbai:{
      url:"https://polygon-mumbai.infura.io/v3/a54e26e2de3c42f19eb6b90ef02e05f9",
    },
    mainnet:{
      url:"https://polygon-mainnet.infura.io/v3/a54e26e2de3c42f19eb6b90ef02e05f9",
    }


  },
  solidity: "0.8.4",
};
