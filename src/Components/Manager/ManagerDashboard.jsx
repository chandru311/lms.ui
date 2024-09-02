import React, { useEffect, useState } from "react";
import {
    BsFillBellFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsClipboardCheck,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getApiData } from '../../Common/helpers/axiosHelper';
import Loader from '../../Common/components/Loader';
import "../../index.css";

function ManagerDashboard({ OpenSidebar }) {

    document.title = "Manager Dashboard";
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([
        { title: "Colleagues on Leave", icon: <BsPeopleFill className="card_icon" />, count: 0 },
        { title: "Holiday List", icon: <BsFillBellFill className="card_icon" />, count: null },


        { title: "Leave Requests", icon: <BsFillGrid3X3GapFill className="card_icon" />, count: 0 },
        { title: "My Leave Balance", icon: <BsClipboardCheck className="card_icon" />, count: null },
    ]);
    const [currentView, setCurrentView] = useState("Dashboard");
    const [loading, setLoading] = useState(true);

    const endpoints = {
        'Colleagues on Leave': 'api/Leave/GetAllLeaves',
        'Leave Requests': 'api/Leave/GetLeavesByManager?leaveStatus=1',
    };

    const fetchData = async () => {
        try {
            for (const [key, endpoint] of Object.entries(endpoints)) {
                const response = await getApiData(endpoint);
                if (response?.success) {
                    const count = response.data.length;
                    updateCardCount(key, count);
                } else {
                    console.error(`Failed to fetch data for: ${key}. Response was not successful.`, response);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCardCount = (title, count) => {
        setCardData(prevData =>
            prevData.map(card => (card.title === title ? { ...card, count } : card))
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    //const handleCardClick = (title) => {
    //    if (title === "Holiday List") {
    //        setCurrentView("HolidayList");
    //    } else if (title === "My Leave Balance") {
    //        setCurrentView("LeaveBalance");
    //    }
    //};

    const handleCardClick = (title) => {
        switch (title) {
            case "Holiday List":
                navigate("/holiday-list");
                break;
            case "Leave Requests":
                break;
            case "My Leave Balance":
                navigate("/leave-balance");
                break;
            default:
                break;
        }
    };

    if (loading) {
        return <Loader />;
    }

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
                                {card.count !== null && <h1>{card.count}</h1>}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {/* Add corresponding views if needed */}
        </main>
    );
}

export default ManagerDashboard;



