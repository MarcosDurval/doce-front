import { screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import ListProducts from "@/pages/product/ListProducts";

import renderWithRouter from "../utils/HelpRender";

describe("Page Products", () => {
  it("should render input search", async () => {
    const { user } = renderWithRouter(<ListProducts />, { route: "/produtos" });

    const searchInput = (await screen.findByTestId(
      "search"
    )) as HTMLInputElement;

    await user.type(searchInput, "Batman");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("Batman");
  });
  it("should render link 'Novo'", async () => {
    renderWithRouter(<ListProducts />, { route: "/produtos" });

    const linkNew = await screen.findByText("Novo");
    expect(linkNew).toBeInTheDocument();
    expect(linkNew).toHaveAttribute("href", "/produtos/cadastro");
  });
  it("should search by text", async () => {
    const response = { data: { results: [1, 2] } };
    const response1 = { data: { results: [1] } };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListProducts />, { route: "/produtos" });

    const allProducts = await screen.findAllByText("olá mundo");
    expect(allProducts.length).toBe(2);

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response1);

    const searchInput = (await screen.findByTestId(
      "search"
    )) as HTMLInputElement;

    await user.type(searchInput, "Batman[Enter]");

    await waitFor(async () => {
      const filtredProdutcts = await screen.findAllByText("olá mundo");
      expect(filtredProdutcts.length).toBe(1);
    });
  });
});
