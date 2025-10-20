import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ChatIA } from "./pages/ChatIA";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import NotFound from "./pages/notFound/NotFound";
import { RegisterPage } from "./pages/RegisterPage";
import { supabase } from "./supabaseClient";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);

      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("auth_id", session.user.id)
          .single();

        if (!error && data.role === "Admin") {
          setIsAdmin(true);
        }
      }

      setIsLoading(false);
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);

        if (session) {
          supabase
            .from("users")
            .select("role")
            .eq("auth_id", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (!error && data.role === "Admin") {
                setIsAdmin(true);
              }
            });
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        {isAuthenticated ? (
          isAdmin ? (
            <Route path="/dashboard" element={<AdminDashboardPage />} />
          ) : (
            <Route path="/dashboard" element={<DashboardPage />} />
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* Ruta para páginas no encontradas */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

        <Route path="/chat" element={<ChatIA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
