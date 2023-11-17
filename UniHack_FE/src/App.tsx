import React from "react";
import { Store } from "./Stores";
import { Router } from "components/router";

export function App() {
  return (
    <Store>
      <Router />
    </Store>
  );
}
