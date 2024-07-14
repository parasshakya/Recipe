import { About } from "../pages/About";
import { BlogPage } from "../pages/BlogPage";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";


 export const welcomeRoutes = [
    {
        name: "Home",
        path: "/home",
        element: <Home/>
    },
    {
        name: "Blog",
        path: "/blog",
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