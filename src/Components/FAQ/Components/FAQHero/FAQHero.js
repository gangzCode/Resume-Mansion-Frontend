import React, { useState } from 'react';
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function FAQHero() {
    const [copied, setCopied] = useState(false);
    const email = 'contact@resumemansion.com';

    const handleCopy = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
        });
    };
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/fAQ')}>FAQ</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>All your Questions, Answered</h1>
                    <p className='hero_service_pera'>Have an inquiry about our services? Here are some of our most frequently asked questions. Feel free to reach us via  <span
                        className='mai_conet'
                        onClick={handleCopy}

                    >
                        {email}
                    </span>
                        <p> {copied && <span className='copdmsgmail'>Copied !</span>}</p>for all your inquiries.</p>
                </div>
            </div>
        </div>
    )
}

export default FAQHero
