import React, { useState } from "react"
import { useParams } from "react-router"
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SubjectLargeCard } from "../Components"
import { SubjectReadAsyncAction } from "../Queries"
import { SubjectPageNavbarReadonly } from "./SubjectPageNavbarReadonly"

/**
 * A readonly page content component for displaying detailed information about a subject entity.
 * This component is identical to SubjectPageContent but with all interactive buttons removed.
 *
 * @component
 * @param {Object} props - The properties for the SubjectPageContentReadonly component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 *
 * @returns {JSX.Element} A JSX element rendering the readonly page content for a subject entity.
 */
const SubjectPageContentReadonly = ({ subject }) => {
    const [activeTab, setActiveTab] = useState("main");

    // Mock: garant list, replace with real data from subject.guarants if available
    const guarants = subject.guarants || [
        { id: 1, name: "Mgr. Jan Novák, Ph.D." },
        { id: 2, name: "Ing. Petra Svobodová" }
    ];

    return (
        <>
            <SubjectPageNavbarReadonly subject={subject} />
            <SubjectLargeCard subject={subject}>
                {/* Tabs navigation - readonly version */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <span
                            className={`nav-link${activeTab === "main" ? " active" : ""}`}
                            style={{ cursor: 'default' }}
                        >
                            Témata akreditovaného studia
                        </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className={`nav-link${activeTab === "guarants" ? " active" : ""}`}
                            style={{ cursor: 'default' }}
                        >
                            Seznam garantů
                        </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className={`nav-link${activeTab === "classification" ? " active" : ""}`}
                            style={{ cursor: 'default' }}
                        >
                            Druhy klasifikace
                        </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className={`nav-link${activeTab === "studyplan" ? " active" : ""}`}
                            style={{ cursor: 'default' }}
                        >
                            Založení plánu studia předmětu
                        </span>
                    </li>
                </ul>

                {/* Tab content - same as original but readonly */}
                {activeTab === "main" && (
                    <div className="p-3">
                        <h5>Témata akreditovaného studia</h5>
                        <div className="text-muted">Zde bude obsah pro témata akreditovaného studia.</div>
                    </div>
                )}

                {activeTab === "guarants" && (
                    <div className="p-3">
                        <h5>Seznam garantů předmětu</h5>
                        <ul className="list-group">
                            {guarants.length === 0 && (
                                <li className="list-group-item text-muted">Žádní garanti nejsou přiřazeni.</li>
                            )}
                            {guarants.map(guarant => (
                                <li key={guarant.id} className="list-group-item">
                                    {guarant.name}
                                </li>
                            ))}
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
 * A lazy-loading readonly component for displaying content of a subject entity.
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.subject - The identifier of the subject entity to fetch and display.
 *
 * @returns {JSX.Element} A readonly component that fetches the subject entity data and displays it.
 */
const SubjectPageContentReadonlyLazy = ({subject}) => {
    const { error, loading, entity, fetch } = useAsyncAction(SubjectReadAsyncAction, subject)
    const [delayer] = useState(() => CreateDelayer())

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <SubjectPageContentReadonly subject={entity} />}
    </>)
}

/**
 * A readonly page component for displaying lazy-loaded content of a subject entity.
 * This is the readonly version of SubjectPage with all interactive elements removed.
 *
 * @component
 * @returns {JSX.Element} The rendered readonly page component for the subject entity.
 */
export const SubjectPageReadonly = () => {
    const {id} = useParams()
    const subject = {id} ? {id} : null
    return <SubjectPageContentReadonlyLazy subject={subject} />
};
