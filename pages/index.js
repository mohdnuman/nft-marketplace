import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import React, { Component } from 'react';

import {
  nftaddress, nftmarketaddress
} from '../config';


import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Marketplace.sol/Marketplace.json'

class index extends Component {
  constructor(props){
    super(props);
    this.state={
      nfts:[],
      loadingState:'',
    }
  }
  static async getInitialProps(){
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }));

    this.setState({
      nfts:items,
      loadingState:'loaded'
    });
  }

 
  
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default index;
