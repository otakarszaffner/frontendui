import React from "react";

/**
 * Component for displaying the study plan tab content (Založení plánu studia předmětu).
 *
 * @component
 * @param {Object} props - The properties for the SemesterStudyPlanTabContent component.
 *
 * @returns {JSX.Element} A JSX element rendering the study plan tab content.
 */
export const SemesterStudyPlanTabContent = () => {
    return (
        <div className="p-3">
            <h5>Založení plánu studia předmětu</h5>
            <form>
                <div className="mb-3">
                    <label htmlFor="studyplan-date" className="form-label">Kdy byl studijní plán založen</label>
                    <input type="date" className="form-control" id="studyplan-date" name="studyplan-date" />
                </div>
                <div className="mb-3">
                    <label htmlFor="studyplan-author" className="form-label">Kým byl studijní plán založen</label>
                    <input type="text" className="form-control" id="studyplan-author" name="studyplan-author" placeholder="Zadejte jméno" />
                </div>
                <button type="button" className="btn btn-primary">Založit studijní plán</button>
            </form>
        </div>
    );
};
