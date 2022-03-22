import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const mainHeading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
  });
});
