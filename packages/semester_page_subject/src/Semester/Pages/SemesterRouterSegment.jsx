import { SemesterURI } from "../Components/SemesterLink"
import { SemesterPage } from "./SemesterPage"

/**
 * A router segment definition for the Semester page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `SemesterURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} SemesterRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/semester/semester/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <SemesterPage />.
 */
export const SemesterRouterSegment = {
    path: `/${SemesterURI}:id`,
    element: <SemesterPage />,
}