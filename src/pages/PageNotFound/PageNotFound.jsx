import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div id="page-not-found">
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-secondary">
        Got back to Homepage
      </Link>
    </div>
  );
}
