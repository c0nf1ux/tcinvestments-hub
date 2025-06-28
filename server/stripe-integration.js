// Stripe Integration for Live Payments
const stripe = Stripe('pk_test_51RYRe1EQ24k6eTlv76Naw4fhbxhgWvChjjuwf5pq3iCGEGXbzNbFMYQ8jUDQ6ue6fkb3ZCLRx3QhLenQbkdVt');

// Payment processing functions
const payments = {
    // Premium Subscription - .99/month
    async subscribePremium() {
        try {
            const response = await fetch('http://localhost:5000/api/payments/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    priceId: 'price_premium_999',
                    mode: 'subscription'
                })
            });
            const { sessionId } = await response.json();
            return stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Premium subscription error:', error);
        }
    },

    // Enterprise Subscription - .99/month  
    async subscribeEnterprise() {
        try {
            const response = await fetch('http://localhost:5000/api/payments/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: 'price_enterprise_1499', 
                    mode: 'subscription'
                })
            });
            const { sessionId } = await response.json();
            return stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Enterprise subscription error:', error);
        }
    },

    // File Processing - /file
    async processFile(file) {
        try {
            const response = await fetch('http://localhost:5000/api/payments/process-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: file.name,
                    fileSize: file.size,
                    amount: 5900 // .00 in cents
                })
            });
            const { sessionId } = await response.json();
            return stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('File processing error:', error);
        }
    }
};

console.log(' Stripe payments integration loaded - Revenue ready!');
