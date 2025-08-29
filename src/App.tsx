import { createBrowserRouter, RouterProvider } from "react-router";
import { CustomerPage } from "./pages/customer-page/CustomerPage.tsx";

const router = createBrowserRouter([{ path: "/", element: <CustomerPage /> }]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
