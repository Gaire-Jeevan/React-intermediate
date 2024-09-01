import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserDetailPage from "./UserDetailPage";
import UserListPage from "./UserListPage";

const router = createBrowserRouter([
    {path: '/', element: <HomePage />},
    {path: '/users', element: <UserListPage />},
    {path: '/users/:id', element: <UserListPage />},
    {path: '/contact', element: <UserDetailPage />},
])

export default router;