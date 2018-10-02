import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Landing from './Landing';

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

test('<Landing /<', () => {
  const { debug } = render(<Landing />);

  debug();
});
