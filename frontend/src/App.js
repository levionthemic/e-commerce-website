import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Loading from "./components/Loading/Loading";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <div
        style={{ height: "100vh", width: "100%", backgroundColor: "#f0f0f0" }}
      >
        <Loading isLoading={false}>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <DefaultComponent>
                        <Page />
                      </DefaultComponent>
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <>
                      <Page />
                    </>
                  }
                />
              );
              return Layout;
            })}
          </Routes>
        </Loading>
      </div>
    </>
  );
}

export default App;
