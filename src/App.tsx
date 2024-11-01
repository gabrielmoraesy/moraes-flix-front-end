// React
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import { MenuMobile } from "./components/MenuMobile/index";
import { Navbar } from "./components/Navbar/index";

// Pages
import { Home } from "./pages/Home/index";
import { ThemeProvider } from "./components/ThemeProvider/theme-provider";


function App() {
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
            {/* <Route
              path="/account"
              element={user ? <Account /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/projects/create"
              element={user ? <CreateProject /> : <Navigate to="/" />}
            />
            <Route
              path="/projects/edit/:id"
              element={user ? <EditProject /> : <Navigate to="/" />}
            />
            <Route
              path="/tasks/edit/:idProject/:idTask"
              element={user ? <EditTask /> : <Navigate to="/" />}
            />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route
              path="/tasks/:idProject/:idTask"
              element={user ? <TaskDetails /> : <Navigate to="/" />}
            />
            <Route path="/about" element={<About />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
