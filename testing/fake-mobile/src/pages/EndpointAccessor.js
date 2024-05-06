import { Button } from "@chakra-ui/react";
import axios from 'axios'


export default function EndpointAccessor() {

    const sendOrder = async() => {
        try {
            const response = await axios.get('http://localhost:5000/order/placeOrder')
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <Button onClick = {sendOrder}>Send Order</Button>
        </>
    )
}