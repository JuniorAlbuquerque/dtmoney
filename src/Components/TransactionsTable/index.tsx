import React, { useEffect } from 'react';
import { api } from '../../services';

import { Container } from './styles';

export const TransactionsTable: React.FC = () => {
  useEffect(() => {
    api.get('transactions').then(response => console.log(response.data))
  }, [])

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
          <tr>
            <td>Curso Ignite Rocketseat</td>
            <td className='deposit'>R$ 150,00</td>
            <td>Cursos</td>
            <td>21/12/2021</td>
          </tr>

          <tr>
            <td>Curso Ignite Rocketseat</td>
            <td className='withdraw'>- R$ 150,00</td>
            <td>Cursos</td>
            <td>21/12/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
