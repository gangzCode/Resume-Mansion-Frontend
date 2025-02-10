import { useState, useRef, useEffect } from "react";
import "./footer.css";
import Logo from "./Logo/logo.png";
import { FiUploadCloud } from "react-icons/fi";
import { TbBrandLinkedin } from "react-icons/tb";
import { TbBrandFacebook } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import "./SubmitAlert.css";
import { TbBrandYoutube } from "react-icons/tb";
import { uploadCV } from "../../Services/apiCalls";

function Footer() {
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (file) => {
    console.log("file", file);

    if (file && file.type === "application/pdf") {
      console.log(file);

      setSelectedFile(file);
      setShowForm(true);
      setError("");
    } else {
      alert("Only PDF files can be previewed.");
    }
  };

  useEffect(() => {
    let timeoutId;

    if (showSuccess) {
      timeoutId = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showSuccess]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const onClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setEmail("");
    setSelectedFile(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!email || !selectedFile) {
      setError("Please provide both email and file");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await uploadCV(selectedFile, email);

      if (response.http_status === 200) {
        setShowForm(false);
        setShowSuccess(true);
        setEmail("");
        setSelectedFile(null);
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error(response.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Something went wrong with the upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="continer_main_box">
        <div>
          <div className="main_row_footer_container">
            <div className="main_row_footer">
              <div className="colum_footer_main_rwo">
                <h3 className="foter_topic">
                  Get a Free Resume Review to Boost Your Career!
                </h3>
                <p className="foter_sub_topic">
                  Upload your resume to our website and a certified professional
                  resume writer from our team will get back to you within 24
                  hours with a full resume critique.
                </p>
              </div>
              <div
                className="colum_footer_main_rwo_two"
                onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
                onDrop={handleDrop}
              >
                <>
                  <FiUploadCloud
                    className="icon_uplode"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <p className="content_uplode">
                    <span
                      className="btn_uplode"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="content_uplode">
                    .doc, .docx, .pdf, .jpg, .png
                  </p>
                </>
                {/* Hidden file input element */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }} // hide the input element
                  accept=".doc,.docx,.pdf,.jpg,.png"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="footer_second_main">
          <div className="continer_main_box">
            <div className="container">
              <div className="footeer_second_colum">
                <div className="first_box_colum_footer">
                  <div className="footer_left_box_sub">
                    <img src={Logo} alt="logo" className="footer_logo" />
                    <p className="sub_name_logo_footer">
                      It’s a Resume Exploit
                    </p>
                  </div>
                  <div className="footer_soshel">
                    <TbBrandLinkedin className="soshel_icon_footer" />
                    <TbBrandFacebook className="soshel_icon_footer" />
                    <BsTwitterX className="soshel_icon_footer" />
                    <TbBrandYoutube className="soshel_icon_footer" />
                  </div>
                </div>
                <div className="footer_right_box">
                  <div className="footer_box">
                    <p className="footer_head">Services</p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/resumeWriting")}
                    >
                      Resume Writing
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/coverLetter")}
                    >
                      Cover letter Writing
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/careerAdvice")}
                    >
                      Career Advice
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() =>
                        (window.location.href = "/linkedInOptimization")
                      }
                    >
                      LinkedIn optimization
                    </p>
                  </div>
                  <div className="footer_box">
                    <p className="footer_head">About</p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/about")}
                    >
                      Our Company
                    </p>
                    <p className="footer_nav_item">Our Process</p>
                    <p className="footer_nav_item">Careers</p>
                    <p className="footer_nav_item">Affiliates</p>
                  </div>
                  <div className="footer_box">
                    <p className="footer_head">Support</p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/fAQ")}
                    >
                      FAQ
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/contactUs")}
                    >
                      Contact Us
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/privacyPolicy")}
                    >
                      Privacy Policy
                    </p>
                    <p
                      className="footer_nav_item"
                      onClick={() => (window.location.href = "/cookiePolicy")}
                    >
                      Cookie Policy
                    </p>
                  </div>
                </div>
              </div>
              <p className="Copyright">
                Develop By{" "}
                <span
                  className="comname_our"
                  onClick={() =>
                    window.open("https://snaptechai.com/", "_blank")
                  }
                >
                  SnapTech AI
                </span>{" "}
                Copyright 2010-2024 © Resume Mansion. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="alert_continer">
          <div className="alert_footer_box">
            <div className="cookis_box_one">
              <div className="alert_box_topic">
                <p className="cookis_topic">Almost There!</p>
                <div className="svg_icon_alertt" onClick={onClose}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_870_15865)">
                      <path
                        d="M24 8L8 24"
                        stroke="black"
                        stroke-width="2.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 8L24 24"
                        stroke="black"
                        stroke-width="2.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_870_15865">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <p className="cookis_pera">
                Please provide your email address so we can send you a detailed
                review of your resume. Get expert insights delivered right to
                your inbox!
              </p>
            </div>
            <div className="div_input_part">
              <label className="from_label_login">Email</label>
              <input
                type="email"
                className="alert_input_field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="error_message">{error}</p>}
            </div>
            <div className="alert_box_two">
              <button
                className="alert_box_two_btn_one"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="alert_box_two_btn_two"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send My Review"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="success_popup">
          <div className="success_content">
            <div className="success_message_container">
              <div className="success_icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#0D5438" />
                  <path
                    d="M8 16L13.3333 21.3333L24 10.6667"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="success_message">
                <h4>Upload Successful!</h4>
                <p>We'll send the review to your email.</p>
              </div>
            </div>
            <button
              className="success_close_btn"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
