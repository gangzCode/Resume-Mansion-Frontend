import React, { useState, useEffect } from "react";
import "./Q&A.css";
import { getFrequentlyAskedQuestions } from "../../../../Services/apiCalls";

function QandA() {
  const [faqs, setFaqs] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);
  
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFrequentlyAskedQuestions();
        setFaqs(response.data);
        setShowAnswers(Array(response.data.length).fill(false)); // Initialize visibility state
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  // Split FAQs into two columns
  const splitFAQs = (faqs) => {
    const middleIndex = Math.ceil(faqs.length / 2);
    return [faqs.slice(0, middleIndex), faqs.slice(middleIndex)];
  };

  const [column1, column2] = splitFAQs(faqs);

  // Toggle visibility of answers
  const handleToggleAnswer = (index) => {
    const updatedAnswers = [...showAnswers];
    updatedAnswers[index] = !updatedAnswers[index];
    setShowAnswers(updatedAnswers);
  };

  return (
    <div className="continer_main_box">
      <div className="container">
        <div className="card_main">
          <h1 className="aq_topic">See Common Questions and Answers</h1>
          <div className="question_card_main">
            <div className="question_card_main_sub">
              {column1.map((qa, index) => (
                <div
                  className="questuin_card"
                  onClick={() => handleToggleAnswer(index)}
                  key={qa.id}
                >
                  <div className="question_card_hed">
                    <p className="question">{qa.question}</p>
                    <div>
                      {showAnswers[index] ? (
                        <span className="question_close_btn">-</span>
                      ) : (
                        <span className="question_span_btn">+</span>
                      )}
                    </div>
                  </div>
                  <p className={`answers ${showAnswers[index] ? "show" : ""}`}>
                    {qa.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="question_card_main_sub">
              {column2.map((qa, index) => (
                <div
                  className="questuin_card"
                  onClick={() =>
                    handleToggleAnswer(index + column1.length)
                  }
                  key={qa.id}
                >
                  <div className="question_card_hed">
                    <p className="question">{qa.question}</p>
                    <div>
                      {showAnswers[index + column1.length] ? (
                        <span className="question_close_btn">-</span>
                      ) : (
                        <span className="question_span_btn">+</span>
                      )}
                    </div>
                  </div>
                  <p
                    className={`answers ${
                      showAnswers[index + column1.length] ? "show" : ""
                    }`}
                  >
                    {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QandA;
