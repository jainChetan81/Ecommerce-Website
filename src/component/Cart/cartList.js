import React, { Component } from "react";
import CartItem from "./CartItem";

export default function cartList({ value }) {
    const { cart } = value;
    console.log(value, cart);
    return (
        <div>
            hello from cart list
            <CartItem />
        </div>
    );
}
