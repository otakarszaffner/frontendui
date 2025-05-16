import React, { useState } from "react";
import { SubjectButton } from "../Components";

/**
 * A component that displays medium-level content for an subject entity.
 *
 * This component renders a label "SubjectMediumContent" followed by a serialized representation of the `subject` object
 * and any additional child content. It is designed to handle and display information about an subject entity object.
 *
 * @component
 * @param {Object} props - The properties for the SubjectMediumContent component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `subject` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SubjectMediumContent subject={subjectEntity}>
 *   <p>Additional information about the entity.</p>
 * </SubjectMediumContent>
 */
export const SubjectMediumContent = ({ subject, children }) => {
    const [openSemester, setOpenSemester] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div>
            <h3>Subject Details</h3>
            <ul>
                <li><strong>Type:</strong> {subject.__typename}</li>
                <li><strong>Name:</strong> {subject.name}</li>
                {subject.program && subject.program.name && (
                    <li><strong>Program:</strong> {subject.program.name}</li>
                )}
                {subject.program && subject.program.type && subject.program.type.name && (
                    <li><strong>Program Type:</strong> {subject.program.type.name}</li>
                )}
            </ul>

            {subject.semesters && subject.semesters.length > 0 && (
                <div>
                    <h4>Semesters</h4>
                    <ul className="list-group mb-3">
                        {subject.semesters.map((semester) => (
                            <li key={semester.id} className="list-group-item">
                                <button
                                    type="button"
                                    onClick={() => setOpenSemester(openSemester === semester.id ? null : semester.id)}
                                    className="btn btn-link p-0"
                                    style={{
                                        fontWeight: "bold",
                                        color: "#0d6efd",
                                        textDecoration: "none"
                                    }}
                                >
                                    Semester {semester.order}
                                </button>
                                <div
                                    className={`collapse${openSemester === semester.id ? " show" : ""}`}
                                    style={{
                                        transition: "height 0.3s ease",
                                        overflow: "hidden"
                                    }}
                                >
                                    {openSemester === semester.id && (
                                        <div className="mt-2 ms-3">
                                            <div><strong>Created:</strong> {new Date(semester.created).toLocaleDateString()}</div>
                                            <div><strong>Order:</strong> {semester.order}</div>
                                            <div><strong>Classification Type ID:</strong> {semester.classificationtypeId}</div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tlačítka pro medium content */}
            <div className="d-flex flex-row align-items-start gap-2 mb-3">
                <SubjectButton
                    operation="C"
                    subject={{ name: "New Item", name_en: "New Item EN" }}
                    onDone={() => {}}
                    className={`btn btn-success btn-sm${activeButton === "C" ? " active" : ""}`}
                    onClick={() => handleButtonClick("C")}
                >
                    Vytvoreni Semesteru
                </SubjectButton>

                <SubjectButton
                    operation="U"
                    subject={subject}
                    onDone={() => {}}
                    className="btn btn-success btn-sm"
                    onClick={() => handleButtonClick("U")}
                >
                    Uprava Semesteru
                </SubjectButton>

                <SubjectButton
                    operation="D"
                    subject={subject}
                    onDone={() => {}}
                    className="btn btn-success btn-sm"
                    onClick={() => handleButtonClick("D")}
                >
                    Smazani Semesteru
                </SubjectButton>
            </div>

            {children}
        </div>
    );
};
