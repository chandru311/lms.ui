const SelectStyle = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.selectProps.invalid
      ? "red" // Red border if there's an error
      : state.isFocused
      ? "#7194f5" // Blue border if focused
      : provided.borderColor, // Default border color if neither error nor focused
    boxShadow: state.selectProps.invalid
      ? " #f17676" // Red shadow if there's an error
      : state.isFocused
      ? "0 0 0 3px #91befa" // Blue shadow if focused
      : "none", // No shadow otherwise
    "&:hover": {
      borderColor: state.selectProps.invalid
        ? "red" // Red border on hover if there's an error
        : state.isFocused
        ? "#7194f5" // Blue border on hover if focused
        : provided.borderColor, // Default border color on hover
      boxShadow: state.selectProps.invalid
        ? "0 0 0 3px #f3b1b1" // Red shadow on hover if there's an error
        : state.isFocused
        ? "0 0 0 3px #91befa" // Blue shadow on hover if focused
        : "none", // No shadow on hover otherwise
    },
  }),
};

export default SelectStyle;
