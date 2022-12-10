import Course from "../pages/Course";
import Home from "../pages/Home";
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
]