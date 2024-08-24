const Select = ({ values, className, onChange }) => {
  return (
    <select className={className} onChange={onChange}>
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
