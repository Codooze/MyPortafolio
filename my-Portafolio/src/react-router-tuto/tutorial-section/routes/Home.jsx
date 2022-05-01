import { Link, Outlet } from "react-router-dom";
export default function Home() {
  return (
    <>
      <h1>📘 Bookkeeper</h1>
      <h4>
        Pro tip: Modifica Invoices usando lo que esta en Custom Behavior ➡️
        <span style={{ fontSize: "70%" }}>Invoices.jxs</span>
      </h4>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </>
  );
}
