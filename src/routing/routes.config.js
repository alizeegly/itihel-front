import { 
  DashboardPage, 
  LandingPage, 
  ProfilePage,
  LoginPage,
  RegisterPage,
  Error404Page,
  MyCoursesPage,
  CGU,
  SharedCoursesPage,
  PublicCoursesPage,
  CoursePage
} from "../pages";

export default {
  routes: [
    {
      component: LandingPage,
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
      component: DashboardPage,
      path: "/dashboard",
      isAuthenticated: true,
    },
    {
      component: ProfilePage,
      path: "/profile",
      isAuthenticated: true,
    },
    {
      component: MyCoursesPage,
      path: "/courses",
      isAuthenticated: true,
    },
    {
      component: SharedCoursesPage,
      path: "/shared-courses",
      isAuthenticated: true,
    },
    {
      component: PublicCoursesPage,
      path: "/public-courses",
      isAuthenticated: true,
    },
    {
      component: CGU,
      path: "/cgu",
      isAuthenticated: false,
    },
    {
      component: CoursePage,
      path: "/courses/:id",
      isAuthenticated: true,
    },


    // A laisser en dernier
    {
      component: Error404Page,
      path: "",
      isAuthenticated: false,
    },
  ]
};