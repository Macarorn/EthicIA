import { useState } from "react";
import { supabase } from "../supabaseClient";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Failed to register user.");
        return;
      }

      if (!authData || !authData.user) {
        setError("Failed to retrieve user data after registration.");
        return;
      }

      const { error: dbError } = await supabase.from("users").insert([
        {
          auth_id: authData.user.id,
          email,
        },
      ]);

      if (dbError) {
        setError(dbError.message || "Failed to save user data.");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            Check your email to confirm your account!
          </p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
