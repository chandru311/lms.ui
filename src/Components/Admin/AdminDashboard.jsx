import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsFillBellFill,
    BsBuilding,
    BsList,
} from 'react-icons/bs';
import { getApiData } from '../../Common/helpers/axiosHelper';
import '../../index.css';

function AdminDashboard() {
    const [cardData, setCardData] = useState([
        { title: 'Holiday List', icon: <BsFillBellFill className="card_icon" /> },
        { title: 'Leave Requests', icon: <BsFillGrid3X3GapFill className="card_icon" />, count: '0' },
        { title: 'Leave History', icon: <BsList className="card_icon" /> },
        { title: 'Department', icon: <BsFillArchiveFill className="card_icon" />, count: '0' },
        { title: 'Manager', icon: <BsBuilding className="card_icon" />, count: '0/0' },
        { title: 'All Employees', icon: <BsPeopleFill className="card_icon" />, count: '0/0' },
    ]);

    const navigate = useNavigate();

    const endpoints = {
        Manager: 'api/Manager/GetAllManagers',
        'All Employees': 'api/Employee/GetAllEmployees',
        Department: 'api/Departments/GetAllDepartments',
        'Leave Requests': 'api/Leave/GetAllLeaves',
    };

    const fetchData = async () => {
        for (const [key, endpoint] of Object.entries(endpoints)) {
            try {
                const response = await getApiData(endpoint);
                if (response?.success) {
                    if (key === 'Leave Requests') {
                        const pendingLeaves = response.data.filter(leave => leave.status === 0).length;
                        updateCardCount('Leave Requests', pendingLeaves);
                    } else {
                        const totalCount = response.data.length;
                        const activeCount = (key === 'Manager' || key === 'All Employees')
                            ? response.data.filter(item => item.active).length
                            : totalCount;
                        const countText = (key === 'Manager' || key === 'All Employees')
                            ? `${activeCount}/${totalCount}`
                            : totalCount;
                        updateCardCount(key, countText);
                    }
                } else {
                    console.error(`Failed to fetch data for: ${key}. Response was not successful.`, response);
                }
            } catch (error) {
                console.error(`Error fetching data for: ${key} from endpoint: ${endpoint}`, error);
            }
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

    const handleCardClick = (title) => {
        switch (title) {
            case 'Holiday List':
                navigate('/holiday-list');
                break;
            case 'Leave Requests':

                break;
            case 'Leave History':
                navigate('/leave-history');
                break;
            default:
                break;
        }
    };

    return (
        <main className="main-container">
            <div className="main-title">
                <h3>Welcome Back, Admin!</h3>
            </div>
            <div className="main-cards">
                {cardData.map((card, index) => (
                    <div
                        className="card1"
                        key={index}
                        onClick={() => handleCardClick(card.title)}
                    >
                        {(card.title === 'Manager' || card.title === 'All Employees') && (
                            <div
                                className={`status-indicator ${parseInt(card.count.split('/')[0]) === 0
                                    ? 'offline'
                                    : 'online'
                                    }`}
                            ></div>
                        )}
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

export default AdminDashboard;
