import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MenuMobile } from "./components/MenuMobile/index";
import { Navbar } from "./components/Navbar/index";

import { Home } from "./pages/Home/index";
import { ThemeProvider } from "./contexts/ThemeProvider/theme-provider";
import { useAuth } from "./contexts/AuthContext/authContext";
import { Auth } from "./pages/Auth";
import { CreateMovie } from "./pages/CreateMovie/CreateMovie";
import { Dashboard } from "./pages/Dashboard";
import { MovieDetails } from "./pages/MovieDetails";
import { MyAccount } from "./pages/MyAccount";
import { About } from "./pages/About";


function App() {
  const { token } = useAuth()
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <BrowserRouter>
          <Navbar setMenuIsVisible={setMenuIsVisible} />
          <MenuMobile
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/account"
              element={token ? <MyAccount /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!token ? <Auth /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/movies/create"
              element={token ? <CreateMovie /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/projects/edit/:id"
              element={user ? <EditProject /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/movies/:id"
              element={token ? <MovieDetails /> : <Navigate to="/" />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
