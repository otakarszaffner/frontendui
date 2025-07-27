import React from "react";

/**
 * A reusable tabs navigation component for semester page views.
 *
 * This component provides a consistent tab interface for different views
 * of the semester page content, including main content, guarantors, 
 * classification, and study plan tabs.
 *
 * @component
 * @param {Object} props - The properties for the SemesterPageTabs component.
 * @param {string} props.activeTab - The currently active tab identifier.
 * @param {function} props.onTabChange - Callback function called when a tab is clicked.
 * @param {boolean} [props.readonly=false] - Whether the tabs are in readonly mode (affects which tabs are shown).
 *
 * @returns {JSX.Element} A JSX element rendering the tab navigation.
 *
 * @example
 * // Example usage:
 * const [activeTab, setActiveTab] = useState("main");
 * 
 * <SemesterPageTabs 
 *   activeTab={activeTab} 
 *   onTabChange={setActiveTab}
 *   readonly={false}
 * />
 */
export const SemesterPageTabs = ({ activeTab, onTabChange, readonly = false }) => {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <button
                    className={`nav-link${activeTab === "main" ? " active" : ""}`}
                    onClick={() => onTabChange("main")}
                >
                    Témata akreditovaného studia
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link${activeTab === "guarants" ? " active" : ""}`}
                    onClick={() => onTabChange("guarants")}
                >
                    Seznam garantů
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link${activeTab === "classification" ? " active" : ""}`}
                    onClick={() => onTabChange("classification")}
                >
                    Druhy klasifikace
                </button>
            </li>
            {!readonly && (
                <li className="nav-item">
                    <button
                        className={`nav-link${activeTab === "studyplan" ? " active" : ""}`}
                        onClick={() => onTabChange("studyplan")}
                    >
                        Založení plánu studia předmětu
                    </button>
                </li>
            )}
        </ul>
    );
};
