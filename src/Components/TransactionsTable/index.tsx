import { useTransactionsContext } from '../../hooks/useTransactions';
import { formatDate, formatCurrency } from '../../utils/formats';

import { Container } from './styles';

export type Transaction = {
  id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: Date;
}

export const TransactionsTable: React.FC = () => {
  const { transactions } = useTransactionsContext()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
            transactions?.length ?
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>{formatCurrency(transaction.amount, transaction.type)}</td>
                <td>{transaction.category}</td>
                <td>{formatDate(transaction.createdAt)}</td>
              </tr>
            )) :
            <tr>
              <td colSpan={4} align="center">Nenhum registro cadastrado!</td>
            </tr>
          }
        </tbody>
      </table>
    </Container>
  )
}
