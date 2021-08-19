import React from "react"
import {useHistory} from "react-router-dom"
import { Image } from "react-bootstrap"

const SelectPayment = ()=>{
    const history = useHistory()
    return(
        <div className="d-flex justify-content-center">
            <div className="selectPayment" onClick={()=>history.push("/gpay")}>
                <div>
                    <Image src="/GPay.png" className="icon"/>
                </div>
            </div>
            <div className="selectPayment" onClick={()=>history.push("/metamask")}>
                <div>
                    <Image src="/metamask.webp" className="icon"/>
                </div>
            </div>
        </div>
    )
}

export default SelectPayment