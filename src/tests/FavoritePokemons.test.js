import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Favorite Pokemóns', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');
    expect(localStorage.getItem('favoritePokemonIds')).toBe(null);

    const msg = screen.getByText(/no favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailBtn).toBeInTheDocument();
    expect(detailBtn).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(detailBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favAdd = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favAdd).toBeInTheDocument();
    userEvent.click(favAdd);
    expect(localStorage.getItem('favoritePokemonIds')).toBe('[25]');

    history.push('/favorites');

    const pokeImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeImg).toBeInTheDocument();
  });
});
