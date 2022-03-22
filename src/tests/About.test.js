import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const partOne = 'This application simulates a Pokédex, ';
    const partTwo = 'a digital encyclopedia containing all Pokémons';
    const paragraphOne = screen.getByText(`${partOne}${partTwo}`);

    const partThree = 'One can filter Pokémons by type, ';
    const partFour = 'and see more details for each one of them';
    const paragraphTwo = screen.getByText(`${partThree}${partFour}`);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
