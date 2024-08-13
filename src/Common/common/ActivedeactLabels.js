export const ActivedeactLabels = {
  0: { label: "Deactive", color: "danger" },
  1: { label: "Active", color: "success" },
  //   2: {label}
  // 3: { label: 'Declined', color:  },
  // 4: { label: 'User Declined', color: 'danger' },
  5: { label: "Unknown", color: "warning" },
};
export const mapStatusDept = (active) => {
  // return ActivedeactLabels[status] || ActivedeactLabels[5];
  return ActivedeactLabels[active] || ActivedeactLabels[5];
};

// export const mapStatusDept = (status) => {
//   // return ActivedeactLabels[status] || ActivedeactLabels[5];
//   return ActivedeactLabels[status];
// };
