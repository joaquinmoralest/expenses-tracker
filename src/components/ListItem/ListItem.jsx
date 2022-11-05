import { formatAmount } from '../../utils/utils'
import './ListItem.css'

function ListItem({amount, concept, date}) {
  return(
    <div className='resume-item'>
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