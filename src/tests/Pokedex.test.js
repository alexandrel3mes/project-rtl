import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  const pikachuSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const mainHeading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');

    userEvent.click(nextBtn);
    expect(pokeImg).toHaveAttribute('src', pikachuSrc);
  });

  it('Teste se é mostrado apenas um Pokemón por vez', () => {
    renderWithRouter(<App />);

    const pokeImg = screen.getAllByRole('img');
    expect(pokeImg.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const testId = 'pokemon-type-button';
    const att = 'data-testid';

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    expect(electricBtn).toBeInTheDocument();
    expect(electricBtn).toHaveAttribute(att, testId);
    userEvent.click(electricBtn);
    expect(nextBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();

    const fireBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireBtn).toBeInTheDocument();
    expect(fireBtn).toHaveAttribute(att, testId);
    userEvent.click(fireBtn);
    expect(nextBtn).toBeEnabled();
    expect(allBtn).toBeInTheDocument();

    const bugBtn = screen.getByRole('button', { name: /bug/i });
    expect(bugBtn).toBeInTheDocument();
    expect(bugBtn).toHaveAttribute(att, testId);
    userEvent.click(bugBtn);
    expect(nextBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();

    const poisonBtn = screen.getByRole('button', { name: /poison/i });
    expect(poisonBtn).toBeInTheDocument();
    expect(poisonBtn).toHaveAttribute(att, testId);
    userEvent.click(poisonBtn);
    expect(nextBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();

    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    expect(psychicBtn).toBeInTheDocument();
    expect(psychicBtn).toHaveAttribute(att, testId);
    userEvent.click(psychicBtn);
    expect(nextBtn).toBeEnabled();
    expect(allBtn).toBeInTheDocument();

    const normalBtn = screen.getByRole('button', { name: /normal/i });
    expect(normalBtn).toBeInTheDocument();
    expect(normalBtn).toHaveAttribute(att, testId);
    userEvent.click(normalBtn);
    expect(nextBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();

    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    expect(dragonBtn).toBeInTheDocument();
    expect(dragonBtn).toHaveAttribute(att, testId);
    userEvent.click(dragonBtn);
    expect(nextBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    const resetBtn = screen.getByRole('button', { name: /all/i });
    expect(resetBtn).toBeInTheDocument();

    userEvent.click(resetBtn);
    expect(nextBtn).toBeEnabled();

    const currImg = screen.getByRole('img');
    expect(currImg).toHaveAttribute('src', pikachuSrc);
  });
});
