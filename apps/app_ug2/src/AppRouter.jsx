
import { SemesterPage, SemesterRouterSegment, SubjectPage, SubjectRouterSegment } from "C:/Users/otaka/Documents/GitHub/frontendui/packages/semester_page_subject";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {
        // stary, pro inspiraci
        path: "/semester/subject/view/:id", //http://localhost:5173/subject/semester/view/3c0f46a2-f7ba-4ae5-9a07-2c21662db562
        element: <SemesterPage/>
    },
    SemesterRouterSegment,
    {
        // novy, tady na tom makej hobo
        path: "/subject/semester/view/:id", // http://localhost:5173/semester/subject/view/49ac365e-c9be-4752-9a46-21542ed361df
        element: <SubjectPage/>
    },
    SubjectRouterSegment,
    
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

