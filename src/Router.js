import React from "react";
import TwitterApp from "./components/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={TwitterApp} />
      </div>
    </Router>
  );
};
