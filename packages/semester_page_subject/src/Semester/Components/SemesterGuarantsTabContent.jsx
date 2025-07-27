import React from "react";
import { GuarrantMediumContent } from "../../Guarrants/src/Guarrant/Components";
import { GuarrantMediumContentRead } from "../../Guarrants/src/Guarrant/Components/";

/**
 * Guarants tab content component for "Seznam garantů".
 * 
 * @component
 * @param {Object} props - The properties for the SemesterGuarantsTabContent component.
 * @param {Object} props.semester - The semester object containing guarants data.
 * @param {boolean} [props.readonly=false] - Whether to show readonly mode.
 * 
 * @returns {JSX.Element} A JSX element rendering the guarants tab content.
 */
export const SemesterGuarantsTabContent = ({ semester, readonly = false }) => {
    return (
        <div className="p-3">
            <h5>Garant předmětu:</h5>
            <ul className="list-group">
                {readonly ? (
                    <GuarrantMediumContentRead semester={semester} />
                ) : (
                    <GuarrantMediumContent semester={semester} />
                )}
            </ul>
        </div>
    );
};
