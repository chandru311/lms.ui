import React, { useState } from "react";
import {
  BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsClipboardCheck,
} from "react-icons/bs";
import "../../index.css";
import HolidayList from "../Leave/HolidayList";
import LeaveBalance from "../Leave/LeaveBalance";

function ManagerDashboard({ OpenSidebar }) {
  const [currentView, setCurrentView] = useState("Dashboard");

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

  const handleCardClick = (title) => {
    if (title === "Holiday List") {
      setCurrentView("HolidayList");
    } else if (title === "My Leave Balance") {
      setCurrentView("LeaveBalance");
    }
  };

  return (
    <main className="main-container">
      {currentView === "Dashboard" && (
        <>
          <div className="main-title">
            <div className="menu-icon">
              {/* <MenuIcon className="icon" onClick={OpenSidebar} /> */}
            </div>
            <h3>Welcome Back! Your Daily Summary</h3>
          </div>

          <div className="main-cards">
            {cardData.map((card, index) => (
              <div
                className="card1"
                key={index}
                onClick={() => handleCardClick(card.title)}
              >
                <div className="card-inner">
                  <h3>{card.title}</h3>
                  {card.icon}
                </div>
                <h1>{card.count}</h1>
              </div>
            ))}
          </div>
        </>
      )}
      {currentView === "HolidayList" && <HolidayList />}
      {currentView === "LeaveBalance" && <LeaveBalance />}
    </main>
  );
}

export default ManagerDashboard;
