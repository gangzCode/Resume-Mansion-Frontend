import React, { useState } from 'react';
function QandA() {
  // Sample data for questions and answers
  const qaData = [
    { question: "What’s included in the cover letter writing service?", answer: "Resume Mansion’s cover letter writing service entails crafting personalized cover letters to suit the specific job application needs of our clients. When you purchase a cover letter from us, we ensure that it successfully highlights your skills, experiences, and related qualifications for your target job." },
    { question: "Will my cover letter be ATS-friendly?", answer: "Absolutely! At Resume Mansion, we provide our clients with ATS-friendly resumes and cover letters that are guaranteed to make excellent initial impressions on hiring professionals." },
    { question: "Why do I need a professional cover letter?", answer: "A professional cover letter that complements your professional resume will be a valuable asset in your job search. A well-written cover letter will enhance your job application and showcase your unique skill set as well as your enthusiasm for the position." },
    { question: "How do you ensure that my cover letter is personalized?", answer: "Our professional resume writers take the time to understand your career goals, job requirements, and unique skills before crafting your cover letter from scratch. Each cover letter is targeted to the desired position of the candidate." },
    { question: "Can I communicate with the writer who creates my cover letter?", answer: "Yes. Our portal will allow you to communicate directly with the resume writer who is handling your cover letter. This will help you promptly share any additional details you want the writer to know before they craft your cover letter." },
  ];
  const qaData2 = [
    { question2: "What if I am not satisfied with the cover letter?", answer2: "At Resume Mansion, we are passionate about customer satisfaction. That is why we offer you unlimited modifications and revisions to your cover letter. You can collaborate with your resume writer until you are completely satisfied with your new cover letter." },
    { question2: "How long is it until I receive my cover letter?", answer2: "We have very fast turnaround times of 24 hours (for express delivery) and 48 hours (for standard delivery). Once you receive the initial draft, you can request modifications to your cover letter." },
    { question2: "Do you create career change cover letters?", answer2: "Yes, we do. We have resume writers who have experience creating resumes and cover letters specifically for career changers." },
    { question2: "What information do I need to provide to write my cover letter?", answer2: "We will only need your current resume and target job title to get your cover letter started. However, it always helps to have a target job description or specific employer in mind." },
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
