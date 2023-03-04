function Input ({ type, name, placeholder, className, onChange, value, required, disabled }) {
  return (
    <input
      className={`input ${className}`}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      required={!!required}
      disabled={!!disabled}
    />
  )
}

export default Input
