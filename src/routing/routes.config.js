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
  CoursePage,
  CourseParameters
} from "../pages";
import CourseParameters2 from "../pages_OLD/Course/CourseParameters2";
import Course from '../pages_OLD/Course/Course';

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
    {
      component: Course,
      path: "/courses/:id/old",
      isAuthenticated: true,
    },
    {
      component: CourseParameters,
      path: "/courses/:id/parameters",
      isAuthenticated: true,
    },
    {
      component: CourseParameters2,
      path: "/courses/:id/parameters/old",
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