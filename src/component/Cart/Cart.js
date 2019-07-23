import React, { Component } from "react";
import Title from "../Title";
import EmptyCart from "./EmptyCart";
import CartColumns from "./CartColumns";
import { ProductConsumer } from "../../context";
import cartList from "./cartList";

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="you" title="cart" />
                                    <CartColumns />
                                    <cartList value={value} />
                                </React.Fragment>
                            );
                        }
                        return <EmptyCart />;
                    }}
                </ProductConsumer>
            </section>
        );
    }
}
