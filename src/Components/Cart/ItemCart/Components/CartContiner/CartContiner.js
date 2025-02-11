import React, { useEffect, useState } from "react";
import "./CartContiner.css";
import { useLocation } from "react-router";
import { getPackageAddons } from "../../../../../Services/apiCalls";

function CartContiner() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const {
    packageId,
    title: pkgTitle,
    price: pkgPrice,
    shortDescription,
  } = location.state || [];

  const [showPromoForm, setShowPromoForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [price, setPrice] = useState("");

  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTopic(pkgTitle);

    setPrice(pkgPrice);
    setTotal(pkgPrice);
  }, []);

  useEffect(() => {
    console.log(price, "price");
  }, [price]);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        if (packageId) {
          const response = await getPackageAddons(packageId);
          // Remove the first item since it's the package itself
          const addonsList = response.slice(1);
          setAddons(addonsList);
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
    setShowPromoForm(false); // Hide the form
  };

  // Function to increase quantity of a specific item
  const increaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + 1); // Increase quantity by 1
    }
  };

  // Function to decrease quantity of a specific item
  const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateItemQuantity(id, item.quantity - 1); // Decrease quantity by 1
    }
  };

  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent setting quantity to 0 or negative

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    const cartTotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCart(updatedCart);
    setTotal(cartTotal + price); // Include default price in total
  };

  const addToCart = (service) => {
    const existingItem = cart.find((item) => item.id === service.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...service, quantity: 1 }];
    }

    const cartTotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCart(updatedCart);
    setTotal(cartTotal + price); // Include default price in total
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    const cartTotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCart(updatedCart);
    setTotal(cartTotal + price); // Include default price in total
  };

  const getSelectedServiceNames = () => {
    return cart
      .map((item) => {
        if (item.name === "Add LinkedIn Makeover") {
          return {
            name: "LinkedIn Makeover",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_114_5380)">
                  <path
                    d="M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11V16"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 8V8.01"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16V11"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_5380">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ),
          };
        } else if (item.name === "Add Personalized Cover Letter") {
          return {
            name: "Cover Letter",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_114_519)">
                  <path
                    d="M17 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H17C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20ZM17 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H9C8.46957 4 7.96086 4.21071 7.58579 4.58579C7.21071 4.96086 7 5.46957 7 6V14"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_519">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ),
          };
        }
        return null; // Default fallback for unmatched names
      })
      .filter(Boolean); // Remove null/undefined values
  };

  const getTopicDetails = () => {
    if (topic === "Professional Edge") {
      return {
        paragraph1: "Cover Letter",
        svg1: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_114_519)">
              <path
                d="M17 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H17C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20ZM17 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H9C8.46957 4 7.96086 4.21071 7.58579 4.58579C7.21071 4.96086 7 5.46957 7 6V14"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_114_519">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      };
    } else if (topic === "Executive Boost") {
      return {
        paragraph1: "LinkedIn Makeover",
        paragraph2: "Cover Letter",
        svg1: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_114_5380)">
              <path
                d="M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 11V16"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 8V8.01"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 16V11"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_114_5380">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        svg2: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_114_519)">
              <path
                d="M17 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H17C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20ZM17 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H9C8.46957 4 7.96086 4.21071 7.58579 4.58579C7.21071 4.96086 7 5.46957 7 6V14"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_114_519">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      };
    } else {
      return null; // If no topic matches, return null
    }
  };

  const handleReadyToPay = () => {
    // Save the total amount to localStorage
    localStorage.setItem("totalAmount", total);
    localStorage.setItem("getTopic", topic);
    localStorage.setItem("getCount", getTotalCount());
    // Redirect the user to the login page
    window.location.href = "/login";
  };

  // Calculate total count of all items in the cart
  const getTotalCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 1);
  };

  //   const filteredServices = addons.filter((addon) => {
  //     if (topic === "Career Starter") {
  //       return true; // Show all addons
  //     } else if (topic === "Custom Career Suite") {
  //       return [2, 3, 4].includes(addon.id);
  //     } else if (topic === "Professional Edge") {
  //       return [2, 4].includes(addon.id);
  //     } else if (topic === "Executive Boost") {
  //       return [2].includes(addon.id);
  //     }
  //     return false;
  //   });

  return (
    <div>
      <div className="continer_main_box">
        <div className="container">
          <div className="cart_continer_main">
            <div className="cart_continer_main_card_one">
              <div className="cart_card_continer">
                <p className="cart_card_topic">Your Cart</p>

                <div class="cart_card Career_Starter">
                  <div class="cart_card_section_one">
                    <p class="cart_card_section_one_topic">{pkgTitle}</p>
                    <p class="cart_card_section_one_close_price">
                      {pkgPrice && "$" + pkgPrice}
                    </p>
                  </div>
                  <p class="cart_card_pera">{shortDescription}</p>
                </div>
                {cart.map((item, index) => (
                  <div className="cart_card">
                    <div className="cart_card_section_one">
                      <p className="cart_card_section_one_topic">
                        {item.title}
                      </p>
                      <p className="cart_card_section_one_close_price">
                        ${item.price}
                        <svg
                          onClick={() => removeFromCart(item.id)}
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
                  </div>
                ))}
              </div>
              <div className="enhance_section_cart">
                {loading ? (
                  <p>Loading addons...</p>
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
                              className="enhance_section_cart_btn"
                              onClick={() => addToCart(addon)}
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
                        {getTopicDetails() && (
                          <>
                            {getTopicDetails().paragraph1 && (
                              <div className="topsetion_card_section_two_continer_topic_continer ">
                                {getTopicDetails().svg1}
                                <p className="topsetion_card_section_two_continer_topic">
                                  {getTopicDetails().paragraph1}
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
                        )}

                        {getSelectedServiceNames().map((service, index) => (
                          <div
                            className="topsetion_card_section_two_continer_topic_continer "
                            key={index}
                          >
                            {service.icon}
                            <p className="topsetion_card_section_two_continer_topic">
                              {service.name}
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
                        2-day delivery
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
                    <form className="promo_card_add_box">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="promo_card_add_box_input"
                        required
                      />
                      <button className="promo_card_add_btn">Apply</button>
                    </form>
                  )}
                  <div className="amounr_box_card">
                    <div className="amounr_box_card_data">
                      <p className="amounr_box_cardonee">Sub Total</p>
                      <p className="amounr_box_cardonee">${total}</p>
                    </div>
                    <div className="amounr_box_card_data">
                      <p className="amounr_box_cardone">Sub Total</p>
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
                      checked
                    />
                  </div>
                  <p className="cart_continer_main_card_subsetion_pera">
                    By continuing, you agree to our
                    <span
                      className="agre_nav_item"
                      onClick={() => (window.location.href = "/privacyPolicy")}
                    >
                      {" "}
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span
                      className="agre_nav_item"
                      onClick={() => (window.location.href = "/privacyPolicy")}
                    >
                      Privacy Policy
                    </span>
                  </p>
                </div>
                <button className="redybtn_cart" onClick={handleReadyToPay}>
                  I’m Ready to Pay
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
