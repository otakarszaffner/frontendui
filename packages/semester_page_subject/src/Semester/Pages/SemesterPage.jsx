import React, { useState } from "react";
import { useParams } from "react-router";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeCard } from "../Components";
import { SemesterReadAsyncAction } from "../Queries";
import { SemesterPageNavbar } from "./SemesterPageNavbar";

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
                        {/* Topics výpis s vyjížděcí lištou */}
                        {Array.isArray(semester.topics) && semester.topics.length > 0 && (
                            <ul className="list-group mb-3">
                                {semester.topics.map((topic, idx) => (
                                    <li key={idx} className="list-group-item">
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            style={{
                                                fontWeight: "bold",
                                                color: "#0d6efd",
                                                textDecoration: "none"
                                            }}
                                            onClick={() => setOpenTopic(openTopic === idx ? null : idx)}
                                        >
                                            {topic.name}
                                        </button>
                                        <div
                                            className={`collapse${openTopic === idx ? " show" : ""}`}
                                            style={{
                                                transition: "height 0.3s ease",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {openTopic === idx && (
                                                <div className="mt-2 ms-3">
                                                    <div>
                                                        <strong>Created:</strong>{" "}
                                                        {topic.created
                                                            ? new Date(topic.created).toLocaleDateString() +
                                                              " " +
                                                              new Date(topic.created).toLocaleTimeString()
                                                            : ""}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* Pokud nejsou topics, zobraz defaultní text */}
                        {(!semester.topics || semester.topics.length === 0) && (
                            <div className="text-muted">Zde bude obsah pro témata akreditovaného studia.</div>
                        )}
                    </div>
                )}

                {activeTab === "guarants" && (
                    <div className="p-3">
                        <h5>Seznam garantů semestru</h5>
                        <ul className="list-group">
                            {Array.isArray(semester.guarantors) && semester.guarantors.length > 0 ? (
                                semester.guarantors.map(guarant => (
                                    <li key={guarant.id} className="list-group-item">
                                        {guarant.name} (ID: {guarant.id})
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">Žádní garanti nejsou přiřazeni.</li>
                            )}
                        </ul>
                    </div>
                )}

                {activeTab === "classification" && (
                    <div className="p-3">
                        <h5>Druhy klasifikace</h5>
                        {semester.classificationtypeId ? (
                            <div>
                                <strong>ID klasifikace:</strong> {semester.classificationtypeId}
                            </div>
                        ) : (
                            <div className="text-muted">Zde bude obsah pro druhy klasifikace.</div>
                        )}
                    </div>
                )}

                {activeTab === "studyplan" && (
                    <div className="p-3">
                        <h5>Založení plánu studia předmětu</h5>
                        <div className="text-muted">Zde bude obsah pro založení plánu studia předmětu.</div>
                    </div>
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