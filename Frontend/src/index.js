import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import BookProvider from "./hoc/Apollo";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BookProvider>
    <Router>
      <App />
    </Router>
    </BookProvider>
);

reportWebVitals();
