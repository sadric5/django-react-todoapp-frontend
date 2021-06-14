// import { render, screen } from '@testing-library/react';
// import App from './App';
import sum from 'test/sum'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test('sum(3,7) should be 10 ', () => {
  expect(sum(3,7)).toBe(10);
});

