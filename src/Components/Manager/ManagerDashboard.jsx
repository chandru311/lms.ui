import React from "react";
import {
  BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsClipboardCheck,
} from "react-icons/bs";
import "../../index.css";

function ManagerDashboard({ OpenSidebar }) {
  const cardData = [
    {
      title: "Colleagues on Leave",
      icon: <BsPeopleFill className="card_icon" />,
      count: 50,
    },
    {
      title: "Holiday List",
      icon: <BsFillBellFill className="card_icon" />,
      count: 8,
    },
    {
      title: "Leave Requests",
      icon: <BsFillGrid3X3GapFill className="card_icon" />,
      count: 12,
    },
    {
      title: "My Leave Balance",
      icon: <BsClipboardCheck className="card_icon" />,
      count: 15,
    },
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <div className="menu-icon">
          {/* <MenuIcon className="icon" onClick={OpenSidebar} /> */}
        </div>
        <h3>Welcome Back! Your Daily Summary</h3>
      </div>

      <div className="main-cards">
        {cardData.map((card, index) => (
          <div className="card1" key={index}>
            <div className="card-inner">
              <h3>{card.title}</h3>
              {card.icon}
            </div>
            <h1>{card.count}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ManagerDashboard;
