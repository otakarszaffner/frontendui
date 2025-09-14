import { SemesterReadonlyURI } from "../Components/SemesterLinkReadonly"
import { SemesterPageReadonly } from "./SemesterPageReadonly"

/**
 * A router segment definition for the readonly Semester page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `SemesterReadonlyURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} SemesterRouterSegmentReadonly
 * @property {string} path - The URL path pattern for the route, e.g., "/semester/semester/readonly/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <SemesterPageReadonly />.
 */
export const SemesterRouterSegmentReadonly = {
    path: `/semester/semester/readonly/:id`,
    element: <SemesterPageReadonly />,
}
