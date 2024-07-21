import { IconBook, IconDownload, IconSettings, IconTable, IconUpload, IconWall, IconWriting } from "@tabler/icons-react";
import { CreateRecipes } from "../pages/CreateRecipes";
import { MyRecipes } from "../pages/MyRecipes";
import { SavedRecipes } from "../pages/SavedRecipes";
import { Settings } from "../pages/Settings";
import { UserFeed } from "../pages/UserFeed";


export const dashboardRoutes = [
    {
        name: "Feed",
        path: "/feed",
        element: <UserFeed/>,
        icon: <IconWall/>
    },
    {
        name:"My Recipes",
        path: "/myRecipes",
        element: <MyRecipes/>,
        icon: <IconBook/>
    },
    {
        name: "Create Recipe",
        path: "/createRecipe",
        element: <CreateRecipes/>,
        icon: <IconWriting/>
    },
    {
        name: "Saved Recipes",
        path: "/savedRecipes",
        element: <SavedRecipes/>,
        icon: <IconDownload/>

    },
    {
        name: "Settings",
        path: "/settings",
        element: <Settings/>,
        icon: <IconSettings/>

    }
]