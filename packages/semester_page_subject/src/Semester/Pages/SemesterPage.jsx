import React, { useState } from "react";
import { useParams } from "react-router";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { 
    SemesterLargeCard,
    SemesterPageTabs,
    SemesterMainTabContent,
    SemesterGuarantsTabContent,
    SemesterClassificationTabContent,
    SemesterStudyPlanTabContent
} from "../Components";
import { SemesterReadAsyncAction } from "../Queries";
import { SemesterPageNavbar } from "./SemesterPageNavbar";
import { TopicButton } from "../../Topic/Components";
import {GuarrantMediumContent} from "../../Guarrants/src/Guarrant/Components";

/**
 * A page content component for displaying detailed information about a semester entity.
 *
 * This component utilizes `SemesterLargeCard` to create a structured layout and displays 
 * the serialized representation of the `semester` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the SemesterPageContent component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for a semester entity.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SemesterPageContent semester={semesterEntity} />
 */
const SemesterPageContent = ({ semester }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [description, setDescription] = useState("");
    const [activeTab, setActiveTab] = useState("main");
    const [openTopic, setOpenTopic] = useState(null);

    const handleDone = (data) => {
        console.log("SemesterPageContent.handleDone.data", data);
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <>
            <SemesterPageNavbar semester={semester} />
            <SemesterLargeCard semester={semester}>
                <SemesterPageTabs 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    readonly={false} 
                />

                {activeTab === "main" && (
                    <SemesterMainTabContent
                        semester={semester}
                        openTopic={openTopic}
                        onTopicToggle={setOpenTopic}
                        activeButton={activeButton}
                        onButtonClick={handleButtonClick}
                        readonly={false}
                    />
                )}

                {activeTab === "guarants" && (
                    <SemesterGuarantsTabContent
                        semester={semester}
                        readonly={false}
                    />
                )}

                {activeTab === "classification" && (
                    <SemesterClassificationTabContent
                        semester={semester}
                        readonly={false}
                    />
                )}

                {activeTab === "studyplan" && (
                    <SemesterStudyPlanTabContent />
                )}
            </SemesterLargeCard>
        </>
    );
};

/**
 * A lazy-loading component for displaying content of a semester entity.
 *
 * This component is created using `createLazyComponent` and wraps `SemesterPageContent` to provide
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
 * using `SemesterPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const semesterId = "12345";
 *
 * <SemesterPageContentLazy semester={semesterId} />
 */
const SemesterPageContentLazy = ({ semester }) => {
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
            {entity && <SemesterPageContent semester={entity} onChange={handleChange} onBlur={handleBlur} />}
        </>
    );
};

/**
 * A page component for displaying lazy-loaded content of a semester entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs a `semester` object, and passes it to the `SemesterPageContentLazy` component.
 * The `SemesterPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the semester entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/semester/:id" element={<SemesterPage />} />
 *
 * // Navigating to "/semester/12345" will render the page for the semester entity with ID 12345.
 */
export const SemesterPage = () => {
    const { id } = useParams();
    const semester = { id } ? { id } : null;
    return <SemesterPageContentLazy semester={semester} />;
};