import React, { useState } from "react";
import axios from 'axios';
import img from "../../assets/Logo.png"
import "./Product.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const Product = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    initMercadoPago('TEST-14335436-58e1-45e2-8c5e-1a4db40f1236', {
        locale: "es-CO"
    });
    
    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference", {
                title: "Mercado Campesino",
                quantity: 1,
                price: 1000,
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log("Error al crear la preferencia:", error);
            return null;
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    return (
        <div className="card-product-container">
            <div className="card-product">
                <div className="card-">
                    <img src={img} alt="Product Image" />
                    <h3>Mercado Campesino</h3>
                    <p className="price">1000 $</p>
                    <button onClick={handleBuy}>Comprar</button>
                    {preferenceId && <Wallet key={preferenceId} initialization={{ preferenceId: preferenceId }}/>}
                </div>
            </div>
        </div>
    );
};

export default Product;
