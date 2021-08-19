import React from "react"
import {Switch,Route} from "react-router-dom";

//components
import Main from "./components/Main";
import SelectPayment from "./components/SelectPayment";
import GPay from "./components/GPay";
import MetaMask from "./components/MetaMask";

const App = ()=>{
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
            </Switch>
        </Main>
    )
}


export default App