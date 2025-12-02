import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modifyBill, setModifyBill] = useState(false);

    // ⭐ NEW STATE FOR SHORTCUT MODAL ⭐
  const [shortcutOpen, setShortcutOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModifyBill = () => setModifyBill(true);
  const clodeModifyBill = () => setModifyBill(false);

   // ⭐ NEW OPEN/CLOSE FUNCTIONS ⭐
  const openShortcut = () => setShortcutOpen(true);
  const closeShortcut = () => setShortcutOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,

        modifyBill,
        setModifyBill,
        openModifyBill,
        clodeModifyBill,

        // NEW EXPORT
        shortcutOpen,
        openShortcut,
        closeShortcut,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
