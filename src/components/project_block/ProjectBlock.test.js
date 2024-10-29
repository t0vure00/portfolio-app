import React from 'react';
import { createRoot } from 'react-dom/client';
import {act} from 'react';
import { screen } from '@testing-library/react';
import ProjectBlock from "./ProjectBlock";

const project = {
  link: "https://firebasestorage.googleapis.com/v0/b/portfolio-app-6ce3c.appspot.com/o/Corona_car.jpg?alt=media&token=dfe503cc-a79a-43ae-a130-de3023304c7f",
  technologies: "HTML, CSS and JavaScript",
  description: "A working website was created.",
};

const label = {
  technologies_title: "Used technologies",
  description_title: "Project description"
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

describe("<ProjectBlock />", () => {

  test("should return an empty component with empty elements when project undefined", () => {
    act(() => {
      createRoot(container).render(<ProjectBlock project={ undefined } >  
              </ProjectBlock>);
    });
    const img_element = container.getElementsByClassName('project_block__project_img__no_zoom')[0];
    const tech_element = container.getElementsByClassName('project_block__tech_stack')[0];
    const tech_title_element = container.getElementsByClassName('project_block__title')[0];
    const desc_element = container.getElementsByClassName('project_block__description')[0];
    const desc_title_element = container.getElementsByClassName('project_block__title')[1];
    expect(img_element).toBeInTheDocument();
    expect(tech_element).not.toHaveTextContent();
    expect(tech_title_element).toBeEmptyDOMElement();
    expect(desc_element).not.toHaveTextContent();
    expect(desc_title_element).toBeEmptyDOMElement();
  });

  test("should return an empty component with desc title as no projects found when no projects found in description", () => {
    act(() => {
      createRoot(container).render(<ProjectBlock 
              project={ {
                      description: "No projects found with search word.",
              }} >  
        </ProjectBlock>);
    });
    const img_element = container.getElementsByClassName('project_block__project_img__no_zoom')[0];
    const tech_element = container.getElementsByClassName('project_block__tech_stack')[0];
    const tech_title_element = container.getElementsByClassName('project_block__title')[0];
    const desc_element = container.getElementsByClassName('project_block__description')[0];
    const desc_title_element = container.getElementsByClassName('project_block__title')[1];
    expect(img_element).toBeInTheDocument();
    expect(tech_element).not.toHaveTextContent();
    expect(tech_title_element).toHaveTextContent("No projects found with search word.");
    expect(desc_element).not.toHaveTextContent();
    expect(desc_title_element).toBeEmptyDOMElement();
  });

  test("should set img as given", () => {
    act(() => {
      createRoot(container).render(
              <ProjectBlock project={ project } label={ label } index={ 0 }>
                      </ProjectBlock>);
    });
    const displayedImage = document.querySelector("img");
    expect(displayedImage.src).toContain("Corona_car");
  });

  test("should set technologies as given", () => {
    act(() => {
      createRoot(container).render(
              <ProjectBlock project={ project } label={ label } index={ 0 }>
                      </ProjectBlock>);
    });
    const element = screen.getByText(project.technologies);
    expect(element).toBeInTheDocument();
  });

  test("should set description as given", () => {
    act(() => {
      createRoot(container).render(
              <ProjectBlock project={ project } label={ label } index={ 0 }>
                      </ProjectBlock>);
    });
    const element = screen.getByText(project.description);
    expect(element).toBeInTheDocument();
  });
});