import React from "react";
import '../../index.css'
import company from "../../assets/company.jpg";
const About = () => {
  return (
    <div className="about" id="about-section">
      <h2>About Our Company</h2>
      <div className="about-container">
        <img src={company} alt="Company Logo" className="about-image" />
        <div className="about-text">
          <h4>AI4Soln - Think bigger, dream bolder with AI by your side</h4>
          <p>
            As an Australia-based IT company with branches in India, we offer
            comprehensive solutions, from IT services ensuring smooth
            infrastructure operation to product development that materializes
            your creative ideas.
          </p>
          <br />
          <p>
            Our team of passionate experts in Australia and India combines
            cutting-edge knowledge with a collaborative approach to guarantee
            your path to success is efficient, secure, and tailored to your
            unique needs. Partner with us and navigate the ever-evolving digital
            landscape with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;