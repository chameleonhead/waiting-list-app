import * as React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouterProps,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { User } from "./models";

type ProtectedRouteProps = { user: User | null } & RouteProps<string>;

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user, component, ...routeProps } = props;
  return (
    <Route
      {...routeProps}
      render={(props: RouterProps) => {
        if (user) {
          const Component = component as any;
          return <Component {...routeProps} />;
        }
        const href = props.history.createHref(props.history.location);
        return (
          <Redirect
            to={
              !href || href === "/"
                ? "/login"
                : "/login?returnUrl=" + encodeURIComponent(href)
            }
          />
        );
      }}
    />
  );
};

const App = () => {
  const [user, setUser] = React.useState(null as User | null);
  return (
    <Switch>
      <ProtectedRoute user={user} path="/" exact component={HomePage} />
      <Route
        path="/login"
        component={(props: RouterProps) => {
          if (user) {
            const search = props.history.location.search;
            const returnUrl = search
              ? new URLSearchParams(decodeURIComponent(search)).get("returnUrl")
              : "";
            return <Redirect to={returnUrl || "/"} />;
          } else {
            return <LoginPage {...props} onLoginSuccess={setUser} />;
          }
        }}
      />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  );
};

export default App;
