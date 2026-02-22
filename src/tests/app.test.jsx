// App.test.jsx

import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./renderApp";
import { vi } from "vitest";

const fakeProducts = [
  { id: 1, title: "Test Product 1", price: 10, image: "x" },
  { id: 2, title: "Test Product 2", price: 20, image: "y" },
];

//von Chatti
vi.stubGlobal(
  "fetch",
  vi.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => fakeProducts,
  })),
);

describe("App component", () => {
  it("renders navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // using regex with the i flag allows simpler case-insensitive comparison
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
  });
});

test("updates navbar count when adding items", async () => {
  const user = userEvent.setup();
  renderApp("/shop");

  const inputs = await screen.findAllByRole("spinbutton");
  await user.clear(inputs[0]);
  await user.type(inputs[0], "3");

  const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
  await user.click(addButtons[0]);

  expect(screen.getByRole("link", { name: /cart \(3\)/i })).toBeInTheDocument();
});

test("total items in cart the same as in cart nav bar", async () => {
  const user = userEvent.setup();
  renderApp("/shop");

  const inputs = await screen.findAllByRole("spinbutton");
  await user.clear(inputs[0]);
  await user.type(inputs[0], "2");

  const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
  await user.click(addButtons[0]);

  const linkToCart = screen.getAllByRole("link", { name: /cart/i });
  await user.click(linkToCart[0]);

  const navBarCart = await screen.findByRole("link", { name: /cart/i });
  const cartTotalItems = await screen.getByText(/total items/i);

  const navbarNumber = navBarCart.textContent.match(/\d+/)[0];
  const totalNumber = cartTotalItems.textContent.match(/\d+/)[0];

  expect(navbarNumber).toBe(totalNumber);
});

test("shop renders mocked products", async () => {
  renderApp("/shop");

  // wartet, bis fetch durch ist und UI gerendert ist
  expect(await screen.findByText("Test Product 1")).toBeInTheDocument();
});

test("initial cart is 0", () => {
  renderApp("/cart");

  const totalItems = screen.getByText(/total items/i);

  expect(totalItems).toHaveTextContent("Total Items: 0");
});

test("cart adjusment of quantity resolves in navbar and total", async () => {
  const user = userEvent.setup();

  renderApp("/shop");

  const inputs = await screen.findAllByRole("spinbutton");
  await user.clear(inputs[0]);
  await user.type(inputs[0], "2");

  const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
  await user.click(addButtons[0]);

  const linkToCart = screen.getAllByRole("link", { name: /cart/i });
  await user.click(linkToCart[0]);

  const inputsCart = await screen.findAllByRole("spinbutton");
  //  await user.clear(inputsCart[0]);
  await user.clear(inputsCart[0]);
  await user.type(inputsCart[0], "3");

  const navBarCart = await screen.findByRole("link", { name: /cart/i });
  const cartTotalItems = screen.getByText(/total items/i);

  const navbarNumber = navBarCart.textContent.match(/\d+/)[0];
  const totalNumber = cartTotalItems.textContent.match(/\d+/)[0];

  expect(navbarNumber).toBe(totalNumber);
  expect(navbarNumber).toBe("3");
  expect(inputsCart[0].value).toBe(totalNumber);
});
