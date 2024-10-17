import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";


export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false,
    },
];
