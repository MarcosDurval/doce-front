import { fireEvent, screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import Login from "@/pages/login/Login";

import renderWithRouter from "../utils/HelpRender";

describe("Login", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should renders the inputs", async () => {
    renderWithRouter(<Login />, { route: "/login" });

    const username = screen.getByLabelText("Usuário:") as HTMLInputElement;
    const password = screen.getByLabelText("Senha:") as HTMLInputElement;

    fireEvent.change(username, { target: { value: "name" } });
    fireEvent.change(password, { target: { value: "password" } });

    expect(username?.value).toBe("name");
    expect(password?.value).toBe("password");
    expect(username).toHaveAttribute("required");
    expect(password).toHaveAttribute("required");
  });
  it("it should faill login action", async () => {
    const error = { response: { status: 401 } };
    mockAxios.post.mockRejectedValueOnce(error);

    const { user } = renderWithRouter(<Login />, { route: "/login" });

    const username = screen.getByLabelText("Usuário:");
    const password = screen.getByLabelText("Senha:");
    const button = screen.getByText("Entrar");

    user.type(username, "nome");
    user.type(password, "senha");

    user.click(button);
    await waitFor(async () => {
      const failLogin = await screen.findByText("Usuário ou senha inválidos");
      expect(failLogin).toBeInTheDocument();
    });
  });
  it("it should be possible to log in", async () => {
    const response = { data: { access: "token" } };
    mockAxios.post.mockResolvedValueOnce(response);

    const { user } = renderWithRouter(<Login />, { route: "/login" });

    const username = screen.getByLabelText("Usuário:");
    const password = screen.getByLabelText("Senha:");
    const button = screen.getByText("Entrar");

    user.type(username, "name");
    user.type(password, "password");

    user.click(button);
    await waitFor(async () => {
      expect(window.location.pathname).toBe("/produtos");
    });
  });
});
