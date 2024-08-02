import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsFillBellFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsClipboardCheck,
} from 'react-icons/bs';
import { getApiData } from '../../Common/helpers/axiosHelper';
import '../../index.css';

function ManagerDashboard() {
    const [cardData, setCardData] = useState([
        { title: 'Colleagues on Leave', icon: <BsPeopleFill className="card_icon" />, count: '0' },
        { title: 'Holiday List', icon: <BsFillBellFill className="card_icon" /> },


        { title: 'My Leave Balance', icon: <BsClipboardCheck className="card_icon" /> },
        { title: 'Open Leave Requests', icon: <BsFillGrid3X3GapFill className="card_icon" />, count: '0' },


    ]);

    const navigate = useNavigate();

    const fetchLeaveData = async () => {
        try {
            const response = await getApiData('api/Leave/GetAllLeaves');
            if (response?.success) {
                const leaveData = response.data;


                const totalLeaves = leaveData.length;


                const openLeaveRequests = leaveData.filter(leave => leave.status === 0).length;

                setCardData(prevData =>
                    prevData.map(card => {
                        switch (card.title) {
                            case 'Open Leave Requests':
                                return { ...card, count: openLeaveRequests };
                            case 'Colleagues on Leave':
                                return { ...card, count: totalLeaves };
                            default:
                                return card;
                        }
                    })
                );
            } else {
                console.error('Failed to fetch data. Response was not successful.', response);
            }
        } catch (error) {
            console.error('Error fetching data from endpoint: api/Leave/GetAllLeaves', error);
        }
    };

    useEffect(() => {
        fetchLeaveData();
    }, []);

    const handleCardClick = (title) => {
        switch (title) {
            case 'Holiday List':
                navigate('/holiday-list');
                break;


            default:
                break;
        }
    };

    return (
        <main className="main-container">
            <div className="main-title">
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
        </main>
    );
}

export default ManagerDashboard;
