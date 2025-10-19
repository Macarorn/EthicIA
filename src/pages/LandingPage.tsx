import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};
