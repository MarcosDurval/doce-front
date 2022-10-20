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
  it("should edit supplie", async () => {
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
      const insumo = await screen.findByLabelText("Insumo:");
      const button = await screen.findByRole("button", {
        name: "Atualizar Insumo",
      });
      user.type(insumo, "Abacaxi");
      user.click(button);
    });

    await waitFor(async () => {
      const insumo = await screen.findByText(/Abacaxi$/);
      expect(insumo).toBeInTheDocument();
    });
  });
});
