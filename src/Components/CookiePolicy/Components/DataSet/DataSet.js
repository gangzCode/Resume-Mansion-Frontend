import React, { useState } from 'react';
import './dataset.css'

function DataSet() {
    const [copied, setCopied] = useState(false);
    const email = 'contact@resumemansion.com';

    const handleCopy = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
        });
    };
    return (
        <div>
            <div className='card_main'>
                <div className='dataset_main_continer'>
                    <p className='data_set_pera'>At Resume Mansion, we are committed to providing a transparent and secure user experience. This Cookie Policy explains what cookies are, how we use them, and your rights regarding their use when you visit  Best Resume Writing Services in USA, Expert Resume Writers (the “Website”). </p>


                    <p className='data_set_topic'>What Are Cookies?</p>
                    <p className='data_set_pera'>Cookies are small text files placed on your device (computer, tablet, or smartphone) when you visit a website. They help websites function efficiently, enhance user experience, and provide valuable insights into user interactions. Cookies may store information such as your preferences, login details, and browsing activity.</p>



                    <p className='data_set_topic'>Types of Cookies We Use</p>
                    <p className='data_set_pera'><b>a. Essential Cookies</b></p>
                    <p className='data_set_pera'>These cookies are necessary for the Website to function properly. They enable core functionality, such as security, network management, and accessibility. Without these cookies, services like payment processing and account login cannot function.</p>
                    <p className='data_set_pera'><b>b. Analytical/Performance Cookies</b></p>

                    <p className='data_set_pera'>These cookies collect anonymous data about how visitors use our Website. We use this information to analyze site performance, monitor traffic, and improve our services. For example, we track which pages are most frequently visited.</p>


                    <p className='data_set_pera'><b>c. Functional Cookies</b></p>

                    <p className='data_set_pera'>These cookies allow us to remember your preferences and customize your experience on the Website. For instance, they enable language selection and saved login details.</p>


                    <p className='data_set_pera'><b>d. Targeting/Advertising Cookies</b></p>
                    <p className='data_set_pera'>
                        These cookies track your browsing activity to deliver personalized advertisements relevant to your interests. They may be set by us or third-party advertising partners. These cookies also measure the effectiveness of advertising campaigns.
                    </p>
                    <p className='data_set_pera'><b>e. Payment Processing Cookies</b></p>
                    <p className='data_set_pera'>As we use Stripe for payment processing, Stripe may place cookies to facilitate secure transactions. For more details, refer to Stripe's Privacy Policy.</p>

                    <p className='data_set_topic'>We use cookies to</p>
                    <p className='data_set_pera'>
                        •	Ensure the smooth functioning of the Website.<br />
                        •	Enhance your browsing experience by remembering your preferences.<br />
                        •	Analyze user behavior to improve our services and Website content.<br />
                        •	Deliver relevant advertisements tailored to your interests.<br />
                        •	Facilitate secure payment processing through Stripe.
                    </p>

                    <p className='data_set_topic'>Third-Party Cookies</p>

                    <p className='data_set_pera'>Our Website integrates with third-party services, including:</p>
                    <p className='data_set_pera'><b>•	Stripe: </b> Used for secure payment processing. Stripe may set cookies to detect fraud and ensure secure transactions.</p>
                    <p className='data_set_pera'><b>•	Google Analytics: </b> For analyzing Website traffic and user behavior. Google’s privacy practices are outlined in their Privacy Policy.</p>
                    <p className='data_set_pera'><b>•	Advertising Platforms: </b> We may partner with platforms like Google Ads or Facebook Ads to display targeted advertisements</p>
                    <p className='data_set_pera'> <p className='data_set_pera'>Our Website integrates with third-party services, including:</p></p>

                    <p className='data_set_topic'>Your Consent</p>
                    <p className='data_set_pera'>When you first visit our Website, you will see a cookie banner requesting your consent for non-essential cookies. By clicking “Accept All,” you consent to the use of all cookies described in this policy. You can manage your cookie preferences by clicking “Customize Preferences” or by adjusting your browser settings.</p>

                    <p className='data_set_topic'>How to Manage Cookies</p>

                    <p className='data_set_pera'>You can control and manage cookies through your browser settings. Here’s how you can do it on popular browsers:</p>
                    <p className='data_set_pera'>
                        <b> •	Google Chrome: </b><span className='cuser_new_manage' onClick={() => window.open('', '_blank')}
                        >Manage Cookies</span><br />
                        <b>  •	Firefox: </b><span className='cuser_new_manage'onClick={() => window.open('https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US', '_blank')}>Manage Cookies</span><br />
                        <b>  •	Safari:</b> <span className='cuser_new_manage' onClick={() => window.open('https://support.apple.com/en-us/105082', '_blank')}>Manage Cookies</span><br />
                        <b>  •	Microsoft Edge: </b><span className='cuser_new_manage' onClick={() => window.open('https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09', '_blank')}>Manage Cookies</span><br />
                    </p>
                    <p className='data_set_pera'>You can also opt out of targeted advertising through services like the Digital Advertising Alliance or Your Online Choices.</p>


                    <p className='data_set_topic'>Your Rights</p>
                    <p className='data_set_pera'>As a user, you have the following rights under applicable laws such as the GDPR and CCPA:</p>
                    <p className='data_set_pera'>
                        <b>•	Right to Access: </b>You can request access to the data collected through cookies.<br />
                        <b>•	Right to Erasure: </b>You can request that we delete cookies associated with your personal data.<br />
                        <b>•	Right to Opt-Out: </b>You can opt out of targeted advertising or restrict cookies through browser settings.<br />
                    </p>

                    <p className='data_set_pera'>For users in the European Union, please refer to the GDPR. For California residents, more information about your rights is available under the CCPA.</p>
                    <p className='data_set_topic'>Changes to This Policy</p>
                    <p className='data_set_pera'>We reserve the right to update this Cookie Policy at any time. Changes will be posted on this page, and the “Last Updated” date will be revised. Continued use of the Website constitutes acceptance of any changes.</p>
                    <p className='data_set_topic'>Contact Us</p>
                    <p className='data_set_pera'>If you have questions about this Cookie Policy or how we use cookies, you can contact us at:</p>
                    <p><b>Resume Mansion<br />
                        Email:
                    </b> <span
                        className='mail_chat'
                        onClick={handleCopy}

                    >
                            {email}
                        </span>
                        {copied && <span className='copdmsgmail'>Copied !</span>}</p>
                </div>
            </div>
        </div>
    )
}

export default DataSet
