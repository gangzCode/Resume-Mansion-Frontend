import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import "./MainFaq.css";
import { CiSearch } from "react-icons/ci";
import { getFrequentlyAskedQuestions } from "../../../../Services/apiCalls";

function MainFaq() {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]); // State for filtered FAQs
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showAnswer, setShowAnswers] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFrequentlyAskedQuestions();
        setFaqs(response.data);
        setFilteredFaqs(response.data); // Initially, filtered FAQs are the same as all FAQs
        setShowAnswers(Array(response.data.length).fill(false)); // Initialize visibility state
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  // Filter FAQs based on search term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(value) ||
        faq.answer.toLowerCase().includes(value)
    );
    setFilteredFaqs(filtered);
  };

  // Toggle visibility of answers
  const handleToggleAnswer = (index) => {
    const updatedAnswers = [...showAnswer];
    updatedAnswers[index] = !updatedAnswers[index];
    setShowAnswers(updatedAnswers);
  };

  return (
    <div className="card_main_faq">
      <div className="card_main main_part_pdin_fqa">
        <p className="faq_main_topi">Frequently Asked Questions</p>
        <p className="faq_main_pera">
          Everything you need to know about the product and billing.
        </p>
        <div className="career_side_section_one">
          <div className="career_side_search_bar_main">
            <CiSearch className="career_side_search_icon" />
            <input
              type="text"
              className="career_side_search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="question_card_main_faq">
          {filteredFaqs.map((faq, index) => (
            <div className="questuin_card_faq" key={index}>
              <div
                className="question_card_hed"
                onClick={() => handleToggleAnswer(index)}
              >
                <p className="question">{faq.question}</p>
                <div>
                  {showAnswer[index] ? (
                    <div className="question_close_btn">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_229_26315)">
                          <mask
                            id="mask0_229_26315"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <path
                              d="M24 0H0V24H24V0Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0_229_26315)">
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z"
                              fill="#063B26"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_229_26315">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    <div className="question_span_btn">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_229_26349"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <path
                            d="M24 0H0V24H24V0Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask0_229_26349)">
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                            fill="#063B26"
                          />
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p
                className={`answers ${
                  showAnswer[index] ? "show" : ""
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainFaq;