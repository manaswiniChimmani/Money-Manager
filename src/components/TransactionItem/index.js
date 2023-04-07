// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }
  return (
    <li className="table-row">
      <p className="trans-text">{title}</p>
      <p className="trans-text">{amount}</p>
      <p className="trans-text">{type}</p>
      <div className="del-container">
        <button
          className="del-btn"
          type="button"
          onClick={onDeleteTransaction}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="del-img"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
