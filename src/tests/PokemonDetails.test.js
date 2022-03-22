import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon Details', () => {
  it('Checa as informações detalhadas', () => {
    renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailBtn);

    const headName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headName).toBeInTheDocument();
    expect(detailBtn).not.toBeInTheDocument();

    const headSumm = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(headSumm).toBeInTheDocument();

    const summPara = screen.getByText(/this intelligent pokémon roasts hard berries/i);
    expect(summPara).toBeInTheDocument();
  });

  it('Checa seção de mapas na página de detalhes', () => {
    const { container } = renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailBtn);

    const mapHeading = screen
      .getByRole('heading', { name: /game locations of pikachu/i });

    expect(mapHeading).toBeInTheDocument();

    const mapSection = container.querySelector('.pokemon-habitat');
    expect(mapSection).toBeInTheDocument();

    const mapOne = screen.getAllByAltText('Pikachu location')[0];
    expect(mapOne).toBeInTheDocument();
    expect(mapOne).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const paraOne = screen.getByText(/kanto viridian forest/i);
    expect(paraOne).toBeInTheDocument();

    const mapTwo = screen.getAllByAltText('Pikachu location')[1];
    expect(mapTwo).toBeInTheDocument();
    expect(mapTwo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const paraTwo = screen.getByText(/kanto power plant/i);
    expect(paraTwo).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um Pokemón', () => {
    renderWithRouter(<App />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailBtn);

    const addPokeBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(addPokeBtn).toBeInTheDocument();
    userEvent.click(addPokeBtn);

    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();

    userEvent.click(addPokeBtn);
    expect(star).not.toBeInTheDocument();
  });
});
