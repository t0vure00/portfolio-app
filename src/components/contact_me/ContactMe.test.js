import React from "react";
import { createRoot } from 'react-dom/client';
import {act} from 'react';
import ContactMe from "./ContactMe";

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<ContactMe />", () => {
  test("should set text as Ota yhteytta:LinkedIn when set so", () => {
    act(() => {
      createRoot(container).render(<ContactMe text="Ota yhteyttä"/>);
    });
    expect(container.textContent).toBe("Ota yhteyttä:LinkedIn");
  });

  test("should set text as Contact me:LinkedIn when set so", () => {
    act(() => {
      createRoot(container).render(<ContactMe text="Contact me"/>);
    });
    expect(container.textContent).toBe("Contact me:LinkedIn");
  });
});