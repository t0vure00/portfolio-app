import React, {act} from 'react';
import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './Homepage';


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

const page_data = {
  label: {
    title: "Tausta",
    about_me: "Olen ohjelmoija.",
    greeting: "Hei,"
  }
};

const titles_fi = ['etusivu', 'projektit', 'tausta'];

const data = {
  general_data: general_data,
  page_data: page_data,
  lang: "FIEN",
  titles: titles_fi
}

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<Homepage />", () => {
  test("should display about me text", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Homepage {...data}></Homepage>
        </MemoryRouter>
    );
    });
    expect(container.getElementsByClassName('about_me')[0]).toHaveTextContent("Olen ohjelmoija.");
  });

  test("should display about me greeting", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Homepage {...data}></Homepage>
        </MemoryRouter>
    );
    });
    expect(container.getElementsByClassName('greeting')[0]).toHaveTextContent("Hei,");
  });
});