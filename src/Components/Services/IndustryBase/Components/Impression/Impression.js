import React from 'react'
function Impression({ImpressionPera,ImpressionTitle}) {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='impression_continer'>
                    <div className='impression_continer_lftcolum_main'>
                        <div className='impression_continer_lftcolum'>

                        </div>
                    </div>
                    <div className='impression_continer_rightcolum'>
                        <p className='impression_continer_rightcolum_topic'>{ImpressionTitle}</p>
                        <p className='impression_continer_rightcolum_pera'>{ImpressionPera}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Impression
