import React from "react";
import { createRoot } from 'react-dom/client';
import {act} from 'react';
import { screen } from '@testing-library/react';
import InfoBlock from "./InfoBlock";

const data_to_display = {
  description: "A School where people learn things.",
  interval: "1890-1893",
  place: "School of Things",
  title: "Expert of Things"
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

describe("<InfoBlock />", () => {

  test("should return an empty component with empty title when data undefined", () => {
    act(() => {
      createRoot(container).render(
              <InfoBlock data_to_display={ undefined } ></InfoBlock>);
    });
    const title_element = container.getElementsByClassName('title')[0];
    expect(title_element).toBeInTheDocument();
    expect(title_element).toHaveTextContent('');
  });

  test("should set description as given", () => {
    act(() => {
      createRoot(container).render(
              <InfoBlock data_to_display={ data_to_display } ></InfoBlock>);
    });
    const element = screen.getByText(/A School where people learn things./i);
    expect(element).toBeInTheDocument();
  });

  test("should set interval as given", () => {
    act(() => {
      createRoot(container).render(
              <InfoBlock data_to_display={ data_to_display } ></InfoBlock>);
    });
    const element = screen.getByText(/1890-1893/i);
    expect(element).toBeInTheDocument();
  });

  test("should set place as given", () => {
    act(() => {
      createRoot(container).render(
              <InfoBlock data_to_display={ data_to_display } ></InfoBlock>);
    });
    const element = screen.getByText(/School of Things/i);
    expect(element).toBeInTheDocument();
  });

  test("should set title as given", () => {
    act(() => {
      createRoot(container).render(
              <InfoBlock data_to_display={ data_to_display } ></InfoBlock>);
    });
    const element = screen.getByText(/Expert of Things/i);
    expect(element).toBeInTheDocument();
  });
});