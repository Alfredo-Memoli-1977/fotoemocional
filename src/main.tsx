import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PhotoApp from "./PhotoApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhotoApp />
  </StrictMode>,
);
