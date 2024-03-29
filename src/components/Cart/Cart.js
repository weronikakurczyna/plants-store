import CustomModal from "../UI/CustomModal";
import classes from './Cart.module.css';
import DefaultButton from "../UI/DefaultButton";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import UserDataForm from "./UserDataForm";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [error, setError] = useState(null);
    const cartContext = useContext(CartContext);

    const removeHandler = (id) => {
        cartContext.removeProduct(id);
    };

    const addHandler = (product) => {
        const cartProduct = {...product, amount: 1};
        cartContext.addProduct(cartProduct);
    };

    const cartHasProducts = cartContext.products.length > 0;

    const orderHandler = () => {
        setIsCheckout(true);
    }

    let cartItems = (
        <ul className={classes['products-list']}>
            {cartContext.products.map((product) => (
                <CartItem
                    product={product}
                    key={product.id}
                    onAdd={addHandler.bind(null, product)}
                    onRemove={removeHandler.bind(null, product.id)}
                />
            ))}
        </ul>
    )

    const sendOrderHandler = (data) => {
        setOrderSuccess(false);
        setError(null);
        fetch('https://plants-store-4a162-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userData: data,
                products: cartContext.products
        })
        }).then(response => {
            if(response.ok) {
                setOrderSuccess(true);
                setIsCheckout(false);
                cartContext.products = [];
            }
        }).catch(err => {
            setError(err.message);
        })
    }

    const closeCheckoutHandler = () => {
        setIsCheckout(false);
    }

    return (
        <CustomModal onClose={props.onClose} className={classes.cart}>
            {cartItems}
            {cartHasProducts
                ? (
                    <div className={classes.summary}>
                        <p>Total amount: {cartContext.total}€</p>
                    </div>)
                : <p>No products in cart.</p>
            }
            {isCheckout && <UserDataForm onConfirm={sendOrderHandler} onCancel={closeCheckoutHandler}/>}
            <div className={classes.actions}>
                {!isCheckout &&
                    <DefaultButton onClick={props.onClose} cancellation>Close</DefaultButton>
                }
                {cartHasProducts && !isCheckout &&
                    <DefaultButton confirmation onClick={orderHandler}>Order</DefaultButton>
                }
                {error && <p className={classes.error}>{error}</p>}
                {orderSuccess && <p className={classes.success}>Order has been sent successfully!</p>}
            </div>
        </CustomModal>
    )
}

export default Cart;