import { screen } from "@testing-library/react";

import { Login } from "@/pages/login/Login";

import renderWithRouter from "../utils/HelpRender";

describe("Login", () => {
  it("should renders the inputs", () => {
    // arrange
    renderWithRouter(<Login />);

    // act
    const username = screen.getByLabelText("Usuário:");
    const password = screen.getByLabelText("Senha:");

    // assert
    // expect(user).toBe(/Hello React!/i);
    expect(username).toHaveAttribute("required");
    expect(password).toHaveAttribute("required");
  });
});
