/** @format */

import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const container = document.querySelector("#modals");
  return createPortal(children, container);
}
