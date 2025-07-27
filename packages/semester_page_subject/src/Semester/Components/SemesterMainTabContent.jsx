import React from "react";
import { TopicButton } from "../../Topic/Components";

/**
 * Main tab content component for "Témata akreditovaného studia".
 * 
 * @component
 * @param {Object} props - The properties for the SemesterMainTabContent component.
 * @param {Object} props.semester - The semester object containing topics data.
 * @param {number|null} props.openTopic - The index of the currently open topic.
 * @param {function} props.onTopicToggle - Callback function when topic is toggled.
 * @param {string|null} props.activeButton - The currently active button identifier.
 * @param {function} props.onButtonClick - Callback function when button is clicked.
 * @param {boolean} [props.readonly=false] - Whether to show readonly mode (hides buttons).
 * 
 * @returns {JSX.Element} A JSX element rendering the main tab content.
 */
export const SemesterMainTabContent = ({ 
    semester, 
    openTopic, 
    onTopicToggle, 
    activeButton, 
    onButtonClick, 
    readonly = false 
}) => {
    return (
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
                                onClick={() => onTopicToggle(openTopic === idx ? null : idx)}
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
                <div className="text-muted">
                    {readonly ? "Zde bude obsah pro témata akreditovaného studia." : "Obsah pro témata akreditovaného studia."}
                </div>
            )}
            {/* Buttons for topics - only show in non-readonly mode */}
            {!readonly && (
                <div className="d-flex flex-row align-items-start gap-2 mb-3">
                    <TopicButton
                        operation="C"
                        topic={{ name: "New Topic" }}
                        onDone={() => {}}
                        className={`btn btn-success btn-sm${activeButton === "C" ? " active" : ""}`}
                        onClick={() => onButtonClick("C")}
                    >
                        Přidání tématu
                    </TopicButton>
                    <TopicButton
                        operation="D"
                        topic={semester}
                        onDone={() => {}}
                        className={`btn btn-danger btn-sm${activeButton === "D" ? " active" : ""}`}
                        onClick={() => onButtonClick("D")}
                    >
                        Odebrání tématu
                    </TopicButton>
                    <TopicButton
                        operation="U"
                        topic={semester}
                        onDone={() => {}}
                        className={`btn btn-primary btn-sm${activeButton === "U" ? " active" : ""}`}
                        onClick={() => onButtonClick("U")}
                    >
                        Update tématu
                    </TopicButton>
                </div>
            )}
        </div>
    );
};
