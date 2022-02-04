import Modal from 'react-modal';
import { ReactComponent as CloseIcon } from '../../assets/close.svg'
import { ReactComponent as  IncomeIcon } from '../../assets/income.svg'
import { ReactComponent as OutcomeIcon } from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactionsContext } from '../../hooks/useTransactions';

type NewTransactionModalProps = {
  isOpen: boolean
  onRequestClose: () => void 
}

Modal.setAppElement('#root')

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const { createTransaction } = useTransactionsContext()


  async function handleCreateNewTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      title,
      amount: value,
      type,
      category
    };

    try {
      await createTransaction(data)
      
      onRequestClose()
      setTitle('')
      setCategory('')
      setValue(0)
      setCategory('')
      setType('deposit')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type='button'
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <CloseIcon />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder='Título' 
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          placeholder='Valor'
          type="number"
          value={value}
          required
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <IncomeIcon />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <OutcomeIcon />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>

    </Modal>
  )
}