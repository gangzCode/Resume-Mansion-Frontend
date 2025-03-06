import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { useLocation, useNavigate } from "react-router";
import {
  addToCartService,
  getCurrentOrder,
  getPackageAddons,
  getPreviousOrderDetails,
  updateCartAddons,
  updateCurrentOrder,
} from "../../../../../../../Services/apiCalls";
import Loader from "../../../../../../Common/Loader";
import { useSnackbar } from "../../../../../../../Context/SnackbarContext";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QycJvBOp5kjpMN7KQ9msUMvpURA7PkcvlfzTah60mxY1OmSQ05gLhbMow8lHADOHEm6c8uDBoChiLtDQQ7pnBIK00S5U2hgaP"
);

function PaymentForm({
  addon,
  orderDetails,
  setOrderDetails,
  onClose,
  onSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw error;
      }

      const currentLine = orderDetails.lines.find(
        (line) => line.addon_id === addon.id
      );
      const currentQuantity = currentLine ? currentLine.quantity : 0;

      const orderData = {
        order_id: orderDetails.order_id,
        payment_method_id: paymentMethod.id,
        addon_id: addon.id,
        quantity: parseFloat(currentQuantity) + 1,
      };

      const response = await updateCurrentOrder(orderData);

      if (response.http_status === 200) {
        const updatedOrderDetails = {
          ...orderDetails,
          lines: response.data.lines,
          total: response.data.total,
        };
        setOrderDetails(updatedOrderDetails);

        setTimeout(() => {
          showSnackbar("Add-on added successfully", "success");
        }, 1500);

        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <h3>Pay for {addon.title}</h3>
        <p>Amount: ${addon.price}</p>
        <form onSubmit={handleSubmit}>
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
            className="card-element"
          />
          {error && <div className="error-message">{error}</div>}
          <div className="payment-buttons">
            <button className="pay-button" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
            <button className="cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OrderDetails() {
  const [copied, setCopied] = useState(false);
  const email = "contact@resumemansion.com";
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addons, setAddons] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [selectedAddon, setSelectedAddon] = useState(null);
  const navigate = useNavigate();
  const orderId = location.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await getPreviousOrderDetails(orderId);
        if (orderResponse.http_status_message === "Success") {
          setOrderDetails(orderResponse.data);

          const addonsResponse = await getPackageAddons(
            orderResponse.data.package_id
          );

          console.log(addonsResponse, "addonsResponse");

          if (addonsResponse.length > 0) {
            setAddons(addonsResponse);
          }
        } else {
          setError("error.message");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const response = await getPreviousOrderDetails(orderId);
          if (response.http_status_message === "Success") {
            console.log(response, "response");

            setOrderDetails(response.data);
          } else {
            setError("error.message");
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
    });
  };

  const handlePaymentSuccess = () => {
    showSnackbar("Payment successful", "success");
  };

  const handlePayClick = (addon) => {
    setSelectedAddon(addon);
  };

  const handleOrderAgain = async () => {
    try {
      localStorage.removeItem("selectedPackage");
      setLoading(true);

      const cartData = {
        package_id: orderDetails.package_id,
      };

      const response = await addToCartService(cartData);

      if (response.http_status === 200) {
        const orderId = response.data.order.id;

        if (orderDetails.lines && orderDetails.lines.length > 0) {
          for (const line of orderDetails.lines) {
            try {
              if (!line || !line.addon_id) continue;

              await updateCartAddons(orderId, line.addon_id, line.quantity);
            } catch (addonError) {
              console.error(`Error adding addon ${line.addon}:`, addonError);
            }
          }
        }

        showSnackbar("Package added to cart successfully", "success");
        navigate("/itemCart");
      } else {
        throw new Error("Failed to add package to cart");
      }
    } catch (error) {
      console.error("Error adding package to cart:", error);
      showSnackbar("Failed to add items to cart", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetails) return <div>No order details found</div>;

  return (
    <div className="order_details_continer_chat">
      <p className="cart_continer_main_card_topsetion_topic">
        Order Details #{orderDetails?.order_id}
      </p>
      <div className="cart_continer_main_card_topsetion_card_one_chat">
        <p className="cart_continer_main_card_topsetion_card_one_item">
          {orderDetails?.lines?.length || 0} items
        </p>
        <div className="cart_continer_main_card_topsetion_card_section_two">
          <div className="topsetion_card_section_two_continer">
            <div className="topsetion_card_section_two_continer_topic_continer">
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
              <p className="topsetion_card_section_two_continer_topic">
                {orderDetails?.package}
              </p>
            </div>
            <p className="topsetion_card_section_two_continer_price">{`${orderDetails?.currency_code}${orderDetails?.package_price}`}</p>
          </div>
          {orderDetails?.lines &&
            orderDetails?.lines?.map((line) => (
              <div className="topsetion_card_section_two_continer_itemset_main-order">
                <p
                  key={line?.line_id}
                  className="topsetion_card_section_two_continer_itemset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {line?.addon}
                </p>
                <p className="topsetion_card_section_two_continer_price">
                  {orderDetails?.currency_code}
                  {line?.price}
                </p>
              </div>
            ))}
        </div>
        <div className="lin_cart"></div>
        <div className="detail_cart_top">
          <div className="detail_cart_top_data">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#121212"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="#121212"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="detail_cart_top_data_pera">
              {" "}
              {orderDetails.lines.some((line) =>
                line.addon.toLowerCase().includes("express")
              )
                ? "1-day delivery"
                : "2-day delivery"}
            </p>
          </div>
          <div className="detail_cart_top_data">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23 4V10H17"
                stroke="#121212"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 20V14H7"
                stroke="#121212"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.51 9.00008C4.01717 7.56686 4.87913 6.28548 6.01547 5.27549C7.1518 4.26551 8.52547 3.55984 10.0083 3.22433C11.4911 2.88883 13.0348 2.93442 14.4952 3.35685C15.9556 3.77928 17.2853 4.56479 18.36 5.64008L23 10.0001M1 14.0001L5.64 18.3601C6.71475 19.4354 8.04437 20.2209 9.50481 20.6433C10.9652 21.0657 12.5089 21.1113 13.9917 20.7758C15.4745 20.4403 16.8482 19.7346 17.9845 18.7247C19.1209 17.7147 19.9828 16.4333 20.49 15.0001"
                stroke="#121212"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="detail_cart_top_data_pera">1 Revision</p>
          </div>
        </div>
      </div>

      {orderDetails.status === "Delivered" && (
        <button
          className="order_details_continer_chat_againbtn"
          onClick={handleOrderAgain}
        >
          Order again
        </button>
      )}

      <div className="chat_help_box">
        <p className="topic_need_order">Need a help with your order? </p>
        <p className="topic_pera_need_order">
          Contact us:
          <span className="mail_chat" onClick={handleCopy}>
            {email}
          </span>
          {copied && <span className="copdmsgmail">Copied !</span>}
        </p>
      </div>

      {orderDetails.status !== "Delivered" &&
        addons
          .filter((addon) => {
            const hasExpressAddon = orderDetails.lines.some((line) =>
              !line.addon.toLowerCase().includes("express")
            );

            return hasExpressAddon
              ? !addon.title.toLowerCase().includes("express")
              : true;
          })
          .map((addon) => (
            <div key={addon.id} className="link_chat_box">
              <p className="link_chat_box_topic">{addon.title}</p>
              <p className="link_chat_box_pera">{addon.description}</p>
              <div className="link_chat_box_action">
                <p className="link_chat_box_action_pera">+${addon.price}</p>
                <button
                  className="link_chat_box_action_btn"
                  onClick={() => handlePayClick(addon)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}

      {selectedAddon && (
        <Elements stripe={stripePromise}>
          <PaymentForm
            addon={selectedAddon}
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
            onClose={() => setSelectedAddon(null)}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
}

export default OrderDetails;
