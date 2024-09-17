import {screen} from '@testing-library/dom'
import { createRoot } from 'react-dom/client';
import {act} from 'react';
import App from './App';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


describe("<App />", () => {
  test('renders header', () => {
    act(() => {
      createRoot(container).render(<App />);
    });
    const header_element = container.getElementsByClassName('header')[0];
    expect(header_element).toBeInTheDocument();
  });

  test("should set frontpage as active page as a default", () => {
    act(() => {
      createRoot(container).render(<App />);
    });
    expect(container.getElementsByClassName('page_buttons__button__active')[0].textContent).toBe("etusivu");
  });

  test("should toggle languages in dropdown when clicked", () => {
    act(() => {
      createRoot(container).render(<App />);
    });
    const button  = container.getElementsByClassName('lang_button__dropbtn')[0];
    expect(screen.getByTestId("lang_button__used_lang")).toHaveTextContent("FI");
    expect(screen.getByTestId("lang_button__second_lang")).toHaveTextContent("EN");
    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(screen.getByTestId("lang_button__used_lang")).toHaveTextContent("EN");
    expect(screen.getByTestId("lang_button__second_lang")).toHaveTextContent("FI");
  });
});