/* eslint-disable */
// import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
    const stripe = Stripe(
        'pk_test_51LhKX5EzAeShbKw4oK9pZbja6LornjXvGZTTgPej7mjK72yCwWoMGFh9bUV84QUw6CcwQSbjSVNdHLL5lA2Plmjj00hkEVPy45'
    );
    try {
        // Get checkout session from API
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
        );

        // Create checkout form + charge credit card
        await stripe.redirectToCheckout({ sessionId: session.data.session.id });
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
