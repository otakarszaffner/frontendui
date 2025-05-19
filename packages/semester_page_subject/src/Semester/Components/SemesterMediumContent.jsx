import React, { useState } from "react";

/**
 * A component that displays medium-level content for a semester entity.
 *
 * This component renders details about the semester and its related subject(s),
 * and any additional child content. It is designed to handle and display information
 * about a semester entity object, similar to SubjectMediumContent.
 *
 * @component
 * @param {Object} props - The properties for the SemesterMediumContent component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `semester` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 */
export const SemesterMediumContent = ({ semester, children }) => {
    const [openSubject, setOpenSubject] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    // Pokud je subject pole, vypiš všechny, pokud objekt, vypiš jeden
    let subjectArray = [];
    if (Array.isArray(semester.subject)) {
        subjectArray = semester.subject;
    } else if (semester.subject) {
        subjectArray = [semester.subject];
    }

    return (
        <div>
            <h3>Semester Details</h3>
            <ul>
                <li><strong>Type:</strong> {semester.__typename}</li>
                <li><strong>ID:</strong> {semester.id}</li>
                <li><strong>Order:</strong> {semester.order}</li>
            </ul>

            {subjectArray.length > 0 && (
                <div>
                    <h4>Subjects</h4>
                    <ul className="list-group mb-3">
                        {subjectArray.map((subj) => (
                            <li key={subj.id || subj.name} className="list-group-item">
                                <button
                                    type="button"
                                    onClick={() => setOpenSubject(openSubject === subj.id ? null : subj.id)}
                                    className="btn btn-link p-0"
                                    style={{
                                        fontWeight: "bold",
                                        color: "#0d6efd",
                                        textDecoration: "none"
                                    }}
                                >
                                    {subj.name || "Subject"}
                                </button>
                                <div
                                    className={`collapse${openSubject === subj.id ? " show" : ""}`}
                                    style={{
                                        transition: "height 0.3s ease",
                                        overflow: "hidden"
                                    }}
                                >
                                    {openSubject === subj.id && (
                                        <div className="mt-2 ms-3">
                                            <div><strong>Subject Name:</strong> {subj.name}</div>
                                            <div><strong>Subject ID:</strong> {subj.id}</div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Topics */}
            {Array.isArray(semester.topics) && semester.topics.length > 0 && (
                <div>
                    <h4>Topics</h4>
                    <ul className="list-group mb-3">
                        {semester.topics.map((topic, idx) => (
                            <li key={idx} className="list-group-item">
                                <strong>{topic.name}</strong> <br />
                                <span className="text-muted">{topic.created}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Topic (singular, if present as array) */}
            {Array.isArray(semester.topic) && semester.topic.length > 0 && (
                <div>
                    <h4>Topic</h4>
                    <ul className="list-group mb-3">
                        {semester.topic.map((topic, idx) => (
                            <li key={idx} className="list-group-item">
                                <strong>{topic.name}</strong> <br />
                                <span className="text-muted">{topic.created}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Created info */}
            <div className="mb-3">
                <strong>Created:</strong>{" "}
                {semester.created
                    ? new Date(semester.created).toLocaleDateString() +
                      " " +
                      new Date(semester.created).toLocaleTimeString()
                    : ""}
            </div>

            {children}
        </div>
    );
};
