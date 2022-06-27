import classes from './ProductItem.module.css';
import CustomCard from "../../UI/CustomCard";
import defaultPlant from "../../../assets/plant1.png"
import AddToCartForm from "./AddToCartForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const ProductItem = ({plant}) => {
    const cartContext = useContext(CartContext);

    const addToCartHandler = amount => {
        cartContext.addProduct({
            id: plant.id,
            name: plant.name,
            desc: plant.desc,
            amount: amount,
            price: plant.price
        })
    };

    return (
        <CustomCard>
            <li className={classes.item}>
                <header>
                    <h2>{plant.name}</h2>
                    <p className={classes.price}>{plant.price}€</p>
                </header>
                <p className={classes.desc}>{plant.desc}</p>
                <img className={classes.image} src={defaultPlant}/>
                <AddToCartForm id={plant.id} onAddToCart={addToCartHandler}/>
            </li>
        </CustomCard>
    )
}

export default ProductItem;