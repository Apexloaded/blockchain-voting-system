import '../styles/globals.css';
import {MoralisProvider} from "react-moralis";

const SERVER_URL = process.env.MORALIS_URL;
const APP_ID = process.env.MORALIS_ID;

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
