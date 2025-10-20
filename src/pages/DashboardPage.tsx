import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export const DashboardPage = () => {
  const [userData, setUserData] = useState({ name: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("name, role")
          .eq("auth_id", user.id)
          .single();

        if (!error && data) {
          setUserData({ name: data.name, role: data.role });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Welcome, {userData.name || "User"}!</p>
      <p>Your role: {userData.role || "Unknown"}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/chat">
        <button>Ir al Chat IA</button>
      </Link>
    </div>
  );
};
