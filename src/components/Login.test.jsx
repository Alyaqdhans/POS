import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';

// to write the different test cases
describe("testing inputs", () => {
  it("username input", () => {
    render(<Login />)
    const element = screen.getByRole("button")
    expect(element).toBeInTheDocument()
  })

  it("password input", () => {
    render(<Login />)
    const element = screen.getByRole(/password/i)
    expect(element).toBeInTheDocument()
  })
})