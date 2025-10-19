import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage the application.</p>
      <p>Administradooor</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
