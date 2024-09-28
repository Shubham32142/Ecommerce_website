/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function ContactUs() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>
        Have any questions? We're here to help. Get in touch with us via the
        form below or through one of our contact methods.
      </p>
      <form className="contact-form">
        <label>
          Name:
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Your email" required />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            required
          ></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h2>Our Office</h2>
        <p>Shoppy Globe Inc.</p>
        <p>123 Global Road,</p>
        <p>City, Country</p>
        <p>Email: support@shoppyglobe.com</p>
        <p>Phone: +123-456-7890</p>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default ContactUs;
