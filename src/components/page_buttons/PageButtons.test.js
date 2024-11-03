import React, {act} from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import PageButtons from "./PageButtons";

let container = null;
const titles_fi = ['etusivu', 'projektit', 'tausta'];
const titles_en = ['frontpage', 'projects', 'background'];


beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<PageButtons />", () => {
  test("should set titles of the buttons in finnish when given them", () => {
    act(() => {
      createRoot(container).render(<MemoryRouter><PageButtons active={0} titles={ titles_fi }/></MemoryRouter>);
    });
    expect(container.textContent).toBe("etusivuprojektittausta");
  });

  test("should set titles of the buttons in english when given them", () => {
    act(() => {
      createRoot(container).render(<MemoryRouter><PageButtons active={0} titles={ titles_en }/></MemoryRouter>);
    });
    expect(container.textContent).toBe("frontpageprojectsbackground");
  });

  test("should set etusivu as active page when given index 0", () => {
    act(() => {
      createRoot(container).render(<MemoryRouter><PageButtons activePageIndex={0} titles={ titles_fi }/></MemoryRouter>);
    });
    expect(container.getElementsByClassName('page_buttons__button__active')[0].textContent).toBe("etusivu");
  });

  test("should set tausta as active page when given index 2", () => {
    act(() => {
      createRoot(container).render(<MemoryRouter><PageButtons activePageIndex={2} titles={ titles_fi }/></MemoryRouter>);
    });
    expect(container.getElementsByClassName('page_buttons__button__active')[0].textContent).toBe("tausta");
  });
});