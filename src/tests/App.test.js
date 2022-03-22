import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const linkOne = screen.getByRole('link', { name: /Home/i });
      const linkTwo = screen.getByRole('link', { name: /About/i });
      const linkThree = screen.getByRole('link', { name: /Favorite Pokémons/i });

      expect(linkOne).toBeInTheDocument();
      expect(linkTwo).toBeInTheDocument();
      expect(linkThree).toBeInTheDocument();
    });

  it('Teste se o usuário é enviado para a URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Teste se o usuário é enviado para a URL /about ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toBeInTheDocument();
      userEvent.click(aboutLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it('Teste se o usuário é enviado para a URL /favorites ao clicar no link Favorites',
    () => {
      const { history } = renderWithRouter(<App />);

      const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favLink).toBeInTheDocument();
      userEvent.click(favLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Teste se o usuário é enviado para Not Found ao ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/que-nao-existe/');

      const notFoundTitle = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(notFoundTitle).toBeInTheDocument();
    });
});
