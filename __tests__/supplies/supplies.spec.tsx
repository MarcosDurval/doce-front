import { screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import ListSupplies from "@/pages/supplies/ListSupplies";

import {
  mockSupplieID,
  mockSupplies,
  mockSuppliesEdit,
  mockSuppliesRemove,
} from "../__mocks__/supplies";
import renderWithRouter from "../utils/HelpRender";

describe("Page Supplies", () => {
  it("should render card", async () => {
    const response = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(response);
    renderWithRouter(<ListSupplies />, { route: "/insumos" });

    const allSupplies = await screen.findAllByTestId("card-supplie");
    expect(allSupplies).toHaveLength(9);
  });

  it("should render fail", async () => {
    const response = { data: false };
    mockAxios.get.mockResolvedValueOnce(response);
    renderWithRouter(<ListSupplies />, { route: "/insumos" });

    const allSupplies = await screen.findByText(/^Algo deu Errado/);
    expect(allSupplies).toBeInTheDocument();
  });

  it("should render btn-cards", async () => {
    const response = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(response);
    renderWithRouter(<ListSupplies />, { route: "/insumos" });

    const allSupplies = await screen.findAllByTestId("card-supplie");
    const btns = allSupplies[0].querySelector(".btn-card");
    expect(btns).toBeInTheDocument();
  });

  it("should delete supplie", async () => {
    const response = { data: mockSuppliesRemove };
    const responseFull = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(responseFull);
    mockAxios.delete.mockResolvedValue([]);

    const { user } = renderWithRouter(<ListSupplies />, { route: "/insumos" });
    const allSupplies = await screen.findAllByTestId("card-supplie");
    expect(allSupplies).toHaveLength(9);
    const btns = allSupplies[0].querySelectorAll("button");

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response);

    await user.click(btns[1]);

    await waitFor(async () => {
      const cards = screen.queryAllByTestId("card-supplie");
      expect(cards).toHaveLength(8);
    });
  });

  it("should edit supplie", async () => {
    const response = { data: mockSupplies };
    const responseId = { data: mockSupplieID };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListSupplies />, { route: "/insumos" });
    const allSupplies = await screen.findAllByTestId("card-supplie");
    const btns = allSupplies[0].querySelectorAll("button");

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(responseId);

    await user.click(btns[0]);

    await waitFor(async () => {
      const header = await screen.findByRole("heading", {
        level: 1,
        name: "INSUMO",
      });
      const insumo = await screen.findByLabelText("Insumo:");
      expect(header).toBeInTheDocument();
      expect(insumo).toBeInTheDocument();
    });
  });

  it("should patch supplie", async () => {
    const response = { data: mockSupplies };
    const responseId = { data: mockSupplieID };
    const responseEdit = { data: mockSuppliesEdit };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListSupplies />, { route: "/insumos" });
    const allSupplies = await screen.findAllByTestId("card-supplie");
    const btns = allSupplies[0].querySelectorAll("button");

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(responseId);

    await user.click(btns[0]);
    mockAxios.patch.mockResolvedValue([]);
    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(responseEdit);

    await waitFor(async () => {
      const supplie = await screen.findByLabelText("Insumo:");
      const button = await screen.findByRole("button", {
        name: "Atualizar Insumo",
      });
      user.type(supplie, "Abacaxi");
      user.click(button);
    });

    await waitFor(async () => {
      const supplie = await screen.findByText(/Abacaxi$/);
      expect(supplie).toBeInTheDocument();
    });
  });
  it("should create supplie", async () => {
    const response = { data: mockSuppliesRemove };
    const response1 = { data: mockSupplies };
    mockAxios.post.mockResolvedValue([]);
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListSupplies />, { route: "/insumos" });
    const btnNew = await screen.findByRole("button", { name: "Novo" });

    await user.click(btnNew);

    const supplie = await screen.findByLabelText("Insumo:");
    const local = await screen.findByLabelText("Local de compra:");
    const price = await screen.findByLabelText("Preço:");
    const uni = await screen.findByLabelText("Unidade de medida:");
    const date = await screen.findByLabelText("Data:");
    const quantity = await screen.findByLabelText("Quantidade da embalagem:");
    const btnCreate = await screen.findByRole("button", {
      name: "Cadastrar",
    });

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response1);

    await user.type(supplie, "abacaxi");
    await user.type(local, "atacadao");
    await user.type(price, "3.75");
    await user.type(date, "2020-04-01");
    await user.type(quantity, "1000");
    await user.type(uni, "Gramas");

    await user.click(btnCreate);

    const allSupplies = await screen.findAllByTestId("card-supplie");
    expect(allSupplies).toHaveLength(9);
  });
});
