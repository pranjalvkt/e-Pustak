import { render, screen } from "@testing-library/react";

function Example() {
  return <div>Hello Next.js</div>;
}

test("renders hello text", () => {
  render(<Example />);
  expect(screen.getByText("Hello Next.js")).toBeInTheDocument();
});
