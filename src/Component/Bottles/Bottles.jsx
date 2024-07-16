import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoreCart } from "../../Utility/Local-Storage";

const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect( () => {
        fetch('bottle.json')
        .then(res => res.json())
        .then(data =>setBottles(data))
    }, [])
    
    useEffect( () => {
        console.log('called the useEffect', bottles.length);
        if(bottles.length > 0){
            const storedCart = getStoreCart();
            console.log(storedCart);
        }
    },[bottles])
   const handleAddToCart = bottle => {
       const newBottle = [...cart, bottle];
       setCart(newBottle);
       addToLS(bottle.id);
   } 

    return (
        <div>
            <h2>Bottles Hear : {bottles.length} </h2>
            <h3> Cart : {cart.length}</h3>
           <div className="Bottle-Container">
            {
                bottles.map(bottle => <Bottle handleAddToCart={handleAddToCart} key={bottle.id} bottle={bottle}></Bottle>)
            }
           </div>
        </div>
    );
};

export default Bottles;