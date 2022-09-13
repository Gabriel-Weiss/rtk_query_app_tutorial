import { renderWithProviders, waitFor, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

describe("Login Test", () => {
  beforeEach(() => {
    renderWithProviders(<Login />);
  });

  describe("Test elements rendering", () => {
    it("should render the login component", () => {
      // screen.debug();
    });

    it("should render the labels in the login form", () => {
      expect(screen.getByText(/username/i)).toBeInTheDocument();
      expect(screen.getByText(/password/i)).toBeInTheDocument();
    });

    it("should render the input fields in the login form", () => {
      expect(screen.getByTestId("username")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
    });

    it("should render the submit button in the login form", () => {
      expect(screen.getByTestId("loginButton")).toBeInTheDocument();
    });
  });

  describe("Test input values", () => {
    let user;

    beforeAll(() => {
      user = userEvent.setup();
    });

    it("should be able to type inputs", async () => {
      const usernameInput = screen.getByTestId("username");
      const passwordInput = screen.getByTestId("password");

      await user.type(usernameInput, "test user");
      await user.type(passwordInput, "test password");

      expect(usernameInput.value).toBe("test user");
      expect(passwordInput.value).toBe("test password");
    });

    it("should submit form inputs with values", () => {
      const handleLogin = jest.fn();
      const usernameInput = screen.getByTestId("username");
      const passwordInput = screen.getByTestId("password");
      const loginButton = screen.getByTestId("loginButton");

      user.type(usernameInput, "test user");
      user.type(passwordInput, "test password");
      user.click(loginButton);

      waitFor(() =>
        expect(handleLogin).toHaveBeenCalledWith({
          username: "test user",
          password: "test password",
        })
      );
    });
  });
});
