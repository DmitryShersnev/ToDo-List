import "./App.css";
import { Suspense } from "react";
import ToDo from "./ToDo";
import { Routes, Route } from "react-router";
import RegLog from "./login/RegLog";
import PrivateRoute from "./login/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/reglog"
          element={
            <Suspense fallback={"Загрузка..."}>
              <RegLog />
            </Suspense>
          }
        />
        <Route
          element={
            <Suspense fallback={"Загрузка..."}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={"Загрузка..."}>
                <ToDo />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
