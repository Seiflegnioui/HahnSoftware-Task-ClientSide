import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import UserComponent from "../Features/User/UserComponent";
import Home from "../Components/Home";

export const router = createBrowserRouter([
    {
        path:"guest",
        element:<GuestLayout/>,
        children:[
            {
                path:"user",
                element:<UserComponent/>
            },
            {
                path:"home",
                element:<Home/>
            }
        ]
    }
])