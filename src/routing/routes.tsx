import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserDetailPage from "./UserDetailPage";
import UserListPage from "./UserListPage";
import ContactPage from "./ContactPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "users", element: <UserListPage /> },
      { path: "users/:id", element: <UserDetailPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default router;
