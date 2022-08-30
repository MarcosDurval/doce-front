import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const renderWithRouter = (component: React.ReactElement) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    ),
    history,
  };
};

export default renderWithRouter;
