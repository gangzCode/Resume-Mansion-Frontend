import React, { useEffect, useState } from "react";
import "./OrderStatusCard.css";
import { getPreviousOrders } from "../../../../../../../Services/apiCalls";
import Loader from "../../../../../../Common/Loader";
import { useNavigate } from "react-router";
function OrderStatusCard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      try {
        const response = await getPreviousOrders();
        if (response.http_status === 200) {
          console.log(response.data, "Previous response.data");

          setOrders(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousOrders();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (orders.length === 0) {
    return (
      <div className="continer_main_box">
        <div className="container">
          <div className="OrderStatusCard_continer">
            <p>No previous orders found</p>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="continer_main_box">
  //     <div className="container">
  //       <div className="OrderStatusCard_continer">
  //         <div
  //           className="OrderStatusCard"
  //           onClick={() => (window.location.href = "/pastOrders")}
  //         >
  //           <div className="OrderStatusCard_colum_one">
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //               >
  //                 <g clip-path="url(#clip0_220_20016)">
  //                   <path
  //                     d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12L20 7.5"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12V21"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12L4 7.5"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M16 5.25L8 9.75"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                 </g>
  //                 <defs>
  //                   <clipPath id="clip0_220_20016">
  //                     <rect width="24" height="24" fill="white" />
  //                   </clipPath>
  //                 </defs>
  //               </svg>
  //             </div>
  //             <div>
  //               <p className="OrderStatusCard_colum_one_topic">
  //                 Career Starter
  //               </p>
  //               <p className="OrderStatusCard_colum_one_pera">order #007</p>
  //             </div>
  //           </div>
  //           <div className="OrderStatusCard_colum_two">
  //             <p className="OrderStatusCard_colum_two_status">Delivered</p>
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //               >
  //                 <g clip-path="url(#clip0_220_19887)">
  //                   <path
  //                     d="M9 6L15 12L9 18"
  //                     stroke="#4B5852"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                 </g>
  //                 <defs>
  //                   <clipPath id="clip0_220_19887">
  //                     <rect width="24" height="24" fill="white" />
  //                   </clipPath>
  //                 </defs>
  //               </svg>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="OrderStatusCard">
  //           <div className="OrderStatusCard_colum_one">
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //               >
  //                 <g clip-path="url(#clip0_220_20016)">
  //                   <path
  //                     d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12L20 7.5"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12V21"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M12 12L4 7.5"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                   <path
  //                     d="M16 5.25L8 9.75"
  //                     stroke="#051D14"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                 </g>
  //                 <defs>
  //                   <clipPath id="clip0_220_20016">
  //                     <rect width="24" height="24" fill="white" />
  //                   </clipPath>
  //                 </defs>
  //               </svg>
  //             </div>
  //             <div>
  //               <p className="OrderStatusCard_colum_one_topic">
  //                 Career Starter
  //               </p>
  //               <p className="OrderStatusCard_colum_one_pera">order #006</p>
  //             </div>
  //           </div>
  //           <div className="OrderStatusCard_colum_two">
  //             <p className="OrderStatusCard_colum_two_status_can">Cancelled</p>
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //               >
  //                 <g clip-path="url(#clip0_220_19887)">
  //                   <path
  //                     d="M9 6L15 12L9 18"
  //                     stroke="#4B5852"
  //                     stroke-width="2"
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                   />
  //                 </g>
  //                 <defs>
  //                   <clipPath id="clip0_220_19887">
  //                     <rect width="24" height="24" fill="white" />
  //                   </clipPath>
  //                 </defs>
  //               </svg>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="continer_main_box">
      <div className="container">
        <div className="OrderStatusCard_continer">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="OrderStatusCard"
              onClick={() =>
                navigate("/pastOrders", {
                  state: { id: order.order_id },
                })
              }
            >
              <div className="OrderStatusCard_colum_one">
                <div>
                  <svg
                    xmlns="http:www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_220_20016)">
                      <path
                        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12L20 7.5"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12V21"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12L4 7.5"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 5.25L8 9.75"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_220_20016">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <p className="OrderStatusCard_colum_one_topic">
                    {order.name}
                  </p>
                  <p className="OrderStatusCard_colum_one_pera">
                    ORDER #{order.order_id}
                  </p>
                </div>
              </div>
              <div className="OrderStatusCard_colum_two">
                <p
                  className={`OrderStatusCard_colum_two_status${
                    order.status === "Cancelled" ? "_can" : ""
                  }`}
                >
                  {order.status}
                </p>
                <div>
                  <svg
                    xmlns="http:www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_220_19887)">
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="#4B5852"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_220_19887">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderStatusCard;
