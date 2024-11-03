import React, {act} from 'react';
import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from "./Header";


const general_data = {
  label: {
    contact_me_en: "Contact me",
    contact_me_fi: "Ota yhteyttä",
  },
  button: {
    background_en: "Background",
    background_fi: "Tausta",
    linkedin: "LinkedIn",
    frontpage_en: "Frontpage",
    frontpage_fi: "Etusivu",
    lang_choice_en: "EN",
    lang_choice_fi: "FI",
    projects_en: "Projects",
    projects_fi: "Projektit"
  },
};

const frontpage_data = {
  label: {
    title: "Portfolio"
  }
};

const projects_page_data = {
  label: {
    title: "Projektit"
  },
  button: {
    search: "Hae"
  }
};

const titles_fi = ['etusivu', 'projektit', 'tausta'];

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<Header />", () => {
  test("should set title as Portfolio when set so", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Header general_data={general_data} 
                  page_data={frontpage_data} handleLangButtonClick={null}
                  handlePageButtonClick={null} activePage={0} lang={'FIEN'}
                  titles= { titles_fi }>
          </Header>
        </MemoryRouter>);
    });
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });

  test("should have a search bar when active page is 2", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Header general_data={general_data} 
                  page_data={projects_page_data} handleLangButtonClick={null}
                  handlePageButtonClick={null} activePage={2} lang={'FIEN'}
                  titles= { titles_fi }>
          </Header>
        </MemoryRouter>);
    });
    expect(screen.getByText(/Hae/i)).toBeInTheDocument();
  });

  test("should not have a search bar when active page is other than 2", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Header general_data={general_data} 
                  page_data={projects_page_data} handleLangButtonClick={null}
                  handlePageButtonClick={null} activePage={0} lang={'FIEN'}
                  titles= { titles_fi }>
          </Header>
        </MemoryRouter>);
    });
    expect(screen.queryByText(/Hae/i)).not.toBeInTheDocument();
  });
});