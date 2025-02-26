import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { useLocation } from "react-router";
import { getPreviousOrderDetails } from "../../../../../../../Services/apiCalls";
function OrderDetails() {
  const [copied, setCopied] = useState(false);
  const email = "contact@resumemansion.com";
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();

  const orderId = location.state?.id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const response = await getPreviousOrderDetails(orderId);
          console.log(response, "response");

          setOrderDetails(response.data);
        } catch (error) {
          console.error("Error fetching order details:", error);
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
              {orderDetails?.lines?.some((line) => line?.addon_id === 4)
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
      <button className="order_details_continer_chat_againbtn">
        Order again
      </button>
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
    </div>
  );
}

export default OrderDetails;
