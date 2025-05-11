import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Products from './Products';

// to write the different test cases
describe("testing inputs", () => {
  it("username input", () => {
    render(<Products />)
    const element = screen.getByText(/products/i)
    expect(element).toBeInTheDocument()
  })

  it("password input", () => {
    render(<Products />)
    const element = screen.getByRole(/password/i)
    expect(element).toBeInTheDocument()
  })
})