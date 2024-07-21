import { About } from "../pages/About";
import { BlogPage } from "../pages/BlogPage";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { Recipes } from "../pages/Recipes";


 export const welcomeRoutes = [
    {
        name: "Home",
        path: "/home",
        element: <Home/>
    },
    {
        name: "Recipes",
        path: "/recipes",
        element: <Recipes/>
    },
    {
        name: "Blog",
        path: "/blogs",
        element: <BlogPage/>
    },
    {
        name: "About",
        path: "/about",
        element: <About/>

    },
    {

        name: "Contact",
        path: "/contact",
        element: <Contact/>

    },
  
  

];