
function Button ({ type, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        type === 'add'
          ? 'btn-add'
          : type === 'delete'
            ? 'btn-delete'
            : type === 'edit' && 'btn-edit'
      }
    >
      <span className='material-symbols-outlined'>
        {type}
      </span>
    </button>
  )
}

export default Button
