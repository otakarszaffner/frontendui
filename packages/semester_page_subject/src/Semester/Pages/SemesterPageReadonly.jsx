import React, { useState } from "react";
import { useParams } from "react-router";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { 
    SemesterLargeCard,
    SemesterPageTabs,
    SemesterMainTabContent,
    SemesterGuarantsTabContent,
    SemesterClassificationTabContent
} from "../Components";
import { SemesterReadAsyncAction } from "../Queries";
import { SemesterPageNavbarReadonly } from "./SemesterPageNavbarReadonly";
import { GuarrantMediumContentRead } from "../../Guarrants/src/Guarrant/Components/";

/**
 * A readonly page content component for displaying detailed information about a semester entity.
 *
 * This component utilizes `SemesterLargeCard` to create a structured layout and displays 
 * the serialized representation of the `semester` object within the card's content.
 * All interactive elements and buttons are removed for readonly view.
 *
 * @component
 * @param {Object} props - The properties for the SemesterPageContentReadonly component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 *
 * @returns {JSX.Element} A JSX element rendering the readonly page content for a semester entity.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SemesterPageContentReadonly semester={semesterEntity} />
 */
const SemesterPageContentReadonly = ({ semester }) => {
    const [activeTab, setActiveTab] = useState("main");
    const [openTopic, setOpenTopic] = useState(null);

    return (
        <>
            <SemesterPageNavbarReadonly semester={semester} />
            <SemesterLargeCard semester={semester}>
                <SemesterPageTabs 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    readonly={true} 
                />

                {activeTab === "main" && (
                    <SemesterMainTabContent
                        semester={semester}
                        openTopic={openTopic}
                        onTopicToggle={setOpenTopic}
                        activeButton={null}
                        onButtonClick={() => {}}
                        readonly={true}
                    />
                )}

                {activeTab === "guarants" && (
                    <SemesterGuarantsTabContent
                        semester={semester}
                        readonly={true}
                    />
                )}

                {activeTab === "classification" && (
                    <SemesterClassificationTabContent
                        semester={semester}
                        readonly={true}
                    />
                )}
            </SemesterLargeCard>
        </>
    );
};

/**
 * A lazy-loading component for displaying readonly content of a semester entity.
 *
 * This component wraps `SemesterPageContentReadonly` to provide
 * automatic data fetching for the `semester` entity. It uses the `SemesterReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `semester` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.semester - The identifier of the semester entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `semester` entity data and displays it
 * using `SemesterPageContentReadonly`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const semesterId = "12345";
 *
 * <SemesterPageContentLazyReadonly semester={semesterId} />
 */
const SemesterPageContentLazyReadonly = ({ semester }) => {
    const { error, loading, entity, fetch } = useAsyncAction(SemesterReadAsyncAction, semester);
    const [delayer] = useState(() => CreateDelayer());

    const handleChange = async (e) => {
        const data = e.target.value;
        await delayer(() => fetch(data));
    };
    const handleBlur = async (e) => {
        const data = e.target.value;
        await delayer(() => fetch(data));
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entity && <SemesterPageContentReadonly semester={entity} onChange={handleChange} onBlur={handleBlur} />}
        </>
    );
};

/**
 * A readonly page component for displaying lazy-loaded content of a semester entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `semester` object, and passes it to the `SemesterPageContentLazyReadonly` component.
 * The `SemesterPageContentLazyReadonly` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered readonly page component displaying the lazy-loaded content for the semester entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/semester/semester/readonly/:id" element={<SemesterPageReadonly />} />
 *
 * // Navigating to "/semester/semester/readonly/12345" will render the readonly page for the semester entity with ID 12345.
 */
export const SemesterPageReadonly = () => {
    const { id } = useParams();
    const semester = { id } ? { id } : null;
    return <SemesterPageContentLazyReadonly semester={semester} />;
};
