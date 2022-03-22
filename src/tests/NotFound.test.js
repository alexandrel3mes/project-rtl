import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/que-nao-existe/');

      const notFoundTitle = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(notFoundTitle).toBeInTheDocument();
      expect(notFoundTitle).toContainHTML(
        '<span role="img" aria-label="Crying emoji"> 😭</span>',
      );
    });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/que-nao-existe/');

      const img = screen.getAllByRole('img');
      expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
