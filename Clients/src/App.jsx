// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MyModal from "./Components/global/MyModal";
import { useModal } from "./Components/global/ModalContext";
import PopupModel from "./Components/global/PopupModel";
import ModifyBill from "./Components/ModifyBill";

import ShortcutModal from "./Components/global/ShortcutModal";

const App = () => {
  const { openModal, openShortcut } = useModal();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ALT + A = open main modal
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        openModal();
      }

      // CTRL + K = open shortcut modal
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openShortcut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, openShortcut]);

  return (
    <BrowserRouter>
      <ModifyBill />
      <AppRoutes />
      <PopupModel />
      <MyModal />
      <ShortcutModal />
    </BrowserRouter>
  );
};

export default App;
