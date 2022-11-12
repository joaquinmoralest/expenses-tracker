import { formatAmount } from '../../utils/utils'
import Button from '../Button/Button'
import './ListItem.css'

function ListItem ({ amount, concept, date, onClick, category }) {
  return (
    <div className='resume-item mb-1'>
      <div className='resume-amount'>
        <p>{formatAmount(amount)}</p>
      </div>
      <div className='resume-concept'>
        <p>{concept}</p>
      </div>
      {
        !category
          ? (
            <div className='resume-date'>
              <p>{date}</p>
            </div>
            )
          : (
            <div className='resume-date'>
              <p>{category}</p>
            </div>
            )
      }
      <Button
        type='delete'
        onClick={onClick}
      />
    </div>
  )
}

export default ListItem
