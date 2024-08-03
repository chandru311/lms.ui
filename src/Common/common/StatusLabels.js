export const statusLabels = {
    1: { label: 'Pending', color: 'warning' },
    2: { label: 'Approved', color: 'success' },
    3: { label: 'Declined', color: 'danger' },
    4: { label: 'User Declined', color: 'danger' },
    5: { label: 'Unknown', color: 'secondary' },
};

export const mapStatus = (status) => {
    return statusLabels[status] || statusLabels[5];
};
