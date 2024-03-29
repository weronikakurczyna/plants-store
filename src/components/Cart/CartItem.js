import DefaultButton from "../UI/DefaultButton";
import classes from './CartItem.module.css';

const CartItem = (props) => {
    return (
        <li className={classes['cart-item']}>
            <h2>{props.product.name}</h2>
            <img className={classes.img} src={props.product.img}/>
            <span>Price: {props.product.price}€</span>
            <span>Amount: {props.product.amount}</span>
            <div className={classes.actions}>
                <DefaultButton onClick={props.onRemove}>-</DefaultButton>
                <DefaultButton onClick={props.onAdd}>+</DefaultButton>
            </div>
        </li>
    )
}

export default CartItem;