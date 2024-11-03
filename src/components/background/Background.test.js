import React, {act} from 'react';
import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Background from './Background';


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
    title: "Tausta"
  },
  experience: [
    {
      description: "Duties related to making coffee.",
      interval: "1800-1801",
      place: "Coffee shop",
      title: "Barista"
    },
    {
      description: "Organizing products on a shelf.",
      interval: "1900-1901",
      place: "Groceries",
      title: "Bagger"
    }
  ],
  education: [
    {0: {
      description: "Learning to make coffee.",
      interval: "1790-1800",
      place: "Coffee school",
      title: "Maker of coffee drinks"
    }},
    {1: {
      description: "Organizing products on a shelf.",
      interval: "1890-1900",
      place: "Bagger school",
      title: "Product placement"
    }},
    {2: {
      description: "Learning to fish.",
      interval: "1100-1200",
      place: "The pond",
      title: "Fisherman"
    }}
  ]
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

describe("<Background />", () => {
  test("should have 6 info blocks", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Background {...data}></Background>
        </MemoryRouter>
      );
    });
    expect(container.getElementsByClassName('info_block').length).toBe(6);
  });
});