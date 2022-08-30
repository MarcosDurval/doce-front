import { fireEvent, screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import { Login } from "@/pages/login/Login";

import renderWithRouter from "../utils/HelpRender";

describe("Login", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should renders the inputs", () => {
    // arrange
    renderWithRouter(<Login />);

    // act
    const username = screen.getByLabelText("Usuário:") as HTMLInputElement;
    const password = screen.getByLabelText("Senha:") as HTMLInputElement;

    fireEvent.change(username, { target: { value: "name" } });
    fireEvent.change(password, { target: { value: "password" } });

    // assert

    expect(username?.value).toBe("name");
    expect(password?.value).toBe("password");
    expect(username).toHaveAttribute("required");
    expect(password).toHaveAttribute("required");
  });
  it("it should faill login action", async () => {
    renderWithRouter(<Login />);

    const error = { response: { status: 401 } };
    mockAxios.post.mockRejectedValueOnce(error);
    const username = screen.getByLabelText("Usuário:");
    const password = screen.getByLabelText("Senha:");
    const button = screen.getByText("Entrar");

    fireEvent.change(username, { target: { value: "name" } });
    fireEvent.change(password, { target: { value: "password" } });

    fireEvent.click(button);
    await waitFor(async () => {
      const failLogin = await screen.findByText("Usuário ou senha inválidos");
      expect(failLogin).toBeInTheDocument();
    });
  });
  it("it should be possible to log in", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    renderWithRouter(<Login />);

    const response = { data: { access: "token" } };

    mockAxios.post.mockResolvedValueOnce(response);

    const username = screen.getByLabelText("Usuário:");
    const password = screen.getByLabelText("Senha:");
    const button = screen.getByText("Entrar");

    fireEvent.change(username, { target: { value: "name" } });
    fireEvent.change(password, { target: { value: "password" } });

    fireEvent.click(button);
    const failLogin = screen.queryByText("Usuário ou senha inválidos");
    expect(failLogin).not.toBeInTheDocument();
  });
});
