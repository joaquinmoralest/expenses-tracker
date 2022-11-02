import './Input.css'

function Input({type, name, placeholder, className, onChange, value, required}) {
  return (
    <input 
      className={`input ${className}`} 
      onChange={onChange}
      type={type} 
      name={name}
      placeholder={placeholder}
      value={value}
      required={required ? true : false}
    />
  )
}

export default Input