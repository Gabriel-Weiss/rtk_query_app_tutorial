import { renderWithProviders, waitFor, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import AddMarketForm from "../AddMarketForm";

describe("AddMarketForm Test", () => {
  beforeEach(() => {
    renderWithProviders(<AddMarketForm />);
  });

  describe("Test elements rendering", () => {
    it("should render the add market form", () => {
      // screen.debug();
    });

    it("Labels for add form inputs should be present", () => {
      expect(screen.getByText(/market name/i)).toBeInTheDocument();
      expect(screen.getByText(/price level/i)).toBeInTheDocument();
      expect(screen.getByText(/average delivery time/i)).toBeInTheDocument();
    });

    it("Input fields should be visible", () => {
      expect(screen.getByTestId("name")).toBeInTheDocument();
      expect(screen.getByTestId("price_level")).toBeInTheDocument();
      expect(screen.getByTestId("avg_delivery_time")).toBeInTheDocument();
    });
  });

  describe("Test input values", () => {
    let user;

    beforeAll(() => {
      user = userEvent.setup();
    });

    it("should submit form inputs with values", () => {
      const handleAddMarket = jest.fn();
      const name = screen.getByTestId("name");
      const price = screen.getByTestId("price_level");
      const time = screen.getByTestId("avg_delivery_time");
      const button = screen.getByTestId("addMarketButton");

      user.type(name, "test name");
      user.type(price, 1);
      user.type(time, 30);
      user.click(button);

      waitFor(() =>
        expect(handleAddMarket).toHaveBeenCalledWith({
          name: "test name",
          price_level: "1",
          avg_delivery_time: "30",
        })
      );
    });
  });
});
