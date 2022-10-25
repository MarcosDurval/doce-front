import { screen } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import Sidebar from "@/components/Sidebar";
import ListSupplies from "@/pages/supplies/ListSupplies";

import { mockSupplies, mockSuppliesRemove } from "../__mocks__/supplies";
import renderWithRouter from "../utils/HelpRender";

describe("fixed components", () => {
  it("should render buttons side bar", async () => {
    renderWithRouter(<Sidebar />);
    const supplie = screen.queryByRole("link", { name: "Insumos" });
    const packing = screen.queryByRole("link", { name: "Embalagens" });
    const product = screen.queryByRole("link", { name: "Produtos" });
    const btnLogout = screen.queryByRole("button", { name: "Sair" });

    expect(product).toHaveAttribute("href", "/produtos");
    expect(packing).toHaveAttribute("href", "/embalagem");
    expect(supplie).toHaveAttribute("href", "/insumos");
    expect(btnLogout).toBeInTheDocument();
  });

  it("should button next footer", async () => {
    const response = { data: mockSupplies };
    const response1 = { data: mockSuppliesRemove };
    mockAxios.get.mockResolvedValueOnce(response);

    const { user } = renderWithRouter(<ListSupplies />);
    const footer = await screen.findByTestId("footerList");
    const buttons = footer.querySelectorAll("button");

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response1);

    const allSupplies = await screen.findAllByTestId("card-supplie");
    expect(allSupplies).toHaveLength(9);

    await user.click(buttons[1]);

    const allSupplies1 = await screen.findAllByTestId("card-supplie");
    expect(allSupplies1).toHaveLength(8);
  });

  it("should button prev footer", async () => {
    const response = { data: mockSuppliesRemove };
    const response1 = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(response);

    const { user } = renderWithRouter(<ListSupplies />);
    const footer = await screen.findByTestId("footerList");
    const buttons = footer.querySelectorAll("button");

    mockAxios.get.mockReset();
    mockAxios.get.mockResolvedValueOnce(response1);

    const allSupplies = await screen.findAllByTestId("card-supplie");
    expect(allSupplies).toHaveLength(8);

    await user.click(buttons[0]);

    const allSupplies1 = await screen.findAllByTestId("card-supplie");
    expect(allSupplies1).toHaveLength(9);
  });
  it("should have className", async () => {
    const response = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListSupplies />);
    const button = await screen.findByTestId("openside");

    expect(button).toBeInTheDocument();
    await user.click(button);
    const scroll = document.querySelector(".scroll");
    const backside = document.querySelector(".backside");
    const mobiside = document.querySelector(".mobiside");
    expect(scroll).toBeInTheDocument();
    expect(backside).toBeInTheDocument();
    expect(mobiside).toBeInTheDocument();
  });

  it("should not have className", async () => {
    const response = { data: mockSupplies };
    mockAxios.get.mockResolvedValueOnce(response);
    const { user } = renderWithRouter(<ListSupplies />);
    const button = await screen.findByTestId("openside");

    await user.click(button);
    const buttonClosed = await screen.findByTestId("btnClosedSide");

    await user.click(buttonClosed);

    const scroll = document.querySelector(".scroll");
    const backside = document.querySelector(".backside");
    const mobiside = document.querySelector(".mobiside");
    expect(scroll).not.toBeInTheDocument();
    expect(backside).not.toBeInTheDocument();
    expect(mobiside).not.toBeInTheDocument();
  });
});
