import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const SubjectReadonlyURI = `/subject/subject/readonly/`;

/**
 * A React component that renders a `ProxyLink` to a "subject" entity's readonly view page.
 *
 * The target URL is dynamically constructed using the `subject` object's `id`, and the link displays
 * the `subject` object's `name` as its clickable content. This is the readonly version that navigates
 * to readonly URLs.
 *
 * @function SubjectLinkReadonly
 * @param {Object} props - The properties for the `SubjectLinkReadonly` component.
 * @param {Object} props.subject - The object representing the "subject" entity.
 * @param {string|number} props.subject.id - The unique identifier for the "subject" entity. Used to construct the target URL.
 * @param {string} props.subject.name - The display name for the "subject" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "subject" entity's readonly view page.
 *
 * @example
 * // Example usage with a sample subject entity:
 * const subjectEntity = { id: 123, name: "Example Subject Entity" };
 * 
 * <SubjectLinkReadonly subject={subjectEntity} />
 * // Renders: <ProxyLink to="/subject/subject/readonly/123">Example Subject Entity</ProxyLink>
 */
export const SubjectLinkReadonly = ({ subject }) => (
    <ProxyLink to={`${SubjectReadonlyURI}${subject?.id}`}>{subject?.name}</ProxyLink>
);
