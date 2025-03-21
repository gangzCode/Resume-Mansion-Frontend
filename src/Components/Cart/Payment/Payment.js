import { useEffect, useState } from "react";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { placeOrder, getCart } from "../../../Services/apiCalls";
import { useSnackbar } from "../../../Context/SnackbarContext";
import Loader from "../../Common/Loader";

//const stripePromise = loadStripe(String(process.env.REACT_APP_STRIPE_PUBLIC_KEY));

const stripePromise = loadStripe(
  "pk_test_51QycJvBOp5kjpMN7KQ9msUMvpURA7PkcvlfzTah60mxY1OmSQ05gLhbMow8lHADOHEm6c8uDBoChiLtDQQ7pnBIK00S5U2hgaP"
);

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId") || null
  );

  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setProcessing(true);
    setError(null);
    setPaymentStatus("processing");

    try {
      if (!stripe || !elements) {
        setError("Payment system is still loading. Please try again.");
        setProcessing(false);
        setPaymentStatus("error");
        return;
      }

      const cardElement = elements.getElement(CardElement);

      document.body.classList.add("payment-processing");

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        setPaymentStatus("error");
        document.body.classList.remove("payment-processing");
        return;
      }

      const orderData = {
        payment_method_id: paymentMethod.id,
        order_id: orderId,
      };

      const response = await placeOrder(orderData);

      if (response.http_status === 200) {
        const orderDetails = {
          order_id: orderId,
          total: total,
          currency_code: "$",
          package: localStorage.getItem("getTopic"),
          lines: JSON.parse(localStorage.getItem("cartItems") || "[]"),
          promoDiscount: localStorage.getItem("promoDiscount") || "0",
          appliedPromo: localStorage.getItem("appliedPromo") || null,
        };
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");
        localStorage.removeItem("orderId");
        localStorage.removeItem("getTopic");
        localStorage.removeItem("getCount");

        localStorage.setItem("paymentComplete", "true");
        setPaymentStatus("success");

        showSnackbar(
          "Payment successful! Your order has been placed.",
          "success"
        );

        navigate("/currentOrder", { replace: true });
      } else {
        setError(`Payment failed: ${response.message || "Unknown error"}`);
        setPaymentStatus("error");
      }
    } catch (error) {
      setError(`Payment failed: ${error.message || "Unknown error"}`);
      setPaymentStatus("error");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
      setProcessing(false);
      document.body.classList.remove("payment-processing");
    }
  };

  useEffect(() => {
    const paymentComplete = localStorage.getItem("paymentComplete");
    if (paymentComplete === "true") {
      navigate("/currentOrder", { replace: true });
    }

    return () => {
      if (window.location.pathname === "/currentOrder") {
        localStorage.removeItem("paymentComplete");
      }
    };
  }, [navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h3 className="section-title">Payment Details</h3>
          <div className="card-element-container">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    iconColor: "#237655",
                  },
                  invalid: {
                    color: "#9e2146",
                    iconColor: "#9e2146",
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" className="error-icon">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            {error}
          </div>
        )}

        {paymentStatus === "error" && (
          <div className="payment-error-message">
            <p>
              Your payment couldn't be processed. Please try again or use a
              different payment method.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className={`submit-button ${processing ? "processing" : ""}`}
        >
          {processing ? (
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          ) : (
            `Pay $${total}`
          )}
        </button>
      </form>
    </>
  );
};

function Payment() {
  const [total, setTotal] = useState(0);
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(0);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packagePrice, setpackagePrice] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await getCart();

        if (response && response.http_status === 200) {
          const orderData = response.data;

          setpackagePrice(orderData.package_price || 0);
          setTotal(parseFloat(orderData.total || 0));
          setTopic(orderData.package || "");

          const addonsList = orderData.lines || [];
          let calculatedTotal = parseFloat(orderData.total || 0);

          const savedPromoDiscount = localStorage.getItem("promoDiscount");

          // Apply discount if available
          if (savedPromoDiscount) {
            const discount = parseFloat(savedPromoDiscount);
            setPromoDiscount(discount);

            // Subtract discount from total
            calculatedTotal = Math.max(0, calculatedTotal - discount);
          }

          // Set final total after discount applied
          setTotal(calculatedTotal);

          // Load promo details if available
          const savedAppliedPromo = localStorage.getItem("appliedPromo");
          if (savedAppliedPromo) {
            try {
              setAppliedPromo(JSON.parse(savedAppliedPromo));
            } catch (e) {
              console.error("Error parsing saved promo data:", e);
            }
          }

          localStorage.setItem("orderId", orderData.order_id);

          if (
            addonsList &&
            Array.isArray(addonsList) &&
            addonsList.length > 0
          ) {
            const addonMap = new Map();

            addonsList.forEach((addon) => {
              const key = addon.addon_id;
              const name = addon.addon;
              const price = parseFloat(addon.price || 0);
              const quantity = parseFloat(addon.quantity || 1);

              if (addonMap.has(key)) {
                const existing = addonMap.get(key);
                existing.quantity += quantity;
                existing.totalPrice += price * quantity;
              } else {
                addonMap.set(key, {
                  id: key,
                  name: name,
                  price: price,
                  totalPrice: price * quantity,
                  quantity: quantity,
                  description: addon.description || "",
                });
              }
            });

            const groupedAddons = Array.from(addonMap.values());
            setAddons(groupedAddons);

            setCount(addonsList.length + 1);
          } else {
            console.log("No addons found or empty array");
            setAddons([]);
            setCount(1);
          }
          localStorage.setItem("orderId", orderData.order_id);
        } else {
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  const handleBackClick = () => {
    navigate("/itemCart");
  };

  useEffect(() => {
    return () => {
      if (window.location.pathname !== "/payment") {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("getTopic");
        localStorage.removeItem("getCount");
        localStorage.removeItem("packageDetails");
        localStorage.removeItem("appliedPromo");
        localStorage.removeItem("promoDiscount");
        localStorage.removeItem("promoCode");
      }
    };
  }, []);

  return (
    <div className="class_continer emptycart_bk">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="">
            <div className="paymnet_continer">
              <div className="paymnet_continer_main_card">
                <div className="paymnet_continer_main_card_subbb">
                  <div className="paymnet_continer_main_card_section_one">
                    <div
                      className="paymnet_back_continer"
                      onClick={handleBackClick}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_128_458)">
                            <path
                              d="M5 12H19"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5 12L11 18"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5 12L11 6"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_128_458">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="paymnet_back_continer_bk_pera">Back</p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="222"
                        height="24"
                        viewBox="0 0 222 24"
                        fill="none"
                      >
                        <path
                          d="M108.07 11.4501C108.07 10.8915 108.049 10.3328 108.006 9.77421C107.984 9.21556 107.952 8.65692 107.909 8.09828H110.193V10.3866H110.257C110.772 9.50563 111.479 8.83955 112.38 8.38835C113.302 7.93713 114.213 7.71153 115.114 7.71153C115.521 7.71153 115.95 7.7545 116.4 7.84045C116.872 7.92639 117.322 8.08754 117.751 8.32389C118.18 8.53875 118.577 8.8503 118.941 9.25854C119.327 9.66677 119.649 10.1932 119.906 10.8378C120.335 9.87089 121.011 9.10813 121.933 8.54949C122.876 7.99085 123.852 7.71153 124.859 7.71153C126.789 7.71153 128.215 8.2272 129.137 9.25854C130.059 10.2684 130.52 11.7187 130.52 13.6095V23.1816H128.398V14.383C128.398 12.8575 128.129 11.6865 127.593 10.87C127.057 10.0535 126.06 9.64529 124.602 9.64529C123.809 9.64529 123.144 9.80643 122.608 10.1287C122.072 10.4295 121.632 10.8378 121.289 11.3534C120.968 11.8691 120.732 12.46 120.582 13.1261C120.432 13.7706 120.357 14.4475 120.357 15.1565V23.1816H118.234V14.383C118.234 12.8575 117.966 11.6865 117.43 10.87C116.894 10.0535 115.897 9.64529 114.438 9.64529C114.31 9.64529 114.01 9.68826 113.538 9.77421C113.088 9.86015 112.616 10.0965 112.123 10.4832C111.629 10.87 111.179 11.4501 110.772 12.2236C110.386 12.9971 110.193 14.0714 110.193 15.4466V23.1816H108.07V11.4501Z"
                          fill="#237655"
                        />
                        <path
                          d="M142.892 15.6722C142.356 15.6722 141.681 15.7044 140.866 15.7689C140.073 15.8118 139.301 15.9407 138.55 16.1556C137.821 16.349 137.189 16.6605 136.653 17.0903C136.138 17.52 135.881 18.1109 135.881 18.8629C135.881 19.3571 135.977 19.7868 136.17 20.152C136.385 20.4958 136.663 20.7859 137.006 21.0222C137.349 21.2371 137.725 21.3982 138.132 21.5057C138.561 21.5916 138.99 21.6346 139.419 21.6346C140.191 21.6346 140.855 21.5057 141.413 21.2478C141.992 20.99 142.474 20.6462 142.86 20.2165C143.246 19.7653 143.525 19.2496 143.696 18.6695C143.889 18.0679 143.986 17.434 143.986 16.768V15.6722H142.892ZM143.986 13.9318V13.545C143.986 10.9452 142.699 9.64529 140.126 9.64529C138.368 9.64529 136.835 10.2362 135.527 11.4179L134.24 9.90312C135.655 8.44206 137.778 7.71153 140.609 7.71153C141.338 7.71153 142.035 7.81896 142.699 8.03382C143.385 8.24868 143.975 8.58172 144.468 9.03293C144.962 9.46266 145.358 10.0106 145.658 10.6766C145.959 11.3427 146.109 12.1377 146.109 13.0616V19.7975C146.109 20.3776 146.13 20.99 146.173 21.6346C146.237 22.2577 146.302 22.7734 146.366 23.1816H144.308C144.243 22.8163 144.19 22.4188 144.147 21.9891C144.125 21.5594 144.115 21.1404 144.115 20.7322H144.05C143.428 21.742 142.689 22.4726 141.831 22.9238C140.995 23.3535 139.965 23.5683 138.743 23.5683C138.078 23.5683 137.435 23.4717 136.813 23.2783C136.192 23.1064 135.634 22.8378 135.141 22.4726C134.669 22.0858 134.283 21.6238 133.983 21.0867C133.704 20.528 133.565 19.8835 133.565 19.1529C133.565 17.9282 133.876 16.9721 134.498 16.2845C135.141 15.5755 135.934 15.0491 136.878 14.7053C137.843 14.3615 138.861 14.1466 139.933 14.0607C141.027 13.9748 142.024 13.9318 142.924 13.9318H143.986Z"
                          fill="#237655"
                        />
                        <path
                          d="M151.919 8.09828C151.962 8.50652 151.983 8.91476 151.983 9.323C152.005 9.70975 152.016 10.1072 152.016 10.5155H152.08C152.316 10.1072 152.616 9.73123 152.98 9.38745C153.345 9.04367 153.752 8.75361 154.203 8.51726C154.653 8.25943 155.125 8.06605 155.618 7.93713C156.132 7.78673 156.636 7.71153 157.13 7.71153C159.059 7.71153 160.485 8.2272 161.407 9.25854C162.329 10.2684 162.79 11.7187 162.79 13.6095V23.1816H160.668V14.8342C160.668 13.1583 160.378 11.8799 159.799 10.9989C159.22 10.0965 158.148 9.64529 156.583 9.64529C156.476 9.64529 156.175 9.68826 155.682 9.77421C155.189 9.86015 154.664 10.0965 154.106 10.4832C153.57 10.87 153.088 11.4501 152.659 12.2236C152.23 12.9971 152.016 14.0714 152.016 15.4466V23.1816H149.893V11.4179C149.893 11.0097 149.871 10.494 149.828 9.87089C149.807 9.24779 149.775 8.65692 149.732 8.09828H151.919Z"
                          fill="#237655"
                        />
                        <path
                          d="M174.619 11.6757C174.297 11.0526 173.868 10.5585 173.332 10.1932C172.796 9.82792 172.142 9.64529 171.37 9.64529C171.006 9.64529 170.631 9.68826 170.245 9.77421C169.88 9.86015 169.548 9.99981 169.248 10.1932C168.947 10.3651 168.701 10.5907 168.508 10.87C168.336 11.1493 168.25 11.4931 168.25 11.9013C168.25 12.6104 168.497 13.1261 168.99 13.4483C169.483 13.7706 170.223 14.05 171.21 14.2863L173.364 14.802C174.415 15.0383 175.284 15.5218 175.97 16.2523C176.677 16.9613 177.031 17.853 177.031 18.9273C177.031 19.7438 176.86 20.4528 176.517 21.0545C176.195 21.6346 175.755 22.118 175.198 22.5048C174.662 22.87 174.04 23.1386 173.332 23.3105C172.625 23.4824 171.906 23.5683 171.177 23.5683C170.019 23.5683 168.937 23.3535 167.929 22.9238C166.942 22.4726 166.095 21.7098 165.388 20.6355L167.221 19.3785C167.65 20.0661 168.186 20.614 168.829 21.0222C169.494 21.4305 170.277 21.6346 171.177 21.6346C171.606 21.6346 172.035 21.5916 172.464 21.5057C172.893 21.3982 173.268 21.2478 173.59 21.0545C173.933 20.8396 174.201 20.571 174.394 20.2487C174.608 19.9264 174.715 19.5504 174.715 19.1207C174.715 18.3687 174.437 17.8315 173.879 17.5092C173.322 17.1655 172.646 16.8969 171.853 16.7035L169.794 16.2201C169.537 16.1556 169.183 16.0482 168.733 15.8978C168.304 15.7474 167.875 15.5218 167.446 15.221C167.039 14.9202 166.685 14.5334 166.385 14.0607C166.085 13.5665 165.935 12.9649 165.935 12.2559C165.935 11.4824 166.085 10.8055 166.385 10.2254C166.707 9.64529 167.125 9.17259 167.639 8.80733C168.175 8.44206 168.776 8.17348 169.44 8.00159C170.105 7.80822 170.791 7.71153 171.499 7.71153C172.55 7.71153 173.525 7.91565 174.426 8.32389C175.326 8.73212 176.023 9.43043 176.517 10.4188L174.619 11.6757Z"
                          fill="#237655"
                        />
                        <path
                          d="M182.302 2.29701C182.302 2.74822 182.141 3.12423 181.82 3.42503C181.498 3.70435 181.144 3.84401 180.758 3.84401C180.372 3.84401 180.018 3.70435 179.697 3.42503C179.375 3.12423 179.214 2.74822 179.214 2.29701C179.214 1.8458 179.375 1.48053 179.697 1.20121C180.018 0.900403 180.372 0.75 180.758 0.75C181.144 0.75 181.498 0.900403 181.82 1.20121C182.141 1.48053 182.302 1.8458 182.302 2.29701ZM181.82 23.1816H179.697V8.09828H181.82V23.1816Z"
                          fill="#237655"
                        />
                        <path
                          d="M198.716 15.6399C198.716 14.802 198.577 14.0177 198.298 13.2872C198.041 12.5567 197.665 11.9228 197.172 11.3857C196.679 10.8485 196.079 10.4295 195.371 10.1287C194.685 9.80643 193.902 9.64529 193.023 9.64529C192.144 9.64529 191.351 9.80643 190.643 10.1287C189.957 10.4295 189.367 10.8485 188.874 11.3857C188.402 11.9228 188.027 12.5567 187.748 13.2872C187.491 14.0177 187.362 14.802 187.362 15.6399C187.362 16.4779 187.491 17.2621 187.748 17.9927C188.027 18.7232 188.402 19.357 188.874 19.8942C189.367 20.4314 189.957 20.8611 190.643 21.1834C191.351 21.4842 192.144 21.6346 193.023 21.6346C193.902 21.6346 194.685 21.4842 195.371 21.1834C196.079 20.8611 196.679 20.4314 197.172 19.8942C197.665 19.357 198.041 18.7232 198.298 17.9927C198.577 17.2621 198.716 16.4779 198.716 15.6399ZM201.032 15.6399C201.032 16.7787 200.828 17.8315 200.421 18.7984C200.035 19.7653 199.488 20.6033 198.78 21.3123C198.073 22.0213 197.226 22.58 196.239 22.9882C195.275 23.375 194.202 23.5683 193.023 23.5683C191.865 23.5683 190.793 23.375 189.807 22.9882C188.842 22.58 188.006 22.0213 187.298 21.3123C186.59 20.6033 186.033 19.7653 185.625 18.7984C185.239 17.8315 185.046 16.7787 185.046 15.6399C185.046 14.5012 185.239 13.4483 185.625 12.4815C186.033 11.5146 186.59 10.6766 187.298 9.96758C188.006 9.25854 188.842 8.71064 189.807 8.32389C190.793 7.91565 191.865 7.71153 193.023 7.71153C194.202 7.71153 195.275 7.91565 196.239 8.32389C197.226 8.71064 198.073 9.25854 198.78 9.96758C199.488 10.6766 200.035 11.5146 200.421 12.4815C200.828 13.4483 201.032 14.5012 201.032 15.6399Z"
                          fill="#237655"
                        />
                        <path
                          d="M205.788 8.09828C205.831 8.50652 205.852 8.91476 205.852 9.323C205.874 9.70975 205.884 10.1072 205.884 10.5155H205.949C206.185 10.1072 206.485 9.73123 206.849 9.38745C207.214 9.04367 207.621 8.75361 208.071 8.51726C208.522 8.25943 208.993 8.06605 209.487 7.93713C210.001 7.78673 210.505 7.71153 210.998 7.71153C212.928 7.71153 214.354 8.2272 215.276 9.25854C216.198 10.2684 216.659 11.7187 216.659 13.6095V23.1816H214.536V14.8342C214.536 13.1583 214.247 11.8799 213.668 10.9989C213.089 10.0965 212.017 9.64529 210.452 9.64529C210.344 9.64529 210.044 9.68826 209.551 9.77421C209.058 9.86015 208.532 10.0965 207.975 10.4832C207.439 10.87 206.956 11.4501 206.528 12.2236C206.099 12.9971 205.884 14.0714 205.884 15.4466V23.1816H203.762V11.4179C203.762 11.0097 203.74 10.494 203.697 9.87089C203.676 9.24779 203.644 8.65692 203.601 8.09828H205.788Z"
                          fill="#237655"
                        />
                        <path
                          d="M10.4954 0.75C10.4954 0.335786 10.831 0 11.2451 0H14.2437C14.6578 0 14.9934 0.335787 14.9934 0.75V4.5C14.9934 4.91421 14.6578 5.25 14.2437 5.25H5.24769V23.25H0V3H10.4954V0.75Z"
                          fill="#0D5438"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.1149 16.8002C13.2438 17.9605 13.6948 18.8629 14.468 19.5075C15.2411 20.1521 16.1754 20.4744 17.2707 20.4744C18.2371 20.4744 19.0425 20.281 19.6868 19.8942C20.3526 19.486 20.9325 18.9811 21.4264 18.3794L24.1969 20.4744C23.2949 21.5916 22.2855 22.3866 21.1687 22.8593C20.0519 23.332 18.8814 23.5684 17.6573 23.5684C16.4975 23.5684 15.4022 23.375 14.3713 22.9882C13.3404 22.6015 12.4492 22.0536 11.6975 21.3445C10.9458 20.6355 10.3444 19.7868 9.89342 18.7984C9.46389 17.7886 9.24912 16.6713 9.24912 15.4466C9.24912 14.2219 9.46389 13.1153 9.89342 12.127C10.3444 11.1171 10.9458 10.2577 11.6975 9.54861C12.4492 8.83957 13.3404 8.29167 14.3713 7.90492C15.4022 7.51817 16.4975 7.32479 17.6573 7.32479C18.7311 7.32479 19.7083 7.51817 20.5888 7.90492C21.4909 8.27019 22.2533 8.80734 22.8761 9.51639C23.5204 10.2254 24.0144 11.1064 24.358 12.1592C24.7231 13.1905 24.9057 14.383 24.9057 15.7366V16.8002H13.1149ZM21.0399 13.8996C21.0184 12.7608 20.664 11.8691 19.9768 11.2245C19.2895 10.5585 18.3338 10.2254 17.1096 10.2254C15.9499 10.2254 15.0264 10.5585 14.3391 11.2245C13.6733 11.8906 13.2653 12.7823 13.1149 13.8996H21.0399Z"
                          fill="#0D5438"
                        />
                        <path
                          d="M35.6434 11.998C34.8917 10.9452 33.8823 10.4188 32.6152 10.4188C32.0997 10.4188 31.595 10.5477 31.1011 10.8056C30.6071 11.0634 30.3601 11.4824 30.3601 12.0625C30.3601 12.5352 30.5641 12.879 30.9722 13.0938C31.3803 13.3087 31.8957 13.4913 32.5185 13.6417C33.1413 13.7921 33.8071 13.9533 34.5159 14.1252C35.2461 14.2756 35.9226 14.5227 36.5454 14.8665C37.1682 15.1887 37.6837 15.64 38.0917 16.2201C38.4998 16.8002 38.7038 17.5952 38.7038 18.6051C38.7038 19.529 38.4998 20.3132 38.0917 20.9578C37.7052 21.5809 37.1897 22.0858 36.5454 22.4726C35.9226 22.8593 35.2138 23.1386 34.4192 23.3105C33.6246 23.4824 32.8299 23.5684 32.0353 23.5684C30.8326 23.5684 29.7265 23.3965 28.7171 23.0527C27.7077 22.7089 26.8057 22.0858 26.0111 21.1834L28.5883 18.7662C29.0822 19.3248 29.6084 19.7868 30.1668 20.1521C30.7467 20.4958 31.4447 20.6677 32.2608 20.6677C32.54 20.6677 32.8299 20.6355 33.1306 20.571C33.4313 20.5066 33.7105 20.3992 33.9682 20.2487C34.2259 20.0983 34.4299 19.9157 34.5803 19.7008C34.7521 19.4645 34.838 19.1959 34.838 18.8951C34.838 18.358 34.634 17.9605 34.2259 17.7026C33.8179 17.4448 33.3024 17.2407 32.6796 17.0903C32.0568 16.9184 31.3802 16.768 30.65 16.6391C29.9413 16.4887 29.2755 16.2631 28.6527 15.9622C28.0299 15.64 27.5144 15.1995 27.1064 14.6408C26.6983 14.0822 26.4943 13.3087 26.4943 12.3203C26.4943 11.4609 26.6661 10.7196 27.0097 10.0965C27.3748 9.45193 27.8473 8.92552 28.4272 8.51728C29.0071 8.10904 29.6728 7.80823 30.4245 7.61486C31.1762 7.42148 31.9386 7.32479 32.7118 7.32479C33.7427 7.32479 34.7628 7.50742 35.7722 7.87269C36.7817 8.21647 37.5978 8.81808 38.2206 9.67753L35.6434 11.998Z"
                          fill="#0D5438"
                        />
                        <path
                          d="M51.0238 23.1816H54.6964V7.71154H50.8306V16.1556C50.8306 16.6713 50.7661 17.1655 50.6373 17.6382C50.5084 18.1109 50.2936 18.5299 49.993 18.8951C49.7138 19.2604 49.3487 19.5504 48.8976 19.7653C48.4681 19.9802 47.9312 20.0876 47.2869 20.0876C46.5996 20.0876 46.0627 19.9372 45.6761 19.6364C45.311 19.3141 45.0318 18.9273 44.8385 18.4761C44.6667 18.0034 44.5593 17.5093 44.5164 16.9936C44.4734 16.4564 44.452 15.973 44.452 15.5433V7.71154H40.5861V17.477C40.5861 18.272 40.6828 19.0348 40.8761 19.7653C41.0694 20.4958 41.3915 21.1512 41.8425 21.7313C42.2935 22.2899 42.8734 22.7411 43.5822 23.0849C44.3124 23.4072 45.1929 23.5684 46.2238 23.5684C47.5124 23.5684 48.5325 23.289 49.2842 22.7304C50.0359 22.1503 50.5943 21.4735 50.9594 20.7H51.0238V23.1816Z"
                          fill="#0D5438"
                        />
                        <path
                          d="M57.7991 7.71154H61.4716V10.1287H61.536C61.8797 9.39821 62.4273 8.75363 63.179 8.19498C63.9522 7.61486 64.9831 7.32479 66.2717 7.32479C68.6985 7.32479 70.3093 8.28093 71.1039 10.1932C71.6623 9.20483 72.3603 8.48505 73.1979 8.03384C74.0355 7.56114 75.0342 7.32479 76.1939 7.32479C77.2248 7.32479 78.0946 7.49668 78.8034 7.84046C79.5121 8.18424 80.0812 8.65694 80.5108 9.25855C80.9618 9.86016 81.2839 10.5692 81.4772 11.3857C81.6705 12.1807 81.7672 13.0401 81.7672 13.964V23.1816H77.9013V14.4152C77.9013 13.9425 77.8584 13.4913 77.7725 13.0616C77.6866 12.6104 77.5362 12.2236 77.3215 11.9014C77.1067 11.5576 76.8168 11.289 76.4517 11.0956C76.0865 10.9022 75.6141 10.8056 75.0342 10.8056C74.4328 10.8056 73.9174 10.9237 73.4879 11.1601C73.0798 11.3749 72.7362 11.6757 72.457 12.0625C72.1993 12.4278 72.006 12.8575 71.8771 13.3517C71.7697 13.8244 71.716 14.3078 71.716 14.802V23.1816H67.8502V13.964C67.8502 12.9972 67.6462 12.2344 67.2381 11.6757C66.8301 11.0956 66.1535 10.8056 65.2086 10.8056C64.5643 10.8056 64.0166 10.913 63.5656 11.1279C63.1361 11.3427 62.771 11.6328 62.4703 11.998C62.1911 12.3633 61.9871 12.7823 61.8582 13.255C61.7293 13.7277 61.6649 14.2219 61.6649 14.7375V23.1816H57.7991V7.71154Z"
                          fill="#0D5438"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M89.3123 19.5075C88.5391 18.8629 88.0881 17.9605 87.9593 16.8002H99.75V15.7366C99.75 14.383 99.5674 13.1905 99.2023 12.1592C98.8587 11.1064 98.3647 10.2254 97.7204 9.51639C97.0976 8.80734 96.3352 8.27019 95.4332 7.90492C94.5526 7.51817 93.5754 7.32479 92.5016 7.32479C91.3419 7.32479 90.2465 7.51817 89.2156 7.90492C88.1848 8.29167 87.2935 8.83957 86.5418 9.54861C85.7901 10.2577 85.1888 11.1171 84.7377 12.127C84.3082 13.1153 84.0934 14.2219 84.0934 15.4466C84.0934 16.6713 84.3082 17.7886 84.7377 18.7984C85.1888 19.7868 85.7901 20.6355 86.5418 21.3445C87.2935 22.0536 88.1848 22.6015 89.2156 22.9882C90.2465 23.375 91.3419 23.5684 92.5016 23.5684C93.7258 23.5684 94.8962 23.332 96.013 22.8593C97.1298 22.3866 98.1392 21.5916 99.0413 20.4744L96.2708 18.3794C95.7768 18.9811 95.1969 19.486 94.5311 19.8942C93.8868 20.281 93.0815 20.4744 92.115 20.4744C91.0197 20.4744 90.0855 20.1521 89.3123 19.5075ZM94.8211 11.2245C95.5083 11.8691 95.8627 12.7608 95.8842 13.8996H87.9593C88.1096 12.7823 88.5177 11.8906 89.1834 11.2245C89.8707 10.5585 90.7942 10.2254 91.9539 10.2254C93.1781 10.2254 94.1338 10.5585 94.8211 11.2245Z"
                          fill="#0D5438"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="paymnet_continer_main_card_section_two">
                    <p className="paymnet_continer_main_card_section_two_topic">
                      Order Summary
                    </p>
                    <div className="paymnet_continer_main_card_section_two_card">
                      <p className="paymnet_continer_two_card_topic">
                        {count} {count === 1 ? "item" : "items"}
                      </p>
                      <div className="paymnet_continer_two_card_topic_subsection">
                        <div className="paymnet_two_card_topic_subsection">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16.5 9.39996L7.5 4.20996"
                                stroke="#121212"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
                                stroke="#121212"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M3.26953 6.95996L11.9995 12.01L20.7295 6.95996"
                                stroke="#121212"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 22.08V12"
                                stroke="#121212"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {topic}
                        </div>
                        <p className="paymnet_two_card_price_subsection">
                          ${packagePrice}
                        </p>
                      </div>
                      {addons && addons.length > 0 ? (
                        <div className="addon-items-container">
                          {addons.map((addon, index) => (
                            <div
                              key={index}
                              className="paymnet_continer_two_card_topic_subsection addon-item"
                            >
                              <div className="paymnet_two_card_topic_subsection">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#121212"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div className="addon-details">
                                  <span>{addon.name}</span>

                                  <span className="addon-quantity">
                                    x{addon.quantity}
                                  </span>
                                </div>
                              </div>
                              <p className="paymnet_two_card_price_subsection">
                                ${addon.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-addons">No add-ons selected</div>
                      )}
                    </div>

                    <div className="paymnet_continer_main_card_section_two_card">
                      <div className="paymnet_two_card_two_section">
                        <p className="paymnet_two_card_two_section_name">
                          Sub Total
                        </p>
                        <p className="paymnet_two_card_two_section_name">
                          ${packagePrice}
                        </p>
                      </div>

                      {addons && addons.length > 0 && (
                        <div className="paymnet_two_card_two_section">
                          <p className="paymnet_two_card_two_section_name">
                            Add-ons
                          </p>
                          <p className="paymnet_two_card_two_section_name">
                            ${(total - packagePrice).toFixed(2)}
                          </p>
                        </div>
                      )}

                      {promoDiscount > 0 && (
                        <div className="paymnet_two_card_two_section discount">
                          <p className="paymnet_two_card_two_section_name">
                            Promo Discount
                          </p>
                          <p className="paymnet_two_card_two_section_name discount-text">
                            -${promoDiscount.toFixed(2)}
                          </p>
                        </div>
                      )}

                      <div className="paymnet_two_card_two_section">
                        <p className="paymnet_two_card_two_section_name_b">
                          Total Amount
                        </p>
                        <p className="paymnet_two_card_two_section_name_b">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="paymnet_continer_main_card_two">
                <div className="paymnet_continer_main_card_two_subb">
                  <Elements options={{}} stripe={stripePromise}>
                    <CheckoutForm total={total} />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
