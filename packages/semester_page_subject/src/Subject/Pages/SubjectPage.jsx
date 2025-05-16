import React, { useState } from "react"
import { Children } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SubjectButton, SubjectLargeCard } from "../Components"
import { SubjectReadAsyncAction } from "../Queries"
import { SubjectPageNavbar } from "./SubjectPageNavbar"
import { SubjectInsertAsyncAction } from "../Queries"
import fs from "fs"; // Přidejte tento import pouze pokud běžíte v Electronu nebo Node prostředí

/**
 * A page content component for displaying detailed information about an subject entity.
 *
 * This component utilizes `SubjectLargeCard` to create a structured layout and displays 
 * the serialized representation of the `subject` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the SubjectPageContent component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an subject entity.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SubjectPageContent subject={subjectEntity} />
 */
const SubjectPageContent = ({ subject }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [description, setDescription] = useState("");

    const handleDone = (data) => {
        console.log("SubjectPageContent.handleDone.data", data);
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <>
            <SubjectPageNavbar subject={subject} />
            <SubjectLargeCard subject={subject}>
                <div className="position-relative w-100">
                    {/* Pravý horní roh: blok pro popis semestru */}
                    <div
                        className="position-absolute top-0 end-0 p-3 bg-light border rounded"
                        style={{
                            minWidth: 320,
                            maxWidth: 600,
                            width: "48%",
                            zIndex: 2
                        }}
                    >
                        <label htmlFor="semesterDescription" className="form-label fw-bold">
                            Popis semestru
                        </label>
                        <textarea
                            id="semesterDescription"
                            className="form-control"
                            rows={3}
                            placeholder="Vepište popis semestru..."
                            style={{ resize: "vertical" }}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            type="button"
                            disabled
                        >
                            Uložit
                        </button>
                    </div>

                    {/* Tlačítka vlevo nahoře */}
                    <div className="d-flex flex-column align-items-start mb-3">
                        <SubjectButton
                            operation="C"
                            subject={{ name: "New Item", name_en: "New Item EN" }}
                            onDone={handleDone}
                            className={`btn btn-success btn-lg mb-2${activeButton === "C" ? " active" : ""}`}
                            onClick={() => handleButtonClick("C")}
                        >
                            Create Semester
                        </SubjectButton>

                        <SubjectButton
                            operation="U"
                            subject={subject}
                            onDone={handleDone}
                            className="btn btn-success btn-lg mb-2"
                            onClick={() => handleButtonClick("U")}
                        >
                            Edit Semester
                        </SubjectButton>

                        <SubjectButton
                            operation="D"
                            subject={subject}
                            onDone={handleDone}
                            className="btn btn-success btn-lg mb-2"
                            onClick={() => handleButtonClick("D")}
                        >
                            Delete Semester
                        </SubjectButton>
                    </div>
                </div>
            </SubjectLargeCard>
        </>
    );
};

/**
 * A lazy-loading component for displaying content of an subject entity.
 *
 * This component is created using `createLazyComponent` and wraps `SubjectPageContent` to provide
 * automatic data fetching for the `subject` entity. It uses the `SubjectReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `subject` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.subject - The identifier of the subject entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `subject` entity data and displays it
 * using `SubjectPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const subjectId = "12345";
 *
 * <SubjectPageContentLazy subject={subjectId} />
 */
const SubjectPageContentLazy = ({subject}) => {
    const { error, loading, entity, fetch } = useAsyncAction(SubjectReadAsyncAction, subject)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <SubjectPageContent subject={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an subject entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `subject` object, and passes it to the `SubjectPageContentLazy` component.
 * The `SubjectPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the subject entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/subject/:id" element={<SubjectPage />} />
 *
 * // Navigating to "/subject/12345" will render the page for the subject entity with ID 12345.
 */
export const SubjectPage = () => {
    const {id} = useParams()
    const subject = {id} ? {id} : null
    return <SubjectPageContentLazy subject={subject} />
};