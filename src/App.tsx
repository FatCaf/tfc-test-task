import { createBrowserRouter, RouterProvider } from "react-router";
import { CustomerPage } from "./pages/customer-page/CustomerPage.tsx";
import { CustomerDetails } from "./pages/customer-details-page/CustomerDetailsPage.tsx";
import { NotFoundPage } from "./pages/not-found-page/NotFoundPage.tsx";

const router = createBrowserRouter([
    { path: "/", element: <CustomerPage /> },
    { path: "/customer/:id", element: <CustomerDetails /> },
    { path: "*", element: <NotFoundPage /> },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
