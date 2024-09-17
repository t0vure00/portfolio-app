import React from 'react';
import {act} from 'react';
import { createRoot } from 'react-dom/client';
import PageButtons from "./PageButtons";

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<PageButtons />", () => {
  test("should set titles of the buttons in finnish when lang set to FI", () => {
    act(() => {
      createRoot(container).render(<PageButtons active={0} lang="FIEN"/>);
    });
    expect(container.textContent).toBe("etusivuprojektittausta");
  });

  test("should set titles of the buttons in english when lang set to EN", () => {
    act(() => {
      createRoot(container).render(<PageButtons active={0} lang="ENFI"/>);
    });
    expect(container.textContent).toBe("frontpageprojectsbackground");
  });
});