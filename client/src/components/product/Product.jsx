import { useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import img from "../../assets/Logo.png"

import "./Product.css"


const Product = ()=>{
    const [preferencesId, setPreferencesId] = useState(null);
    
    initMercadoPago('TEST-ed2cdf2e-5161-41c5-a67a-30892f92fcae');

    const createPreferences = async ()=>{
        try {
            const response = await axios.post("http://localhost:8080/create_preference",{
                description:"Mercado Campesino",
                price: 100,
                quantity: 1,
                currency_id: "COP"
            });
        
        const { id } = response.data;
        return id;

        }catch(error){
            console.log(error);
        }
    };
    const handleBuy = async () => {
        const id = await createPreferences();
        if(id){
            setPreferencesId(id);
        }
    }


    return(
        <div className="card-product-container">
            <div className="card-product">
                <div className="card-">
                <img src={img} alt="Product Image" />
                <h3>Bananita contanta</h3>
                <p className="price">$100</p>
                <button onClick={handleBuy}>Buy</button>
                {preferencesId && <Wallet initialization={{ preferenceId}} customization={{ texts:{ valueProp: 'smart_option'}}}/>}
                </div>
            </div>
        </div>
        
        
    )
}
export default Product