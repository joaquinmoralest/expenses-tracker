import './ProgressBar.css'

function ProgressBar({bgColor, completed}) {
  return(
    <div className='container'>
      <div className={`container ${bgColor}`}>
        <span className='label'>{`${completed}% aprox.`}</span>
      </div>
    </div>
  )
}

export default ProgressBar