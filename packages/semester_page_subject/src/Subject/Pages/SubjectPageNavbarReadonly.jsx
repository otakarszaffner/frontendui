import Nav from 'react-bootstrap/Nav'
import { MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { SubjectReadonlyURI } from '../Components/SubjectLinkReadonly'

/**
 * A readonly navigation button component that displays navigation items without links.
 * This component shows the same structure as TitleNavButton but without interactive navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButtonReadonly component.
 * @param {Object} props.subject - The subject object containing details about the subject.
 * @param {string|number} props.subject.id - The unique identifier for the subject.
 * @param {string} props.segment - The segment identifier.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled readonly navigation button.
 */
const TitleNavButtonReadonly = ({ subject, segment, label, ...props }) => {
    return (
        <Nav.Link as={"span"} {...props} style={{ cursor: 'default' }}>
            <span>{label}</span>
        </Nav.Link>
    );
};

/**
 * Renders the readonly navigation bar for a Subject page.
 * This component displays the same navigation structure as SubjectPageNavbar but without interactive elements.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.subject - The subject entity object that provides context for the page.
 * @param {string|number} props.subject.id - The unique identifier for the subject.
 *
 * @returns {JSX.Element} The rendered readonly SubjectPageNavbar component.
 */
export const SubjectPageNavbarReadonly = ({ subject }) => {
    const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash

    const segments = [
        { segment: 'history', label: 'Historie'},
        { segment: 'roles', label: 'Role' },
        { segment: 'graph', label: 'Stavy' },
    ]
    
    return (
        <div className='screen-only'>
            <MyNavbar>
                {subject && segments.map(({ segment, label }) => (
                    <Nav.Item key={segment} >
                        <TitleNavButtonReadonly
                            subject={subject}
                            segment={segment}
                            label={label}
                            className={segment===currentHash?"active":""}
                        />
                    </Nav.Item>
                ))}
            </MyNavbar>
        </div>
    );
};
