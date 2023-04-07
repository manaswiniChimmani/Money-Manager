import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleIn: '',
    amountIn: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      each => id !== each.id,
    )
    this.setState({transactionsList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleIn, amountIn, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleIn,
      amount: parseInt(amountIn),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleIn: '',
      amountIn: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({titleIn: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountIn: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expensesAmount += each.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state

    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleIn, amountIn, transactionsList, optionId} = this.state
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="container">
            <h1 className="h1">Hi, Richard</h1>
            <p className="p1">
              Welcome back to your
              <span className="text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
            balanceAmount={balanceAmount}
          />
          <div className="transaction-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="tran-heading">Add Transaction</h1>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="TITLE"
                value={titleIn}
                onChange={this.onChangeTitle}
              />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                placeholder="AMOUNT"
                value={amountIn}
                onChange={this.onChangeAmount}
              />
              <label className="input-label" htmlFor="select">
                TYPE
              </label>
              <select
                className="input"
                id="select"
                onChange={this.onChangeOptionId}
                value={optionId}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="tran-heading">History</h1>
              <div className="transactions-table">
                <ul className="tran-table">
                  <li className="table-heading">
                    <p className="table-cell">Title</p>
                    <p className="table-cell">Amount</p>
                    <p className="table-cell">Type</p>
                  </li>
                  {transactionsList.map(each => (
                    <TransactionItem
                      key={each.id}
                      transactionDetails={each}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
