/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="about-us-container">
      <h1>About Shoppy Globe</h1>
      <p>
        Welcome to Shoppy Globe, your number one source for all things fashion,
        electronics, and lifestyle. We're dedicated to providing you the very
        best products, with a focus on quality, customer service, and
        uniqueness.
      </p>
      <p>
        Founded in 2024, Shoppy Globe has come a long way from its beginnings.
        When we first started, our passion for bringing affordable and stylish
        products to the globe drove us to start our own business.
      </p>
      <p>
        We hope you enjoy our products as much as we enjoy offering them to you.
        If you have any questions or comments, please don't hesitate to contact
        us.
      </p>
      <h2>Our Mission</h2>
      <p>
        At Shoppy Globe, our mission is to simplify online shopping by providing
        a seamless and personalized shopping experience.
      </p>

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default AboutUs;
