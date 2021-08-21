import React, { useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import {Button} from "react-bootstrap"

const CreditCard = ()=>{
    const [amount,setAmount] = useState(5)
    const[isPaid,setIsPaid] = useState(false)

    const history = useHistory()

    const location = useLocation();

    useEffect(()=>{
        var bill = location.search
        bill = bill.replace('?bill=', '')
        axios.post("http://localhost:4000/checkout",{bill:bill}).then(res=>{
            console.log(res.data)
            if(res.data.success){
                setIsPaid(true)
            }

        })
    },[location])

    const payWithIyzico = async()=>{
        axios.post("http://localhost:4000/pay",{amount:amount}).then(res=>{
            console.log(res.data)
            window.location.href = res.data.paymentPageUrl
        })
    }


    return(
        <>
            <div className="back" onClick={()=>history.push("/")}><span>{'<'}</span></div>
            <div className="d-flex justify-content-center text-center">
                {!isPaid && <div>
                    <input type="number" step="1" className="my-3" onChange={e=>{
                        if(e.target.value > 2){
                            setAmount(e.target.value)}
                        }
                        
                        } value={amount} />
                    <br/>
                    <Button onClick={payWithIyzico}>Pay with Iyzico</Button>
                </div>}
                {isPaid && <div>
                        <h1 className="text-light">Ödeme Başarılı</h1>
                    </div>}
            </div>
        </>
    )
}

export default CreditCard