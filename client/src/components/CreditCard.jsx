import React, { useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import {Button} from "react-bootstrap"

const CreditCard = ()=>{
    const [transaction,setTransaction] = useState({
        name:"",
        msg:"",
        amount:5
    })
    const[isPaid,setIsPaid] = useState(false)

    const history = useHistory()

    const location = useLocation();

    useEffect(()=>{
        var bill = location.search
        bill = bill.replace('?bill=', '')
        axios.post("http://localhost:4000/api/bill/checkout",{bill:bill}).then(res=>{
            console.log(res.data)
            if(res.data.success){
                setIsPaid(true)
            }

        })
    },[location])

    const payWithIyzico = async()=>{
        if(transaction.amount < 0){
            alert("Amount must be greater than 0")
            return
        }
        axios.post("http://localhost:4000/api/bill/pay",transaction).then(res=>{
            console.log(res.data)
            window.location.href = res.data.paymentPageUrl
        })
    }

    const handleChange=e=>{
        const {name,value} = e.target
        setTransaction(prevValue=>{
            if(name === "name"){
                return{...prevValue,name:value}
            }
            else if(name === "msg"){
                return{...prevValue,msg:value}
            }
            else if(name === "amount"){
                return{...prevValue,amount:value}
            }
        })
    }


    return(
        <>
            <div className="back" onClick={()=>history.push("/")}><span>{'<'}</span></div>
            <div className="d-flex justify-content-center text-center">
                {!isPaid && <div>
                    <input type="text" placeholder="Name" className="my-2" name="name" onChange={handleChange} value={transaction.name} />
                    <br/>
                    <input type="text" placeholder="Message" className="my-2" name="msg" onChange={handleChange} value={transaction.msg}/>
                    <br/>
                    <input type="number" step="1" className="my-2" name="amount" onChange={handleChange} value={transaction.amount} />
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