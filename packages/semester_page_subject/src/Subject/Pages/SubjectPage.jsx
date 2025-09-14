
import React, { useState } from "react"
import { useParams } from "react-router"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SubjectButton, SubjectLargeCard } from "../Components"
import { SubjectReadAsyncAction } from "../Queries"
import { SubjectPageNavbar } from "./SubjectPageNavbar"
import { SubjectInsertAsyncAction } from "../Queries"
import { GuarrantMediumContent} from "../../Subject/Components";

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
    const [activeTab, setActiveTab] = useState("main");

    const handleDone = (data) => {
        console.log("SubjectPageContent.handleDone.data", data);
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    // Mock: garant list, replace with real data from subject.guarants if available
    const guarants = subject.guarants || [
        { id: 1, name: "Mgr. Jan Novák, Ph.D." },
        { id: 2, name: "Ing. Petra Svobodová" }
    ];

    return (
        <>
            <SubjectPageNavbar subject={subject} />
            <SubjectLargeCard subject={subject}>
                {/* Tabs navigation */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link${activeTab === "main" ? " active" : ""}`}
                            onClick={() => setActiveTab("main")}
                        >
                            Témata akreditovaného studia
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link${activeTab === "guarants" ? " active" : ""}`}
                            onClick={() => setActiveTab("guarants")}
                        >
                            Seznam garantů
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link${activeTab === "classification" ? " active" : ""}`}
                            onClick={() => setActiveTab("classification")}
                        >
                            Druhy klasifikace
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link${activeTab === "studyplan" ? " active" : ""}`}
                            onClick={() => setActiveTab("studyplan")}
                        >
                            Založení plánu studia předmětu
                        </button>
                    </li>
                </ul>

                {/* Tab content */}
                {activeTab === "main" && (
                    <div className="p-3">
                        <h5>Témata akreditovaného studia</h5>
                        <div className="text-muted">Zde bude obsah pro témata akreditovaného studia.</div>
                    </div>
                )}

               
                    {activeTab === "guarants" && (
                    <div className="p-3">
                        <h5>Garant předmětu</h5>
                        <ul className="list-group">
                            <GuarrantMediumContent semester={subject}/>
                        </ul>
                    </div>
                )}

                {activeTab === "classification" && (
                    <div className="p-3">
                        <h5>Druhy klasifikace</h5>
                        <div className="text-muted">Zde bude obsah pro druhy klasifikace.</div>
                    </div>
                )}

                {activeTab === "studyplan" && (
                    <div className="p-3">
                        <h5>Založení plánu studia předmětu</h5>
                        <div className="text-muted">Zde bude obsah pro založení plánu studia předmětu.</div>
                    </div>
                )}
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
