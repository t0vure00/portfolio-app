import React, {act} from 'react';
import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from './Projects';


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
    title: "Projektit"
  },
  projects: [
    {
      description: "Project to make a phone.",
      link: "Link_1",
      technologies: "C/C++"
    },
    {
        description: "Project to make a computer.",
        link: "Link_2",
        technologies: "HTML, CSS and JavaScript"
    },
    {
        description: "Project to make a computer in minecraft.",
        link: "Link_3",
        technologies: "Minecraft"
    },
    {
        description: "Project to make minecraft.",
        link: "Link_4",
        technologies: "C++"
    }
  ]
};

const titles_fi = ['etusivu', 'projektit', 'tausta'];

const data = {
  general_data: general_data,
  page_data: page_data,
  projects: page_data.projects.slice(0,3),
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

describe("<Projects />", () => {
  test("should have 3 project blocks", () => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <Projects {...data}></Projects>
        </MemoryRouter>
    );
    });
    expect(container.getElementsByClassName('project_block').length).toBe(3);
  });
});