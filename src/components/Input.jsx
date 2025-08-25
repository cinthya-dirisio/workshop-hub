function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className, options, role,
  defaultValue, min, max
}) {
  return (
    <div className="d-flex p-2 justify-content-between">
      {label && <label htmlFor={id} className="form-label ">{label}</label>}
      {type === 'select' ? (
        <select id={id} className={`form-control-sm rounded ${className}`} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={`form-control-sm col-7 rounded ${className}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          role={role}
          defaultValue={defaultValue}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}

export default Input;
