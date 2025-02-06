import React, { useState } from 'react';
function QandA() {
  // Sample data for questions and answers
  const qaData = [
    { question: "What modes of payment do you accept?", answer: "We primarily accept payments through Visa, Master Card, and AMEX according to your convenience" },
    { question: "What can I do if I forgot to include some details while checking out?", answer: "You can directly communicate the finer details of your order with your resume writer through your Resume Mansion profile page. Or, you can send an email with your details to either info@resumemansion.com or contact@resumemansion.com along with your order number for identification." },
    { question: "Who will write my resume?", answer: "Once your details are submitted to our website, a career expert from our team will go through the information and assign a professional resume writer with expertise in your industry to work on your project." },
    { question: "What do I need to provide to get your services?", answer: "Two key things we require to initiate a resume writing project are your current resume and target job title. If you don’t have a resume currently, you can let your resume writer know, and they will provide you with a questionnaire to get all the details they need to craft your new resume." },

  ];
  const qaData2 = [
    { question2: "Do you write generic resumes or specific resumes?", answer2: "We create both generic resumes and tailored resumes to fit your job search needs." },
    { question2: "In which format will I receive the new resume?", answer2: "You will receive your new resume as an MS Word file and PDF. " },
    { question2: "Which transferable skills are most in demand by employers?", answer2: "The answer to this question changes based on your target industry. However, communication, leadership, problem-solving, teamwork, time management, customer service, and adaptability are some transferable skills preferred across all industries." },
  ];
  // State to handle the visibility of answers
  const [showAnswer, setShowAnswer] = useState(Array(qaData.length).fill(false));
  const [showAnswer2, setShowAnswer2] = useState(Array(qaData2.length).fill(false));
  // Function to toggle answer visibility for a specific card
  const handleToggleAnswer = (index) => {
    const updatedAnswers = [...showAnswer];
    updatedAnswers[index] = !updatedAnswers[index];  // Toggle visibility of the answer for this index
    setShowAnswer(updatedAnswers);
  };
  const handleToggleAnswer2 = (index) => {
    const updatedAnswers2 = [...showAnswer2];
    updatedAnswers2[index] = !updatedAnswers2[index];  // Toggle visibility of the answer for this index
    setShowAnswer2(updatedAnswers2);
  };
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className='card_main'>
          <h1 className='aq_topic'>See Common Question and Answer</h1>
          <div className='question_card_main'>
            <div className='question_card_main_sub'>
              {qaData.map((qa, index) => (

                <div className='questuin_card' onClick={() => handleToggleAnswer(index)} key={index}>
                  <div className='question_card_hed'>
                    <p className='question'>{qa.question}</p>
                    <div>
                      {showAnswer[index] ? (
                        <div className='question_close_btn'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_229_26315)">
                              <mask id="mask0_229_26315" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_229_26315)">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z" fill="#063B26" />
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_229_26315">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                        </div>

                      ) : (
                        <div className='question_span_btn'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_229_26349" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_229_26349)">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#063B26" />
                            </g>
                          </svg>

                        </div>
                      )}
                    </div>
                  </div>
                  <p className={`answers ${showAnswer[index] ? 'show' : ''}`}>
                    {qa.answer}
                  </p>
                </div>

              ))}
            </div>
            <div className='question_card_main_sub'>
              {qaData2.map((qa2, index) => (
           
                  <div className='questuin_card' onClick={() => handleToggleAnswer2(index)} key={index}>
                    <div className='question_card_hed'>
                      <p className='question'>{qa2.question2}</p>
                      <div>
                        {showAnswer2[index] ? (
                          <div className='question_close_btn'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_229_26315)">
                                <mask id="mask0_229_26315" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                  <path d="M24 0H0V24H24V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_229_26315)">
                                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z" fill="#063B26" />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_229_26315">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </div>

                        ) : (
                          <div className='question_span_btn'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_229_26349" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_229_26349)">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#063B26" />
                              </g>
                            </svg>

                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`answers ${showAnswer2[index] ? 'show' : ''}`}>
                      {qa2.answer2}
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
