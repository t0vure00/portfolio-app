import React from "react";
import { createRoot } from 'react-dom/client';
import {act} from 'react';
import { screen } from '@testing-library/react';
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
  frontpage_title: "Portfolio"
};

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
      createRoot(container).render(<Header general_data={general_data} 
              frontpage_data={frontpage_data} handlePageButtonClick={null} 
              handleLangButtonClick={null} activePage={0} lang={'FIEN'}>
              </Header>);
    });
    const title_element = screen.getByText(/Portfolio/i);
    expect(title_element).toBeInTheDocument();
  });
});