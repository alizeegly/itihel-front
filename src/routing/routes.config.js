import { 
  Dashboard, 
  Landing, 
  Profile,
  LoginPage,
  RegisterPage,
  NotFound
} from "../pages";

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
    {
      component: Profile,
      path: "/profile",
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