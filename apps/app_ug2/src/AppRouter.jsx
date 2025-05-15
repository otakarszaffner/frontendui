import { SubjectRouterSegment } from "C:/Users/vojta/Documents/frontendui/packages/semester_page_subject/src/Subject/Pages/SubjectRouterSegment.jsx";
import { SubjectPage } from "C:/Users/vojta/Documents/frontendui/packages/semester_page_subject/src/Subject/Pages/SubjectPage.jsx"
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {
        path: "/hello/:id",
        element: <SubjectPage/>
    },
    SubjectRouterSegment,
    
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

