import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import Coin from '../components/Coin';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CoinModal from '../components/CoinModal';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

export default function Home() {
  const [btc, setBtc] = useState(0);
  const [nftly, setNftly] = useState(0);
  const [eth, setEth] = useState(0);
  const [visible, setVisible] = useState(false)
  const [modalToken, setModalToken] = useState();
  const [description, setDesc] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const web3Api = useMoralisWeb3Api();
  const {isInitialized, Moralis, isAuthenticated, authenticate, logout} = useMoralis();

  useEffect(() => {
    async function fetchTokenPrice() {
      const options = {
        address: description.address
      };
      const price = await web3Api.token.getTokenPrice(options);
      setTokenPrice(price.usdPrice.toFixed(2));
    }

    if(modalToken) fetchTokenPrice();
  }, [modalToken]);

  async function getRatio(token, setPerc) {
    const Votes = Moralis.Object.extend('votes');
    const query = new Moralis.Query(Votes);
    query.equalTo('ticker', token);
    query.descending("createdAt");
    const res = await query.first();
    if(!res) return;
    let up = Number(res.attributes.up);
    let down = Number(res.attributes.down);
    let ratio = Math.round(up/(up+down)*100);
    setPerc(ratio);
  }

  useEffect(() => {
    if(isInitialized) {
      getRatio("BTC", setBtc);
      getRatio("NFTLY", setNftly);
      getRatio("ETH", setEth);

      async function listenTicker() {
        let query = new Moralis.Query("votes");
        let sub = await query.subscribe();
        sub.on('update', (obj) => {
          switch(obj.attributes.ticker) {
            case "BTC":
              getRatio("BTC", setBtc);
              break;
            case "NFTLY":
              getRatio("NFTLY", setNftly);
              break;
            case "ETH":
              getRatio("ETH", setEth);
              break;
          }
        });
      }

      listenTicker();
    }
  },[isInitialized])
  

  return (
    <div className="h-full py-4 lg:h-screen lg:overflow-scroll bg-black flex flex-col justify-between">
      <Head>
        <title>Vote Ticker | Vote your favorite NFT Project</title>
        <meta name="description" content="Vote on your favorite NFT Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <div className='max-w-6xl mx-auto'>
          <Header isAuthenticated={isAuthenticated} authenticate={authenticate} logout={logout} />
          <Hero />
          <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
            <Coin 
              perc={btc}
              setPerc={setBtc}
              token="BTC"
              setModalToken={setModalToken}
              setisVisible={setVisible}
              setDesc={setDesc}
            />
            <Coin 
              perc={eth}
              setPerc={setEth}
              token="ETH"
              setModalToken={setModalToken}
              setisVisible={setVisible}
              setDesc={setDesc}
            />
            <Coin 
              perc={nftly}
              setPerc={setNftly}
              token="NFTLY"
              setModalToken={setModalToken}
              setisVisible={setVisible}
              setDesc={setDesc}
            />
          </div>
          <CoinModal isOpen={visible} setIsOpen={setVisible} modalToken={modalToken} description={description} price={tokenPrice} />
        </div>
      </main>

      <footer className="bg-white">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
}
