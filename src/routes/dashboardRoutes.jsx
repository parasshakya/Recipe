import { IconBook, IconBookmark, IconDownload, IconHome, IconPlus, IconSettings, IconTable, IconToolsKitchen, IconToolsKitchen3, IconUpload, IconWall, IconWriting, IconWritingSign } from "@tabler/icons-react";
import { CreateRecipes } from "../pages/CreateRecipes";
import { MyRecipes } from "../pages/MyRecipes";
import { SavedRecipes } from "../pages/SavedRecipes";
import { Settings } from "../pages/Settings";
import { UserFeed } from "../pages/UserFeed";


export const dashboardRoutes = [
    {
        name: "Home",
        path: "/home",
        element: <UserFeed/>,
        icon: <IconHome/>
    },
    {
        name:"My Recipes",
        path: "/myRecipes",
        element: <MyRecipes/>,
        icon: <IconToolsKitchen3/>
    },
    {
        name: "Create Recipe",
        path: "/createRecipe",
        element: <CreateRecipes/>,
        icon: <IconWritingSign/>
    },
    {
        name: "Saved Recipes",
        path: "/savedRecipes",
        element: <SavedRecipes/>,
        icon: <IconBookmark/>

    },
    {
        name: "Settings",
        path: "/settings",
        element: <Settings/>,
        icon: <IconSettings/>

    }
]