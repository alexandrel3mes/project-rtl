import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getAllByText(/electric/i);
    expect(pokeType[1]).toBeInTheDocument();

    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();

    const pokeImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card possue botão com link para página do Pokemon', () => {
    renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailBtn).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se o botão leva ao lugar desejado', () => {
    const { history } = renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailBtn);

    const addToFavs = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(addToFavs);

    const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
