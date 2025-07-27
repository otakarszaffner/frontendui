// packages/semesterPage/semester/semester/Components/GuarantorMediumContent.jsx

import React, {useEffect, useState} from "react";
import {Check, PersonFill, Trash} from "react-bootstrap-icons";



const GUARANTOR_ROLE_ID = "5f0c247e-931f-11ed-9b95-0242ac110002";


/**
 * Displays and manages the list of guarantors for a semester.
 *
 * This component renders a list of guarantors, allows adding and removing them if `isEditable` is true,
 * and provides UI for searching and selecting new guarantors.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.semester - The semester entity containing guarantors and groupId.
 * @param {boolean} props.isEditable - If true, allows editing (add/remove) of guarantors.
 * @returns {JSX.Element}
 *
 * @example
 * <GuarrantMediumContent semester={semester} isEditable={true} />
 */
export const GuarrantMediumContentRead = ({ semester}) => {
        const [selectedGuarant, setSelectedGuarant] = useState(null);
        // State for the list of guarantors
        const [guarantors, setGuarantors] = useState([]);
    
        // Update guarantors state when semester.subject.guarantors changes (according to SemesterFragments)
        useEffect(() => {
            setGuarantors(
                semester.subject && Array.isArray(semester.subject.guarantors)
                    ? semester.subject.guarantors
                    : semester.subject && semester.subject.guarantors
                        ? [semester.subject.guarantors]
                        : []
            );
        }, [semester.subject && semester.subject.guarantors]);
    
        const handleGuarantorAdded = (result) => {
            if (selectedGuarant) {
                setGuarantors(prev => [
                    ...prev,
                    {
                        id: selectedGuarant.id,
                        roles: [
                            {
                                user: {
                                    name: selectedGuarant.name || selectedGuarant.fullname?.split(" ")[0] || "",
                                    surname: selectedGuarant.surname || selectedGuarant.fullname?.split(" ").slice(1).join(" ") || "",
                                }
                            }
                        ]
                    }
                ]);
            }
            setSelectedGuarant(null);
        };
    
        /**
         * Handles removing a guarantor from the list.
         * @param {Object} guarant - The guarantor role to remove.
         */
        const handleGuarantorDeleted = (guarant) => {
            setGuarantors(prev =>
                prev.filter(g =>
                    !g.roles.some(role => role.id === guarant.id)
                )
            );
        };
    // State for the currently selected user to add as a guarantor
    

    return (
        <div>
    
            {/* List of current guarantors */}
            {guarantors.length > 0 ? (
                guarantors.map((guarantor) => (
                    <div key={guarantor.id} className="guarantor-item"
                         style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {guarantor.roles && guarantor.roles.length > 0 ? (
                            guarantor.roles.map((role, idx) => (
                                <span key={idx} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    <PersonFill color="#0d6efd" style={{ marginRight: "0.25rem" }} />
                                    {role.user?.name}
                                    {role.user?.surname ? ` ${role.user.surname}` : ""}
                                    {/* Delete button for each guarantor role */}
                                    
                                </span>
                            ))
                        ) : null}
                    </div>
                ))
            ) : (
                <span style={{ display: "inline-block", marginBottom: "1rem" }}>
                    Žádní garanti semesteru nejsou přiřazeni.
                </span>
            )}
            
        </div>
    );
};