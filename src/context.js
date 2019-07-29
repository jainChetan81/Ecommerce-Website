import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

export default class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0, //cart will be 0 at first
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };
    getItem = id => {
        //it is going to be expecting an id to return products of the item id
        //also an utility function
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    handleDetail = id => {
        //passing this to product.js
        //calling this product whenever we click the image to go to details page
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = id => {
        //create a temp products
        let tempProducts = [...this.state.products]; //this array holds all my products in the carts
        const index = tempProducts.indexOf(this.getItem(id)), //grtting id of all the products
            product = tempProducts[index]; //temp products of the array
        product.inCart = true; //now we have actual product in the cart and change the count fo that product
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
                return {
                    products: tempProducts,
                    cart: [...this.state.cart, product]
                };
            },
            () => {
                //because the best time to loop all the cart items whenever item is being added to the cart
                this.addTotals();
            }
        );
    };
    //to increase and decrease no os item of same category in the cart
    increment = id => {
        console.log("this is incremet method");
    };
    decrement = id => {
        console.log("this is decrement method");
    };
    removeItem = id => {
        console.log("item removed");
    };
    clearCart = () => {
        this.setState(
            () => {
                return {
                    cart: []
                };
            },
            () => {
                //we modify car and states to set them back to default
                //but the value sin addcart are already modified
                this.setProducts();
                this.addTotals();
            }
        );
    };
    openModal = id => {
        //retrieve the product
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };
    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => {
            subtotal += item.total;
        });
        const tempTax = subtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subtotal,
                cartTax: tax,
                cartTotal: total
            };
        });
    };
    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
