import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { abouts } from "./About";

function Coin({perc, setPerc, token, setModalToken, setisVisible, setDesc}) {
    console.log(token);
    const [color, setColor] = useState();
    const {isAuthenticated} = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();

    useEffect(() => {
        if(perc < 50) {
            setColor("#c43d08");
        } else {
            setColor("green");
        }
    }, [perc]);

    const setDescription = () => {
        if(token) {
            const description = abouts[abouts.findIndex((x) => x.token === token)];
            setDesc(description);
        }
    }

    async function vote(upDown) {
        if(isAuthenticated) {
            saveVote(upDown);
        }else{
            alert('authenticate');
        }
    }

    async function saveVote(upDown){
        let options = {
            contractAddress: "0xc828ed3b23EcAB749B3DB2B7283139135719A5C3",
            functionName: "vote",
            abi: [{"inputs":[{"internalType":"string","name":"_ticker","type":"string"},{"internalType":"bool","name":"_vote","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
            params: {
                _ticker: token,
                _vote: upDown
            }
        }

        await contractProcessor.fetch({
            params: options,
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                alert(error.message);
            }
        })
    }
    
    return (
        <div className="text-center">
            <div className="text-white font-bold text-center text-xl mb-3">{token}</div>
            <div className="rounded-full relative mx-auto h-40 w-40 overflow-hidden" style={{boxShadow: `0 0 20px ${color}`}}>
                <div className="relative animate-spin-slow origin-top-left-1/2-1/2 right-[30%] rounded-t-[48%] rounded-b-[78%] rounded-l-[58%] w-[160%] h-[160%]"
                    style={{
                        marginTop: `${100 - perc}%`,
                        boxShadow: `0 0 20px ${color}`,
                        backgroundColor: `${color}`
                    }}
                ></div>
                <div className="text-white font-bold text-4xl absolute w-full top-14 opacity-40 text-center">{perc}%</div>
            </div>
            <div className="flex mt-5 space-x-5 justify-center">
                <button onClick={() => {vote(true)}} className="bg-green-400 font-bold px-4 py-2 rounded-xl hover:bg-green-600 text-white shadow shadow-white">Up</button>
                <button onClick={() => {vote(false)}} className="bg-red-200 font-bold rounded-xl shadow hover:bg-red-300 shadow-red-500 px-4 py-1">Down</button>
            </div>
            <div className="mt-8 cursor-pointer" onClick={() => { setModalToken(token), setisVisible(true), setDescription()}}>
                <p className="text-white font-bold text-center uppercase bg-gray-900 inline px-5 py-2 rounded-md">info</p>
            </div>
        </div>
    )
}

export default Coin