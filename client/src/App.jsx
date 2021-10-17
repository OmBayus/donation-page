import React, { useEffect } from "react"
import {Switch,Route} from "react-router-dom";
import ReactGA from 'react-ga';

//components
import Main from "./components/Main";
import SelectPayment from "./components/SelectPayment";
import GPay from "./components/GPay";
import MetaMask from "./components/MetaMask";
import CreditCard from "./components/Shopier";

const App = ()=>{

    useEffect(()=>{
        ReactGA.initialize('UA-000000-01');
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[])
    return(
        <Main>
            <Switch>
                <Route path="/" exact> 
                    <SelectPayment/>
                </Route>

                <Route path="/gpay">
                    <GPay/>
                </Route>

                <Route path="/metamask">
                    <MetaMask/>
                </Route>

                <Route path="/creditcard">
                    <CreditCard/>
                </Route>

            </Switch>
        </Main>
    )
}


export default App