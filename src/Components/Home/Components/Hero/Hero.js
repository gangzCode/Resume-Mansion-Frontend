import React, { useState, useEffect } from "react";
import "./hero.css";
import Pop from "./img/pop.png";
import { getPackages } from "../../../../Services/apiCalls";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../Context/AuthContext";

function Hero() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  let dummy = [
    "Keyword optimized resume",
    "ATS-friendly, modern resume format",
    "Direct communication with your writer",
    "Unlimited revisions",
    "48-hour turnaround time (24-hour Express Delivery optional)",
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages();
        // Access the data array from the response
        setPackages(response.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load packages");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="home_hero">
      <div className="continer_main_box">
        <div className="container">
          <div className="home_continer_main_one">
            <div className="hero_sub_hed_continer">
              <p className="hero_sub_hed">54,863+ Resumes created so far</p>
              <h1 className="disply_topic">
                Land 3X More Interviews with a Winning Resume!
              </h1>
              <p className="pera_hero">
                Get hired for your dream job faster with our Certified
                Professional Resume Writing Services.
              </p>
            </div>
            <div className="price_card_container">
              {packages.slice(0, 3).map((pkg) => (
                <div className="price_card" key={pkg.id}>
                  <div className="pric_card_content_topic">
                    <p className="price_card_topic">{pkg.title}</p>
                    <div
                      className="price_card_pera"
                      dangerouslySetInnerHTML={{
                        __html: pkg.short_description,
                      }}
                    />
                  </div>
                  <div className="pric_card_content">
                    <p className="price_card_name">Investment</p>
                    <p className="price_card_price">${pkg.price}</p>
                  </div>
                  <button
                    className="price_card_btn"
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate(`/itemCart`, {
                          state: {
                            packageId: pkg.id,
                            title: pkg.title,
                            price: pkg.price,
                            shortDescription: pkg.short_description,
                          },
                        });
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Choose
                  </button>
                  <div className="price_card_item_continer">
                    <p className="price_card_sub">What You'll Get</p>
                    {pkg.full_description.slice(0, 5).map((item, index) => (
                      <p className="price_card_item">
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" fill="#051D14" />
                            <path
                              d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z"
                              fill="#BCEC88"
                            />
                          </svg>
                        </div>
                        {item}
                      </p>
                    ))}
                    {/* <div
                      dangerouslySetInnerHTML={{ __html: pkg.full_description }}
                    /> */}
                  </div>
                </div>
              ))}
            </div>

            <div className="sub_card_price">
              {packages.length > 3 && (
                <>
                  <div>
                    <p className="topic_sub_price">{packages[3].title}</p>
                    <div
                      className="pera_sub_price"
                      dangerouslySetInnerHTML={{
                        __html: packages[3].short_description,
                      }}
                    />
                  </div>
                  <div className="lft_clm">
                    <div className="sub_card_price_main">
                      <p className="fm_price">From</p>
                      <p className="sub_card_price_100">${packages[3].price}</p>
                    </div>
                    <button
                      className="sub_card_btn_price"
                      onClick={() =>
                        navigate(`/itemCart`, {
                          state: {
                            packageId: packages[3].id,
                            title: packages[3].title,
                            shortDescription: packages[3].short_description,
                          },
                        })
                      }
                    >
                      Choose
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
