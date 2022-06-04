import { 
  Dashboard, 
  Landing, 
  Profile,
  LoginPage,
  RegisterPage,
  NotFound,
  MyCourses,
  CGU
} from "../pages";
import SharedCourses from "../pages/ListCourses/SharedCourses";

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
    {
      component: MyCourses,
      path: "/courses",
      isAuthenticated: true,
    },
    {
      component: SharedCourses,
      path: "/shared-courses",
      isAuthenticated: true,
    },
    {
      component: CGU,
      path: "/cgu",
      isAuthenticated: false,
    },


    // A laisser en dernier
    {
      component: NotFound,
      path: "",
      isAuthenticated: false,
    },
  ]
};