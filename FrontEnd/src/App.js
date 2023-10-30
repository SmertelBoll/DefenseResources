import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import RegistrationForm from "./pages/Auth/RegistrationForm";
import LoginForm from "./pages/Auth/LoginForm";
import CreateFormulary from "./pages/CreateFormulary";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/AuthSlice";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "./theme/theme";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const savedMode = window.localStorage.getItem("mode");

  const [mode, setMode] = React.useState(savedMode ? savedMode : "light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        window.localStorage.setItem("mode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header colorMode={colorMode} mode={mode} />
        <main style={{ flex: "1 1 auto", backgroundColor: theme.palette.bg.main }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create" element={<CreateFormulary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
