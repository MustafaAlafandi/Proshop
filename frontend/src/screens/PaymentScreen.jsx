import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { savePaymentMethod } from "../slices/cartSlice";
function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress } = useSelector(state => state.cart);
    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="Paypal or Credit Card"
                            id="PayPal"
                            name='paymentMethod'
                            value="PayPal"
                            checked
                            onChange={(e) => {
                                console.log("change");
                                setPaymentMethod(e.target.value);
                            }}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
