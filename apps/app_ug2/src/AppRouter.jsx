
import { SemesterPage, SemesterRouterSegment, SubjectPage, SubjectRouterSegment } from "C:/Users/otaka/Documents/GitHub/frontendui/packages/semester_page_subject";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {
        path: "/semester/:id",
        element: <SemesterPage/>
    },
    SemesterRouterSegment,
    {
        path: "/subject/:id",
        element: <SubjectPage/>
    },
    SubjectRouterSegment,
    
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

