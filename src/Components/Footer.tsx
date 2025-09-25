import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-2 mt-auto text-sm font-bold shadow"
      style={{
        background: "#2563eb",
        color: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100vw",
        zIndex: 40,
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      &copy; {new Date().getFullYear()} JobTracker. All rights reserved.
    </footer>
  );
}
