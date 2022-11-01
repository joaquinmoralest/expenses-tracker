import { formatAmount } from '../../utils'
import './ListItem.css'

function ListItem({key, amount, concept, date}) {
  return(
    <div className='resume-item' key={key}>
      <div className='resume-amount'>
        <p>{formatAmount(amount)}</p>
      </div>
      <div className='resume-concept'>
        <p>{concept}</p>
      </div>
      <div className='resume-date'>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default ListItem