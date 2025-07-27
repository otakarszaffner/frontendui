
import { SemesterPage, SemesterPageReadonly, SemesterRouterSegment, SemesterRouterSegmentReadonly, SubjectPage, SubjectPageReadonly, SubjectRouterSegment } from "C:/Users/vojta/Documents/frontendui/packages/semester_page_subject/src"
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
 
    SemesterRouterSegment,
    SemesterRouterSegmentReadonly,
    {
        // missing route for semester/subject/view
        path: "/semester/subject/view/:id", // http://localhost:5173/semester/subject/view/49ac365e-c9be-4752-9a46-21542ed361df
        element: <SemesterPage/>
    },
    {
        // readonly version of semester/subject
        path: "/semester/subject/readonly/:id", // http://localhost:5173/semester/subject/readonly/49ac365e-c9be-4752-9a46-21542ed361df
        element: <SemesterPageReadonly/>
    },
    {
        // novy, tady na tom makej hobo
        path: "/subject/semester/view/:id", // http://localhost:5173/subject/semester/view/49ac365e-c9be-4752-9a46-21542ed361df
        element: <SubjectPage/>
    },
    {
        // readonly version
        path: "/subject/semester/readonly/:id", // http://localhost:5173/subject/semester/readonly/49ac365e-c9be-4752-9a46-21542ed361df
        element: <SubjectPageReadonly/>
    },
    SubjectRouterSegment,
    
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

