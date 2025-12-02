import { useModal } from "./ModalContext";

const ShortcutModal = () => {
    const { shortcutOpen, closeShortcut } = useModal();

    if (!shortcutOpen) return null;

    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <h2 style={{ marginBottom: "15px" }}>All Shortcut Keys</h2>


                {/*     DASHBOARD SHORTCUTS  */}

                <h3 style={styles.heading}>1. Dashboard</h3>

                <div style={styles.list}>
                    <p> → press <b>Shift + S</b> to Open Sidebar</p>
                    <p> → press <b>F4</b> to open Quick Link</p>
                </div>

                {/*   ADD NEW BILLING PAGE */}
                
                <h3 style={styles.heading}>2. Billing - Add New Billing Page</h3>

                <div style={styles.list}>
                    <p> → press <b>F2</b> to Add New Line</p>
                    <p> → press <b>F3</b> for Delete Selected Row</p>
                    <p> → press <b>Enter</b> for Save Row</p>
                    <p> → press <b>F10</b> to Submit Bill</p>
                </div>

                {/*  PURCHASE BILL SHORTCUTS */}
                
                <h3 style={styles.heading}>3. Purchase Bill – Purchase Page</h3>

                <div style={styles.list}>
                    <p> → press <b>Enter</b> to Navigate</p>
                    <p> → press <b>F2</b> to Add New Row</p>
                    <p> → press <b>Esc</b> to Cancel Row</p>
                    <p> → press <b>F9</b> to Add Party</p>
                    <p> → press <b>F10</b> to Submit Purchase Bill</p>
                </div>

                <button onClick={closeShortcut} style={styles.closeBtn}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    modal: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        width: "70%",
        maxHeight: "85vh",
        overflowY: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    },
    heading: {
        marginTop: "20px",
        marginBottom: "10px",
        fontSize: "1.2rem",
        borderBottom: "1px solid #ddd",
        paddingBottom: "5px",
    },
    list: {
        lineHeight: "1.8",
        fontSize: "1.1rem",
        marginBottom: "15px",
    },
    closeBtn: {
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "1rem",
        cursor: "pointer",
    },
};

export default ShortcutModal;

