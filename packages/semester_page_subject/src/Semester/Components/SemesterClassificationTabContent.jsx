import React from "react";

/**
 * Classification tab content component for "Druhy klasifikace".
 * 
 * @component
 * @param {Object} props - The properties for the SemesterClassificationTabContent component.
 * @param {Object} props.semester - The semester object containing classification data.
 * @param {boolean} [props.readonly=false] - Whether to show readonly mode.
 * 
 * @returns {JSX.Element} A JSX element rendering the classification tab content.
 */
export const SemesterClassificationTabContent = ({ semester, readonly = false }) => {
    return (
        <div className="p-3">
            <h5>Druhy klasifikace</h5>
            {semester.classificationtypeId ? (
                <div>
                    <strong>ID:</strong> {semester.classificationtypeId}
                </div>
            ) : (
                <div className="text-muted">
                    {readonly ? "Zde bude obsah pro druhy klasifikace." : "Žádné druhy klasifikace."}
                </div>
            )}
        </div>
    );
};
