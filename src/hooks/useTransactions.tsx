import { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react'
import { Transaction } from '../Components/TransactionsTable'
import { api } from '../services'

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionContext = {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}


const TransactionsContext = createContext<TransactionContext>({} as TransactionContext)

export const TransactionsProvider: FunctionComponent = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(async (transaction: TransactionInput): Promise<void> => {
    const { data } = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date()
    })

    const { transaction: newTransaction } = data

    setTransactions(prevState => [...prevState, newTransaction])
  }, [])
  
  useEffect(() => {
    api.get('transactions').then(response => setTransactions(response.data.transactions))
  }, [])


  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = (): TransactionContext => {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider',
    )
  }
  return context
}