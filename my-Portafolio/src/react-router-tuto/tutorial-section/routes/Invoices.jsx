import { getInvoices } from "../../data";
import {
  Outlet,
  NavLink,
  useSearchParams,
  useLocation,
} from "react-router-dom";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  const filtrarResultados = (event) => {
    let filter = event.target.value;
    return filter ? setSearchParams({ filter }) : setSearchParams({});
  };

  const data = invoices
    .filter((invoice) => {
      let filter = searchParams.get("filter");
      if (!filter) return true;
      let name = invoice.name.toLowerCase();
      return name.startsWith(filter.toLowerCase());
    })
    .map((invoice) => (
      <NavLink
        style={({ isActive }) => ({
          display: "block",
          margin: "1rem 0",
          color: isActive ? "red" : "",
        })}
        to={`/invoices/${invoice.number}`}
        key={invoice.number}
      >
        {invoice.name}
      </NavLink>
    ));

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={filtrarResultados}
        />
        {data}
      </nav>
      <Outlet />
    </div>
  );
}

function QueryNavLink({ to, ...props }) {
  //See CUSTOM BEHAVIOR
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

/*
You can do the same thing with className on NavLink:

/ normal string
<NavLink className="red" />

/ function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
*/

/*
👉Search params are like URL params but they sit in a different position in the URL. 
Instead of being in the normal URL segments separated by /, they are at the end after a ?. 
You've seen them across the web like "/login?success=1" or "/shoes?brand=nike&sort=asc&sortby=price".

  ❗React Router makes it easy to read and manipulate the search params with useSearchParams. 
    It works a lot like React.useState() but stores and sets the state in the URL search params instead of in memory.
    We set the value of the input to whatever is in the filter search param (it's just like useState but in the URLSearchParams instead!)
    We filter our list of invoices based on the filter search param.
/https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params
*/

/*
👉CUSTOM BEHAVIOR
https://reactrouter.com/docs/en/v6/getting-started/tutorial#custom-behavior
    If you filter the list and then click a link, you'll notice that the list is no longer filtered 
    and the search param is cleared from the <input> and the URL. You might want this, you might not!
     Maybe you want to keep the list filtered and keep the param in the URL.

    We can persist the query string when we click a link by adding it to the link's href. We'll do that by composing NavLink 
    and ➡️useLocation from React Router into our own QueryNavLink (maybe there's a better name, but that's what we're going with today).
    You can put that code anywhere you want in your app and then replace your NavLink in src/routes/invoices.jsx with QueryNavLink 
    and you're done.
*/
