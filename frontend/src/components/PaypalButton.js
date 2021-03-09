import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function PaypalButton(props) {
    const [sdkReady, setSdkReady] = useState(false);

    const addPaypalSdk = async () => {
        const result = await axios.get("api/config/paypal");
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
        script.async = true;
        script.onload = () =>{
            setSdkReady(true);
        }
    document.body.appendChild(script);
    }
    const createOrder = (data, actions) => actions.order.create({
        purchase_units : [
            {
                amount: {
                    currency_code: 'USD',
                    value: props.value
                }
            }
        ]
    })
}