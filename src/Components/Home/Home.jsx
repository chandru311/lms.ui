import React, { useState, useEffect } from "react";
import '../../index.css'
import leave1 from "../../assets/leave-img1.png";
import leave2 from "../../assets/leave-img2.png";
import leave3 from "../../assets/leave-img3.png";
import leave4 from "../../assets/leave-img4.png";
import About from "./About";

const Home = () => {
  const images = [leave1, leave2, leave3, leave4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="home-container" id="home-section">
              <h1 className="head">Leave Management System</h1>

        <img src={images[currentImageIndex]} alt="Slide" className="home-images" />
        <p className="para">
          Our Leave Management System simplifies the process of requesting and
          approving leaves. With an intuitive interface, employees can easily
          apply for leave, and managers can quickly review and approve requests.
        </p>
        <p className="para">
          The system keeps track of leave balances, ensuring transparency and
          accuracy. It helps organizations streamline leave management, reduce
          paperwork, and maintain accurate records effortlessly.
        </p>
      </div>
      <About />
    </>
  );
};

export default Home;