import React from "react"
import { Container, Image } from "react-bootstrap"

const Main = (props)=>{
    return(
    <div className="main bg-dark">
        <Container>
            <div className="d-flex justify-content-center py-3">
                <Image src="/profil.png" className="profil" roundedCircle />
            </div>
            {props.children}
        </Container>
    </div>)
}

export default Main