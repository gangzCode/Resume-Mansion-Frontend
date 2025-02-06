import React, { useState } from 'react';
function QandA() {
  // Sample data for questions and answers
  const qaData = [
    { question: "Why should I use a professional resume writing service?", answer: "A professional resume writing service can help you significantly shorten your job search by securing more interviews with tailored documents. Resume writing experts help you stand out with resumes optimized for both bots and hiring managers." },
    { question: "What’s the order process like for your service?", answer: "We have a very straightforward order process. You simply need to submit your current resume and career goals/target job title to our portal. Then, you can share any additional information that will be valuable for your new resume. After that, you will start working with a certified professional resume writer to create a personalized resume." },
    { question: "How do you ensure that I am matched with a resume writer suitable for my target industry?", answer: "Professional Resume Writing Services are offered to you by a carefully selected member of our network of over 100 resume writers who have experience with more than 15 diverse industries. Our clients are carefully reviewed before they are matched with a resume writer from their target industry." },
    { question: "What is your turnaround time for a completed resume?", answer: "We will deliver the first draft of your resume within 24 or 48 hours after you provide us with the necessary information. This time only includes the initial draft. However, you can request unlimited modifications from your resume writer to fine-tune the document to your desires." },
    { question: "What if I am unsatisfied with my resume?", answer: "Resume Mansion provides unlimited modifications to our clients. You can communicate the revisions you want done to the initial resume with your resume writer until you are 100% satisfied." },
  ];
  const qaData2 = [
    { question2: "Do you have experience writing resumes for specific industries and career levels?", answer2: "Yes, our certified professional resume writers come from diverse backgrounds and have experience crafting resumes for different industries, career levels, and positions, including academia, corporate, and specialized fields." },
    { question2: "What kind of a guarantee do you offer with your resume writing service?", answer2: "We have a 60-day guarantee. We will provide a free resume rewrite for you if you don’t receive double the number of interviews with your new resume." },
    { question2: "Do you write federal resumes or academic resumes?", answer2: "We do not currently offer federal resume writing services. However, we have resume writers with years of experience in academia." },
    { question2: "How do I get started on my order?", answer2: "You just have to visit our website and choose the resume writing package that you desire. Then, you can submit your details and start the process." },
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
