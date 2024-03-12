import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "../Styles/App.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  var errorMessage: any;
  if(isRouteErrorResponse(error)){
    errorMessage = error.statusText;
  } else {
    errorMessage = "Error ID Unknown";
  }

  return (
    <div id="error-page">
      <h1>Oh noo!</h1>
      <p>This is an Error Page.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
