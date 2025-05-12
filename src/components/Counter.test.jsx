import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("to check counter elements", () => {
  it("to check text exist", () => {
    render(<Counter />)
    const element = screen.getByText(/counter/i)
    expect(element).toBeInTheDocument()
  })

  it("to check button exist", () => {
    render(<Counter />)
    const element = screen.getByRole("increment")
    expect(element).toBeInTheDocument()
  })
  
  it("to check initial value", () => {
    render(<Counter initialCount={5} />)
    const element = screen.getByTestId("count")
    expect(element).toHaveTextContent(5)
  })
  
  it("to check increment button", () => {
    render(<Counter initialCount={5} />)
    const result = screen.getByTestId("count")
    const button = screen.getByTestId("increment")
    fireEvent.click(button)
    expect(result).toHaveTextContent(6)
  })
  
  it("to check restart button", () => {
    render(<Counter initialCount={5} />)
    const result = screen.getByTestId("count")
    const button = screen.getByTestId("restart")
    fireEvent.click(button)
    expect(result).toHaveTextContent(0)
  })
})