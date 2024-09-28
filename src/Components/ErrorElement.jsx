import { useRouteError } from "react-router-dom";
import "./ErrorElement.css";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <a href="/" className="back-home">
        Go Back Home
      </a>
    </div>
  );
}

export default ErrorPage;
