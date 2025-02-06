import React, { useState } from 'react';
function QandA() {
  // Sample data for questions and answers
  const qaData = [
    {
      question: "What is LinkedIn optimization and why should I consider it?",
      answer: "LinkedIn optimization is all about enhancing your LinkedIn profile to ensure that your best skills and professional achievements are visible to recruiters online. LinkedIn is a powerful job-searching tool that will help you with networking, job hunting, and broadcasting your professional brand."
    },
    {
      question: "Do I need to have an existing LinkedIn account?",
      answer: "Yes, you do. If you don’t currently have a LinkedIn account, our expert writers can guide you through the process of creating one from scratch."
    },
    { question: "How do you optimize a LinkedIn profile?", answer: "We will evaluate your current LinkedIn profile and optimize it by updating and rewriting certain elements of the profile to align with your career goals. We also ensure that your LinkedIn profile contains the right keywords for your target position to maximize your online visibility to potential employers." },
    { question: "Do you offer LinkedIn optimization services for different industries?", answer: "Yes, we do. Our LinkedIn optimization services come at different levels and cater to the job searching needs of clients from the entry-level to the C-suite. We also customize our approach to suit the varying demands of different industries and professions." },
    { question: "How long does it take for me to benefit from LinkedIn optimization?", answer: "While we can’t guarantee a timeframe, many of our clients observe increased profile views and connection requests once their LinkedIn profiles have been optimized." },
  ];
  const qaData2 = [
    { question2: "Do I get a chance to provide feedback?", answer2: "Of course, you do. Our LinkedIn optimization process is interactive. Once you receive the initial draft of your optimized LinkedIn profile, you can request unlimited modifications till you are fully satisfied with the product." },
    { question2: "Will LinkedIn optimization help me attract more job opportunities?", answer2: "Certainly. A well-polished LinkedIn profile will ensure that you come up in online searches and therefore more visible to hiring managers. Many professionals get hired through the LinkedIn platform in the modern job world." },
    { question2: "How will you update my LinkedIn profile?", answer2: "We will use your new resume to get the material for creating your LinkedIn profile. You will receive brand-new content for each section of your LinkedIn profile from our writers. We will ensure that your latest experiences, skills, and qualifications enter your LinkedIn profile" },
    { question2: "How do you maintain confidentiality through the optimization process?", answer2: "We understand that confidentiality is of the highest priority to you. We ensure that your personal and professional information stays secure and well-guarded within our servers. We will handle your LinkedIn profile with the utmost discretion." },
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
