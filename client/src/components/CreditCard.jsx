import React, { useState } from "react"
import {useHistory} from "react-router-dom"


const CreditCard = ()=>{
    const [amount,setAmount] = useState(1)

    const history = useHistory()

    const payWithIyzico = async()=>{
        
    }


    return(
        <>
            <div className="back" onClick={()=>history.push("/")}><span>{'<'}</span></div>
            <div className="d-flex justify-content-center text-center">
                <div>
                    <input type="number" step="1" className="my-3" onChange={e=>{
                        if(e.target.value > 1){
                            setAmount(e.target.value)}
                        }
                        
                        } value={amount} />
                    <br/>
                    <button onClick={payWithIyzico}>Pay with Iyzico</button>
                </div>
            </div>
        </>
    )
}

export default CreditCard