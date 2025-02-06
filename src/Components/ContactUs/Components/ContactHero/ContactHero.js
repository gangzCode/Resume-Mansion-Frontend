import React, { useState } from 'react';
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
import './contat.css';

function ContactHero() {
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
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/contactUs')}>Contact</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Get in Touch with Resume Mansion</h1>
                    <p className='hero_service_pera'>
                        Have a question for us? Need assistance with your order? Don’t worry! Our helpful team will assist you. Please fill in the form below to contact us and we will respond promptly. Let’s build your memorable job application together!
                        You can reach us anytime via 

                        <span
                            className='mai_conet lf'
                            onClick={handleCopy}

                        >
                                         {email}
                        </span>
                        <p> {copied && <span className='copdmsgmail'>Copied !</span>}</p>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ContactHero;
