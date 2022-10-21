import { screen } from "@testing-library/react";

import Sidebar from "@/components/Sidebar";

import renderWithRouter from "../utils/HelpRender";

describe("test siber", () => {
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
});
