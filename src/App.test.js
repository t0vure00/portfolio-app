import React, {act} from 'react';
import {screen} from '@testing-library/dom'
import { createRoot } from 'react-dom/client';
// import App from './App';


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
  test('should', () => {
    // act(() => {
    //     createRoot(container).render(<App />);
    // });
    // expect(Firebase.getGeneralEnTexts).toHaveBeenCalledWith('something');
  });
});