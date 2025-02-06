import React, { useState } from "react";
import { submitContactForm } from "../../../../Services/apiCalls";
import Snackbar from '@mui/material/Snackbar'; 

function ContactUsFrom() {
    const [formData, setFormData] = useState({
        name: "", 
        email: "",
        subject: "",
        body: "",
        verifyCode:""
      });
    
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
      const [loading, setLoading] = useState(false);
      const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.body === '' || formData.email === '' || formData.name === '') {
          setError("Please enter the data for all necessary fields to submit");
          return;
        }
    
        try {
          setLoading(true);
          setError(null);
          const hardcodedVerifyCode = "123456";
          const response = await submitContactForm(
            formData.name, 
            formData.email, 
            formData.body, 
            formData.subject,
            hardcodedVerifyCode
          );
          setSuccess("Form submitted successfully!");
          setFormData({ name: "", email: "", body: "", subject:"" });
          setOpenSnackbar(true); 
          console.log("Form submitted successfully:", response);
        } catch (err) {
          setError(err.message || "Form submission failed");
          console.error("Error submitting form:", err);
        } finally {
          setLoading(false);
        }
      };
    
      const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close the success snackbar
      };

    return (
        <div>
            <div className='continer_main_box'>
                <div className='container'>
                    <div className='card_main'>
                        <div className='main_contact_home_section'>
                            <div className='colum_contact_home bk_contact_right'>
                                <div className='dataset_pera_conact'>
                                    <p className='contact_pera'>After having my resume polished by Resume Mansion, I landed multiple interviews almost immediately. Their work made a real difference!</p>
                                    <ul className='image_name_cotente'>
                                        <li className=''>Rachel Doe</li>
                                    </ul>
                                    <p className='owner_pera_contact'>Software Engineer</p>
                                </div>
                            </div>
                            <div className='lft_colum'>
                                <div className='topic_lft_contat_continer'>
                                    <p className='fomr_topic_con'>Can’t find the answer you are looking for?</p>
                                    <p className='fome_pera'>Chat with our friendly team to clear up all your doubts promptly.</p>
                                </div>
                                <form className="contact_from" onSubmit={handleSubmit}>
                <label className="contct_from_label">Name</label><br />
                <input
                  className="contact_input"
                  type="text"
                  name="name"
                  required
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                /><br />

                <label className="contct_from_label">Email</label><br />
                <input
                  className="contact_input"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                /><br />

                <label className="contct_from_label">Subject</label><br />
                <input
                  className="contact_input"
                  type="subject"
                  name="subject"
                  required
                  placeholder="Enter Your Subject"
                  value={formData.subject}
                  onChange={handleChange}
                /><br />

                <label className="contct_from_label">Message</label><br />
                <textarea
                  className="contact_input"
                  type="text"
                  name="body"
                  required
                  placeholder="How we can help you"
                  rows={5}
                  value={formData.body}
                  onChange={handleChange}
                /><br />

                <button className="sub_btn_from" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsFrom
