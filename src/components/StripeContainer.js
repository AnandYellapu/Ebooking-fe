// StripeContainer.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51NwPsNSBOx4YfpRqgJvR4q1Y0YolhPdSuA0waOcvSr0GsbuXE2OfkaYEDTZBd57hWKaCVtYaj03zHEg438T2MWO1004SdSFHtY');

const StripeContainer = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeContainer;
