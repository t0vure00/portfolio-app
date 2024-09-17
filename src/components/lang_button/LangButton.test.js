import React from 'react';
import {act} from 'react';
import { createRoot } from 'react-dom/client';
import LangButton from "./LangButton";

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<LangButton />", () => {
  test("should set chosen lang as EN and second as FI when set so", () => {
    act(() => {
      createRoot(container).render(<LangButton lang="ENFI"/>);
    });
    expect(container.textContent).toBe("ENFI");
  });

  test("should set chosen lang as FI and second as EN when set so", () => {
    act(() => {
      createRoot(container).render(<LangButton lang="FIEN"/>);
    });
    expect(container.textContent).toBe("FIEN");
  });

  test("should not set chosen language as any than FI and EN", () => {
    act(() => {
      createRoot(container).render(<LangButton lang="SVEN"/>);
    });
    expect(container.textContent).toBe("FIEN");
  });

  test("should not set second language as any than FI and EN", () => {
    act(() => {
      createRoot(container).render(<LangButton lang="ENSP"/>);
    });
    expect(container.textContent).toBe("FIEN");
  });
})