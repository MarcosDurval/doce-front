import { fireEvent, screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import ListProducts from "@/pages/product/ListProducts";

import { mockProducts } from "../__mocks__/products";
import renderWithRouter from "../utils/HelpRender";

describe("Page Products", () => {
  it("should render input search", async () => {
    const response = { data: { results: [] } };
    mockAxios.get.mockResolvedValueOnce(response);

    const { user } = renderWithRouter(<ListProducts />, { route: "/produtos" });

    const searchInput = (await screen.findByTestId(
      "search"
    )) as HTMLInputElement;

    await user.type(searchInput, "Batman");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("Batman");
  });

  // it("should render link 'Cadastro'", async () => {
  //   const response = { data: { results: mockProducts } };
  //   mockAxios.get.mockResolvedValueOnce(response);
  //   renderWithRouter(<ListProducts />, { route: "/produtos" });

  //   const linkNew = await screen.findByText("Cadastro");
  //   expect(linkNew).toBeInTheDocument();
  //   expect(linkNew).toHaveAttribute("href", "/produtos/cadastro");
  // });

  it("should search by text", async () => {
    const response = { data: { results: mockProducts } };
    const response1 = { data: { results: [mockProducts[0]] } };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListProducts />, { route: "/produtos" });

    const allProducts = await screen.findAllByText(/^Produto/);
    expect(allProducts.length).toBe(2);

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response1);

    const searchInput = (await screen.findByTestId(
      "search"
    )) as HTMLInputElement;

    await user.type(searchInput, "Batman[Enter]");

    await waitFor(async () => {
      const filtredProdutcts = await screen.findAllByText(/^Produto/);
      expect(filtredProdutcts.length).toBe(1);
    });
  });

  it("should render products", async () => {
    const response = { data: { results: mockProducts } };
    mockAxios.get.mockResolvedValueOnce(response);

    renderWithRouter(<ListProducts />, { route: "/produtos" });

    const allProducts = await screen.findAllByText(/^Produto/);
    const allRecipes = await screen.findAllByText(/^Receita/);
    expect(allProducts.length).toBe(2);
    expect(allRecipes.length).toBe(4);
  });

  it("should render image default product", async () => {
    const response = { data: { results: mockProducts } };
    mockAxios.get.mockResolvedValueOnce(response);

    renderWithRouter(<ListProducts />, { route: "/produtos" });

    const images = await screen.findAllByAltText("Imagem do Produto");
    fireEvent.error(images[0]);

    expect(images[0]).toHaveAttribute(
      "src",
      "https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg"
    );
  });

  it("should render message fail get", async () => {
    mockAxios.get.mockRejectedValueOnce(null);

    renderWithRouter(<ListProducts />, { route: "/produtos" });

    const message = await screen.findByText(/^Algo deu Errado/);

    expect(message).toBeInTheDocument();
  });
});
