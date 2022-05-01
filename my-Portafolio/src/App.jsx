import { Route, Routes } from "react-router-dom";
import Expenses from "./react-router-tuto/tutorial-section/routes/Expenses";
import Home from "./react-router-tuto/tutorial-section/routes/Home";
import IndexRoute from "./react-router-tuto/tutorial-section/routes/IndexRoute";
import Invoice from "./react-router-tuto/tutorial-section/routes/Invoice";
import Invoices from "./react-router-tuto/tutorial-section/routes/Invoices";
import NoMatch from "./react-router-tuto/tutorial-section/routes/NoMatch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          <Route index element={<IndexRoute />} />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

// 👉NAVIGATION: Use Link to let the user change the URL or useNavigate to do it yourself (like after form submissions):
//Link is changing the URL without causing a full page reload.

/* 👉Let's get some automatic, persistent layout handling by doing just two things:
    Nest the routes inside of the Home route
    Render an Outlet
 * However, before (2) will work we need to render an Outlet in the Home.jsx "parent" route.
*/

/* 👉URL Params:
 We'd like to render the invoice number instead of "???". Normally in React you'd pass this as a prop: <Invoice invoiceId="123" />, 
  but you don't control that information because it comes from the URL.

  Let's define a route that will match these kinds of URLs and enable us to get the invoice number from it. 
  *then we need to add an Outlet to the parent Invoices to be able to render its child invoice and we also need add useParams() logic 
      Note that the key of the param on the params object is the same as the dynamic segment in the route path:
      :invoiceId -> params.invoiceId
*/

// 👉Active links: añadir style a un link deacuerdo a si uno lo selecciona  --> ver Invoices.jsx

/* 👉Navigating Programmatically   
sometimes you, the programmer, want to change the URL. A very common use case is after a data update like creating or deleting a record.
Let's add a button that marks the invoice as paid and then navigates to the index route.
    -see data.js / deleteInvoice(number)
    -invoice.jsx
    */
