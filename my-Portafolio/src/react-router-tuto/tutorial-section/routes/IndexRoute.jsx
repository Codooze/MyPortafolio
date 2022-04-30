export default function IndexRoute() {
  return (
    <main style={{ padding: "1rem" }}>
      <p>Select an invoice</p>
    </main>
  );
}

/*
Index routes render in the parent routes outlet at the parent route's path.
Index routes match when a parent route matches but none of the other children match.
Index routes are the default child route for a parent route.
Index routes render when the user hasn't clicked one of the items in a navigation list yet.
*/
