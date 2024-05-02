import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./layout/auth/login";
import Register from "./layout/auth/register";
import MainLayout from "./layout/MainLayout";
import Searchboard from "./layout/Searchboard";
import useDarkMode from "./hooks/useDarkMode";

import {
  BlockExplorer,
  AddressExplorer,
  TransactionsExplorer,
  TxExplorer,
  BlocksExplorer,
} from "./layout/ExplorerViews";

import "./App.css";
import { WebSocketProvider } from "./hooks/useWebsocket";

function AppLayout({ children }) {
  return (
    <>
      <Searchboard />
      {children}
    </>
  );
}

function App() {
  const { darkModeEnabled, toggleMode } = useDarkMode();
  return (
    <Router>
      <div className="App">
        <Navbar darkModeEnabled={darkModeEnabled} toggleMode={toggleMode} />
        <div className="w-full bg-board dark:bg-[#030921]">
          <WebSocketProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <AppLayout>
                    <MainLayout />
                  </AppLayout>
                }
              />
              <Route
                path="/block/:id"
                element={
                  <AppLayout>
                    <BlockExplorer />
                  </AppLayout>
                }
              />
              <Route
                path="/tx/:id"
                element={
                  <AppLayout>
                    <TxExplorer />
                  </AppLayout>
                }
              />
              <Route
                path="/address/:id"
                element={
                  <AppLayout>
                    <AddressExplorer />
                  </AppLayout>
                }
              />
              <Route
                path="/transactions/"
                element={
                  <AppLayout>
                    <TransactionsExplorer />
                  </AppLayout>
                }
              />
              <Route
                path="/blocks/"
                element={
                  <AppLayout>
                    <BlocksExplorer />
                  </AppLayout>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </WebSocketProvider>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
