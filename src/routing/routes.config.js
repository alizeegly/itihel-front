import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Auth/LoginPage";
import Login from "../components/auth/Login";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFound from "../pages/Errors/NotFound";
import Landing from "../pages/Landing/Landing";

export default {
  routes: [
    {
      component: Landing,
      path: '/',
      isAuthenticated: false,
    },
    {
      component: RegisterPage,
      path: "/register",
      isAuthenticated: false,
    },
    {
      component: LoginPage,
      path: "/login",
      isAuthenticated: false,
    },
    {
      component: Dashboard,
      path: "/dashboard",
      isAuthenticated: true,
    },

    // A laisser en dernier
    {
      component: NotFound,
      path: "",
      isAuthenticated: false,
    },
  ]
};