import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cart from "./component/Cart";
import Navbar from "./component/Navbar";
import Default from "./component/Default";
import Details from "./component/Details";
import ProductList from "./component/ProductList";
import Modal from "./component/Modal";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route component={Default} />
            </Switch>
            <Modal />
        </React.Fragment>
    );
}

export default App;
