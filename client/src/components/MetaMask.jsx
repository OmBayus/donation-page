import React, { useEffect, useState } from "react"
import Web3 from "web3"

const MetaMask = ()=>{
    const [amount,setAmount] = useState(0.01)
    const [web3,setWeb3] = useState(null)
    const [address,setAdress] = useState(null)

    useEffect(()=>{
        var instance
        if(window.ethereum){
            try{
                instance = new Web3(window.ethereum)
            }
            catch(error){
                console.log(error)
            }
        }
        else if(window.web3){
            instance = new Web3(window.web3)
        }
        else{
            const provider = new Web3.provider.HttpProvider("http://127.0.0.1:7545")
            instance = new Web3(provider)
        }

        setWeb3(instance)
    },[])

    const connect = async()=>{
        if(window.ethereum){
            await window.ethereum.enable()
            web3.eth.getAccounts().then(accounts=>{
                setAdress(accounts[0])
            })
        }
    }

    const sendBNB = async()=>{
        const toAddress = "0xc3039A01507a7aAA375800f726F0c279aa106CaC"
        await web3.eth.sendTransaction({
            from: address,
            to:toAddress,
            value: web3.utils.toWei(String(amount),'ether')
        }).then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return(
        <div className="d-flex justify-content-center text-center">
            <div>
                {address && <input type="number" step="0.01" className="my-3" onChange={e=>{
                    if(e.target.value > 0){
                        setAmount(e.target.value)}
                    }
                    
                    } value={amount} />}
                <br/>
                {!address &&<button onClick={connect}>Connect Your MetaMask Wallet</button>}
                {address && <button onClick={sendBNB}>Send BNB</button>}
            </div>
        </div>
    )
}

export default MetaMask