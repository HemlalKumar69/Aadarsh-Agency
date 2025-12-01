import React from "react";

const shortcuts = [
    { key: "F4", action: "Open Quick Link" },
    { key: "Shift + S", action: "Open Sidebar" },
    { key: "A", action: "Add New Billing Page" },
    { key: "I", action: "Add Invoice" },
    { key: "F2", action: "New Line" },
    { key: "F3", action: "Delete Row" },
    { key: "Enter", action: "Save Row" },
    { key: "F11", action: "Submit" },
    { key: "Enter", action: "Navigate" },
    { key: "F2", action: "Add Row" },
    { key: "ESC", action: "Cancel" },
    { key: "F9", action: "Add Party" },
    { key: "F10", action: "Submit" },
];

export default function Shortcuts() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center bg-gray-800 text-white py-3 rounded-lg">
                    ⚡ Software Shortcut Keys
                </h1>

                <table className="w-full mt-6 border border-gray-400">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="border border-gray-400 py-2 px-3 text-left">
                                Shortcut
                            </th>
                            <th className="border border-gray-400 py-2 px-3 text-left">
                                Function
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {shortcuts.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 py-2 px-3 font-semibold">
                                    {item.key}
                                </td>
                                <td className="border border-gray-300 py-2 px-3">
                                    {item.action}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
