import React from 'react'
import './jobsearch.css'
function JobSearch({ JobSearchTopic, JobSearchsubTopic1, JobSearchsubPera1, JobSearchsubTopic2, JobSearchsubPera2, JobSearchsubTopic3, JobSearchsubPera3 }) {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='jobsearch_continer_main'>
                    <div className='jobsearch_continer'>
                        <p className='jobsearch_continer_topic'> { JobSearchTopic} </p>
                        <div className='jobsearch_continer_cardset'>
                            <div className='jobsearch_continer_card'>
                                <p className='jobsearch_continer_card_topic'>{JobSearchsubTopic1}</p>
                                <p className='jobsearch_continer_card_pera'>{JobSearchsubPera1}</p>
                            </div>
                        </div>
                        <div className='jobsearch_continer_cardset'>
                            <div className='jobsearch_continer_card'>
                                <p className='jobsearch_continer_card_topic'>{JobSearchsubTopic2}</p>
                                <p className='jobsearch_continer_card_pera'>{JobSearchsubPera2}</p>
                            </div>
                        </div>
                        <div className='jobsearch_continer_cardset'>
                            <div className='jobsearch_continer_card'>
                                <p className='jobsearch_continer_card_topic'>{JobSearchsubTopic3}</p>
                                <p className='jobsearch_continer_card_pera'>{JobSearchsubPera3}</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default JobSearch
