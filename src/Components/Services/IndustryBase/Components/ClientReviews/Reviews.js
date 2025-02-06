import React, { useState } from 'react';


function Reviews({ ReviewTopic, Reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Reviews.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const { text, owner } = Reviews[currentIndex];

  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className="star_continer">
          <div className='revie_topic_con'>
            <p className="client_name">{ReviewTopic}</p>
            <p className="sub_review">
              We pride ourselves in Resume Writing Services as we know we’re very good at it. Still, there’s nothing more
              reassuring than the feedback we get from thousands of our customers worldwide. Elevating Careers with
              Professional Resume Writing Services.
            </p>
          </div>
          <div className="slider">
            <div className="arrow left retimearrow" onClick={handlePrev}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="#051D14" />
                <mask id="mask0_327_16262" maskUnits="userSpaceOnUse" x="5" y="5" width="30" height="30">
                  <path d="M5 35H35V5H5V35Z" fill="white" />
                </mask>
                <g mask="url(#mask0_327_16262)">
                  <path d="M16.25 28.75L18.0125 26.9875L12.2875 21.25H32.5V18.75H12.2875L18.025 13.0125L16.25 11.25L7.5 20L16.25 28.75Z" fill="white" />
                </g>
              </svg>
            </div>
            <div className='revicon'>
              <p className="reviv_pera">{text}</p>
              <div className='sub_flx'>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">
                      <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_709_654)">
                          <path d="M15.8614 2.57599C16.1346 1.91896 17.0654 1.91896 17.3387 2.57599L20.6444 10.524C20.7596 10.8009 21.0201 10.9902 21.3191 11.0142L29.8996 11.7021C30.609 11.7589 30.8966 12.6441 30.3562 13.1071L23.8187 18.7071C23.5909 18.9022 23.4914 19.2085 23.561 19.5003L25.5583 27.8734C25.7234 28.5656 24.9704 29.1126 24.3631 28.7417L17.017 24.2548C16.761 24.0984 16.439 24.0984 16.183 24.2548L8.83691 28.7417C8.22963 29.1126 7.47663 28.5656 7.64174 27.8734L9.63903 19.5003C9.70864 19.2085 9.60914 18.9022 9.38131 18.7071L2.84388 13.1071C2.30345 12.6441 2.59107 11.7589 3.30039 11.7021L11.8809 11.0142C12.1799 10.9902 12.4404 10.8009 12.5556 10.524L15.8614 2.57599Z" fill="#063B26" />
                        </g>
                        <defs>
                          <clipPath id="clip0_709_654">
                            <rect width="32" height="32" fill="white" transform="translate(0.600014)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  ))}
                </div>
                <p className="owner_rate">{owner}</p>
              </div>
              <div className="dots">
                {Reviews.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                  ></span>
                ))}
              </div>

              <div className='arroset_res'>
                <div className="arrow_re" onClick={handlePrev}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#051D14" />
                    <mask id="mask0_327_16262" maskUnits="userSpaceOnUse" x="5" y="5" width="30" height="30">
                      <path d="M5 35H35V5H5V35Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_327_16262)">
                      <path d="M16.25 28.75L18.0125 26.9875L12.2875 21.25H32.5V18.75H12.2875L18.025 13.0125L16.25 11.25L7.5 20L16.25 28.75Z" fill="white" />
                    </g>
                  </svg>
                </div>
                <div className="arrow_re" onClick={handleNext} >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" transform="matrix(-1 0 0 1 40 0)" fill="#051D14" />
                    <mask id="mask0_327_16234" maskUnits="userSpaceOnUse" x="5" y="5" width="30" height="30">
                      <path d="M35 35H5V5H35V35Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_327_16234)">
                      <path d="M23.75 28.75L21.9875 26.9875L27.7125 21.25H7.5V18.75H27.7125L21.975 13.0125L23.75 11.25L32.5 20L23.75 28.75Z" fill="white" />
                    </g>
                  </svg>

                </div>
              </div>
            </div>
            <div className="arrow right retimearrow" onClick={handleNext} >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" transform="matrix(-1 0 0 1 40 0)" fill="#051D14" />
                <mask id="mask0_327_16234" maskUnits="userSpaceOnUse" x="5" y="5" width="30" height="30">
                  <path d="M35 35H5V5H35V35Z" fill="white" />
                </mask>
                <g mask="url(#mask0_327_16234)">
                  <path d="M23.75 28.75L21.9875 26.9875L27.7125 21.25H7.5V18.75H27.7125L21.975 13.0125L23.75 11.25L32.5 20L23.75 28.75Z" fill="white" />
                </g>
              </svg>

            </div>

          </div>

        </div>
      </div>
    </div>

  );
}

export default Reviews;
