import React, { useEffect, useState } from "react";
import "./CartContiner.css";
import { useLocation, useNavigate } from "react-router";
import {
  getPackageAddons,
  validatePromoCode,
  updateCartAddons,
  deleteCartItem,
  getCart,
} from "../../../../../Services/apiCalls";
import Loader from "../../../../Common/Loader";

function CartContiner() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [showPromoForm, setShowPromoForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [price, setPrice] = useState("");
  const [packageId, setpackageId] = useState("");
  const [pkgShortDesc, setpkgShortDesc] = useState("");

  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);

  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState(null);

  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId") || null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const [loadingAddonId, setLoadingAddonId] = useState(null);

  useEffect(() => {
    const storedPackage = localStorage.getItem("selectedPackage");
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const response = await getCart();

        if (response.http_status === 200) {
          setOrderId(response.data.order_id);
          localStorage.setItem("orderId", response.data.order_id);

          if (storedPackage) {
            const parsedPackage = JSON.parse(storedPackage);
            setpackageId(parsedPackage.id);
            setTopic(parsedPackage.title);
            setPrice(parsedPackage.price);
            setpkgShortDesc(parsedPackage.shortDescription);
          } else if (response.data.package_id) {
            setpackageId(response.data.package_id);
            setTopic(response.data.package);
            setpkgShortDesc(response.data.short_description);
            if (response.data.package_price) {
              setPrice(response.data.package_price);
            }
          }

          setTotal(parseFloat(response.data.total));

          const cartItems = response.data.lines.map((line) => ({
            id: line.addon_id,
            lineId: line.line_id,
            title: line.addon,
            description: line.description,
            price: parseFloat(line.price),
            quantity: parseInt(line.quantity),
          }));

          setCart(cartItems);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("cartTotal", response.data.total);
        }
      } catch (error) {
        setError("Failed to load cart data");
        console.error("Fetch cart error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        if (packageId) {
          const response = await getPackageAddons(packageId);

          setAddons(response);
        }
      } catch (error) {
        console.error("Error fetching addons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddons();
  }, [packageId]);

  const handleClickPromoOpen = () => {
    setShowPromoForm(!showPromoForm);
  };

  const handleClosePromoOpen = () => {
    setShowPromoForm(false);
  };

  const increaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateItemQuantity(id, item.quantity - 1);
    }
  };

  const isExpressDelivery = (item) => {
    return item.title?.toLowerCase().includes("express");
  };

  const updateItemQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0 || !orderId || isUpdating) return;

    const item = cart.find((item) => item.id === id);
    if (item && isExpressDelivery(item)) return;

    setIsUpdating(true);
    try {
      const response = await updateCartAddons(orderId, id, newQuantity);

      if (response.http_status === 200) {
        const updatedCart = response.data.lines.map((line) => ({
          id: line.addon_id,
          lineId: line.line_id,
          title: line.addon,
          price: parseFloat(line.price),
          quantity: parseInt(line.quantity),
          description: line.description,
        }));

        setCart(updatedCart);
        setTotal(parseFloat(response.data.total));
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        localStorage.setItem("cartTotal", response.data.total);
      }
    } catch (error) {
      setError("Failed to update quantity");
      console.error("Update quantity error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const addToCart = async (addon) => {
    setLoadingAddonId(addon.id);
    try {
      const response = await updateCartAddons(orderId, addon.id, 1);

      console.log(addon, "addon");
      console.log(response, "response");

      if (response.http_status === 200) {
        const updatedCart = response.data.lines.map((line) => ({
          id: line.addon_id,
          lineId: line.line_id,
          title: line.addon,
          price: parseFloat(line.price),
          quantity: parseInt(line.quantity),
          description: line.description,
        }));

        setCart(updatedCart);
        setTotal(parseFloat(response.data.total));
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        localStorage.setItem("cartTotal", response.data.total);
      }
    } catch (error) {
      setError("Failed to add item to cart");
      console.error("Add to cart error:", error);
    } finally {
      setLoadingAddonId(null);
    }
  };

  const removeFromCart = async (lineId) => {
    if (!lineId || isUpdating) return;

    setIsUpdating(true);
    try {
      const deleteResponse = await deleteCartItem(lineId);

      if (deleteResponse.http_status === 200) {
        const cartResponse = await getCart();

        if (cartResponse.http_status === 200) {
          setOrderId(cartResponse.data.order_id);
          localStorage.setItem("orderId", cartResponse.data.order_id);

          if (cartResponse.data.package_id) {
            setpackageId(cartResponse.data.package_id);
            setTopic(cartResponse.data.package);
          }
          setTotal(parseFloat(cartResponse.data.total));

          const cartItems = cartResponse.data.lines.map((line) => ({
            id: line.addon_id,
            lineId: line.line_id,
            title: line.addon,
            description: line.description,
            price: parseFloat(line.price),
            quantity: parseInt(line.quantity),
          }));

          setCart(cartItems);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("cartTotal", cartResponse.data.total);

          if (packageId) {
            const addonsResponse = await getPackageAddons(packageId);
            const addonsList = addonsResponse;
            setAddons(addonsList);
          }
        }
      }
    } catch (error) {
      setError("Failed to remove item");
      console.error("Remove from cart error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getSelectedServiceNames = () => {
    return cart
      .map((item) => {
        const serviceConfig = {
          "Add LinkedIn Makeover": {
            name: "LinkedIn Makeover",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 11V16M8 8V8.01M12 16V11M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          "Add Personalized Cover Letter": {
            name: "Cover Letter",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H17M17 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H9C8.46957 4 7.96086 4.21071 7.58579 4.58579C7.21071 4.96086 7 5.46957 7 6V14"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          "Express Delivery": {
            name: "Express Delivery",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17C9 16.4696 8.78929 15.9609 8.41421 15.5858C8.03914 15.2107 7.53043 15 7 15C6.46957 15 5.96086 15.2107 5.58579 15.5858C5.21071 15.9609 5 16.4696 5 17ZM15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 17H3V13M2 5H13V17M9 17H15M19 17H21V11M21 11H13M21 11L18 6H13M3 9H7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
        };

        const config = serviceConfig[item.title];
        if (!config) return null;

        return {
          name: config.name,
          price: item.price * item.quantity,
          quantity: item.quantity,
          icon: config.icon,
        };
      })
      .filter(Boolean);
  };

  const getSelectedServicePrice = () => {
    return cart.map((item) => {
      if (item) {
        return (
          <div class="topsetion_card_section_two_continer">
            <div class="topsetion_card_section_two_continer_topic_continer">
              <p class="amounr_box_cardonee">{item.title}</p>
            </div>
            <p class="amounr_box_cardonee">${item.price * item.quantity}</p>
          </div>
        );
      }
      return null;
    });
  };

  const handleReadyToPay = async () => {
    if (isTermsAccepted) {
      localStorage.setItem("totalAmount", total.toString());
      localStorage.setItem("getTopic", topic);
      localStorage.setItem("getCount", getTotalCount().toString());
      localStorage.setItem(
        "packageDetails",
        JSON.stringify({
          id: packageId,
          title: topic,
          price: price,
          shortDescription: pkgShortDesc,
        })
      );

      if (appliedPromo) {
        localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo));
        localStorage.setItem("promoDiscount", promoDiscount.toString());
      }

      navigate("/payment");
    }
    setError(null);
  };

  const getTotalCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 1);
  };

  const handleTermsAccept = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    setIsApplyingPromo(true);
    setPromoError("");

    try {
      const response = await validatePromoCode(promoCode);

      if (response.http_status === 200) {
        const discount = response.data.price;
        setPromoDiscount(discount);
        setAppliedPromo(response.data);
        setTotal((prevTotal) => prevTotal - discount);
        setShowPromoForm(false);
        setPromoCode("");
      }
    } catch (error) {
      setPromoError(error.message || "Invalid promo code");
    } finally {
      setIsApplyingPromo(false);
    }
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
      }
    };
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const response = await getCart();

        if (response.http_status === 200) {
          setOrderId(response.data.order_id);
          localStorage.setItem("orderId", response.data.order_id);

          if (response.data.package_id) {
            setpackageId(response.data.package_id);
            setTopic(response.data.package);
          }

          setTotal(parseFloat(response.data.total));

          const cartItems = response.data.lines.map((line) => ({
            id: line.addon_id,
            lineId: line.line_id,
            title: line.addon,
            description: line.description,
            price: parseFloat(line.price),
            quantity: parseInt(line.quantity),
          }));

          console.log(cartItems, "cartItems");

          setCart(cartItems);

          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("cartTotal", response.data.total);
        }
      } catch (error) {
        setError("Failed to load cart data");
        console.error("Fetch cart error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div>
      <div className="continer_main_box">
        <div className="container">
          <div className="cart_continer_main">
            <div className="cart_continer_main_card_one">
              <div className="cart_card_continer">
                <p className="cart_card_topic">Your Cart</p>

                <div className="cart_card Career_Starter">
                  <div className="cart_card_section_one">
                    <p className="cart_card_section_one_topic">{topic}</p>
                    <p className="cart_card_section_one_close_price">
                      {price && "$" + price}
                    </p>
                  </div>
                  <p className="cart_card_pera">{pkgShortDesc}</p>
                </div>
                {cart.map((item, index) => (
                  <div className="cart_card" key={item.id}>
                    <div className="cart_card_section_one">
                      <p className="cart_card_section_one_topic">
                        {item.title}
                      </p>
                      <p className="cart_card_section_one_close_price">
                        ${item.price}
                        <svg
                          onClick={() => removeFromCart(item.lineId)}
                          className="svg_cuser"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 6L6 18"
                            stroke="#4B5852"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 6L18 18"
                            stroke="#4B5852"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </p>
                    </div>
                    <p className="cart_card_pera">{item.description}</p>
                    {!isExpressDelivery(item) && (
                      <div className="cart_card_qty_update">
                        <p
                          className="svg_cuser"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_40000049_760)">
                              <path
                                d="M3.33398 8H12.6673"
                                stroke="#051D14"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_40000049_760">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                        <input
                          type="number"
                          name="qty"
                          className="update_qty"
                          value={item.quantity}
                          readOnly
                        />
                        <p
                          className="svg_cuser"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_40000049_764)">
                              <path
                                d="M8 3.3335V12.6668"
                                stroke="#051D14"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M3.33398 8H12.6673"
                                stroke="#051D14"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_40000049_764">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="enhance_section_cart">
                {loading ? (
                  <div className="loader-container">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <div className="enhance_section_cart_topic_set">
                      <p className="enhance_section_cart_topic">
                        Looking to Enhance Your Application?
                      </p>
                      <p className="enhance_section_cart_pera">
                        Consider these additional services to further increase
                        your chances!
                      </p>
                    </div>
                    {addons
                      .filter(
                        (addon) => !cart.some((item) => item.id === addon.id)
                      )
                      .map((addon) => (
                        <div
                          key={addon.id}
                          className="enhance_section_cart_card"
                        >
                          <div className="enhance_section_cart_card_topic_set">
                            <p className="enhance_section_cart_card_topic">
                              {addon.title}
                            </p>
                            <p className="enhance_section_cart_card_pera">
                              {addon.description}
                            </p>
                          </div>
                          <div className="new_item_set">
                            <p className="enhance_section_cart_card_price">
                              +${addon.price}
                            </p>
                            <button
                              className={`enhance_section_cart_btn ${
                                loadingAddonId === addon.id ? "loading" : ""
                              }`}
                              onClick={() => addToCart(addon)}
                              disabled={loadingAddonId === addon.id}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            <div className="cart_continer_main_card">
              <div className="cart_continer_main_card_topsetion">
                <p className="cart_continer_main_card_topsetion_topic cart_continer_main_card_topsetion_topic_new_one">
                  Order Summary
                </p>
                <div className="cart_continer_main_card_topsetion_card_one">
                  <p className="cart_continer_main_card_topsetion_card_one_item">
                    {" "}
                    {getTotalCount()} item
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
                          {topic || "-"}
                        </p>
                      </div>
                      <p className="topsetion_card_section_two_continer_price">
                        ${price || "0"}
                      </p>
                    </div>
                    <div className="topsetion_card_section_two_continer_itemset_main">
                      <p className="topsetion_card_section_two_continer_itemset">
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
                        Professionally-written
                      </p>
                      <p className="topsetion_card_section_two_continer_itemset">
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
                        ATS friendly
                      </p>
                      <p className="topsetion_card_section_two_continer_itemset">
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
                        Formatted for success
                      </p>
                      <p className="topsetion_card_section_two_continer_itemset">
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
                        Keyword optimised
                      </p>
                      <div className="con_new_add_data_lis_cart">
                        {/* {getTopicDetails() && (
                          <>
                            {getTopicDetails().paragraph1 && (
                              <div className="topsetion_card_section_two_continer_topic_continer ">
                                {getTopicDetails().svg1}
                                <p className="topsetion_card_section_two_continer_topic">
                                  {getTopicDetails().paragraph1}
                                  <span className="topic_price">
                                    {" "}
                                    (${getTopicDetails().price1})
                                  </span>
                                </p>
                              </div>
                            )}
                            {getTopicDetails().paragraph2 && (
                              <div className="topsetion_card_section_two_continer_topic_continer">
                                {getTopicDetails().svg2}
                                <p className="topsetion_card_section_two_continer_topic">
                                  {getTopicDetails().paragraph2}
                                </p>
                              </div>
                            )}
                          </>
                        )} */}

                        {getSelectedServiceNames().map((service, index) => (
                          <div
                            className="topsetion_card_section_two_continer "
                            key={index}
                          >
                            <div className="topsetion_card_section_two_continer_topic_continer">
                              {service.icon}
                              <p className="topsetion_card_section_two_continer_topic">
                                {service.name}
                              </p>
                              <p className="topsetion_card_section_two_continer_topic">
                                × {service.quantity}
                              </p>
                            </div>
                            <p class="topsetion_card_section_two_continer_topic">
                              ${service.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
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
                        {cart.some((item) =>
                          item.title?.toLowerCase().includes("express")
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

                <div className="cart_continer_main_card_topsetion_card_one">
                  <div className="procode_cont">
                    <p className="procode" onClick={handleClickPromoOpen}>
                      Have a promo code?
                    </p>
                    {showPromoForm && (
                      <div
                        className="pro_close_btn"
                        onClick={handleClosePromoOpen}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 6L6 18"
                            stroke="#051D14"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 6L18 18"
                            stroke="#051D14"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {showPromoForm && (
                    <form
                      className="promo_card_add_box"
                      onSubmit={handlePromoSubmit}
                    >
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="promo_card_add_box_input"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className={`promo_card_add_btn ${
                          isApplyingPromo ? "loading" : ""
                        }`}
                        disabled={isApplyingPromo}
                      >
                        {isApplyingPromo ? "Applying..." : "Apply"}
                      </button>
                    </form>
                  )}

                  {promoError && (
                    <div className="promo_error_message">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
                          stroke="#DC2626"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 5.33333V8"
                          stroke="#DC2626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 10.6667H8.00667"
                          stroke="#DC2626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>{promoError}</span>
                    </div>
                  )}

                  <div className="amounr_box_card">
                    <div className="amounr_box_card_data">
                      <p className="amounr_box_cardonee">Sub Total</p>
                      <p className="amounr_box_cardonee">${price || 0}</p>
                    </div>

                    {getSelectedServicePrice()}

                    {appliedPromo && (
                      <div className="amounr_box_card_data discount">
                        <p className="amounr_box_cardone">Discount</p>
                        <p className="amounr_box_cardone">-${promoDiscount}</p>
                      </div>
                    )}
                    <div className="amounr_box_card_data total">
                      <p className="amounr_box_cardone">Total</p>
                      <p className="amounr_box_cardone">${total}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart_continer_main_card_subsetion">
                <div className="cart_continer_main_card_subsetion_check_data">
                  <div>
                    <input
                      type="checkbox"
                      className="cart_continer_main_card_subsetion_check"
                      checked={isTermsAccepted}
                      onChange={handleTermsAccept}
                    />
                  </div>
                  <p className="cart_continer_main_card_subsetion_pera">
                    By continuing, you agree to our
                    <a
                      className="agre_nav_item"
                      target="_blank"
                      href="/privacyPolicy"
                    >
                      {" "}
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      className="agre_nav_item"
                      target="_blank"
                      href="/privacyPolicy"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
                {error && (
                  <div className="cart_error_message">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6024 1.66669 10 1.66669C5.39765 1.66669 1.66669 5.39765 1.66669 10C1.66669 14.6024 5.39765 18.3334 10 18.3334Z"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 6.66669V10"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 13.3333H10.0083"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <button
                  className={`redybtn_cart ${
                    !isTermsAccepted || isSubmitting
                      ? "redybtn_cart_disabled"
                      : ""
                  }`}
                  onClick={handleReadyToPay}
                  disabled={!isTermsAccepted || isSubmitting}
                >
                  I'm Ready to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartContiner;
