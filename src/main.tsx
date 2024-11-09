import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";
import Error401 from "./container/error/401error/401error.tsx";
import Error404 from "./container/error/404error/404error.tsx";
import Error500 from "./container/error/500error/500error.tsx";
import _404 from "./pages/_404";
import AppAuthProtected from "./components/features/app-auth-protected/index.tsx";
import { authProtectedRoutes } from "./routes/protected-route.ts";
import { AppAuthProvider } from "./providers/app-auth-provider/index.tsx";
import { publicRoutes } from "./routes/public-route.ts";
import { RouteNames } from "./constants/routes.ts";
import Login from "./pages/authentication/login/index.tsx";
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <Provider store={store}>
          <AppAuthProvider>
            <Routes>
              <Route path="/" element={<Navigate to={RouteNames.ADVERTISES} />} />

              <Route path={`${import.meta.env.BASE_URL}`} element={<AppAuthProtected />}>
                {
                  authProtectedRoutes.map((route) => (
                    <Route
                      path={`${import.meta.env.BASE_URL}`}
                      element={<App />}
                      key={route.path}
                    >
                      <Route
                        path={`${import.meta.env.BASE_URL + route.path}`}
                        element={
                          <route.component />
                        }
                      />
                    </Route>
                  ))
                }
              </Route>

              <Route path={`${import.meta.env.BASE_URL}`}
              >
                <Route
                  path={`${import.meta.env.BASE_URL + RouteNames.LOGIN}`}
                  element={<Login />}
                />
                <Route
                  path={`${import.meta.env.BASE_URL + RouteNames.LOGOUT}`}
                  element={<Login />}
                />

                {
                  publicRoutes.map((route, index) => (
                    <Route
                      path={`${import.meta.env.BASE_URL}`}
                      element={<App />}
                      key={index}
                    >
                      <Route
                        path={`${import.meta.env.BASE_URL + route.path}`}
                        element={
                          <route.component />
                        }
                      />
                    </Route>
                  ))
                }

                <Route
                  path="*"
                  element={<Error404 />}
                />
                <Route
                  path={`${import.meta.env.BASE_URL}error/401error`}
                  element={<Error401 />}
                />
                <Route
                  path={`${import.meta.env.BASE_URL}error/500error`}
                  element={<Error500 />}
                />
              </Route>
            </Routes>
          </AppAuthProvider>
        </Provider>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
