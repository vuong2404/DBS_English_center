import Course from "../pages/Course";
import Home from "../pages/Home";
import RegisterCourses from "../pages/RegisterCourses";
import RegisterForms from "../pages/RegisterForms";
import Student from "../pages/Student";

export const routes = [
    {
        path: '/', component: Home,
    },
    {
        path: '/courses', component: Course,
    },
    {
        path: '/student', component: Student,
    },

    {
        path: '/register', component: RegisterCourses
    },

    {
        path: '/register-form', component: RegisterForms
    },


   
]