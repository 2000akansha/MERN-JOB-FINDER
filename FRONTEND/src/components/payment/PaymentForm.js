import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

function PaymentForm() {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch client token from server
    axios.get('/api/braintree/token')
      .then(response => {
        setClientToken(response.data);
      })
      .catch(error => {
        console.error('Error fetching client token:', error);
      });
  }, []);

  const handlePayment = () => {
    instance.requestPaymentMethod()
      .then(data => {
        // Send the nonce to your server
        axios.post('/api/braintree/checkout', {
          paymentMethodNonce: data.nonce,
          amount: amount
        })
        .then(response => {
          console.log('Payment successful:', response);
          alert('Payment successful!');
        })
        .catch(error => {
          console.error('Payment error:', error);
          alert('Payment failed!');
        });
      })
      .catch(error => {
        console.error('Request payment method error:', error);
      });
  };

  return (
    <div>
      {clientToken ? (
        <div>
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={instance => setInstance(instance)}
          />
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button onClick={handlePayment}>Pay</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PaymentForm;
