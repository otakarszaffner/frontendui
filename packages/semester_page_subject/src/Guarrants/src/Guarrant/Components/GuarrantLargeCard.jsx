import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { GuarrantCardCapsule } from "./GuarrantCardCapsule"
import { GuarrantMediumCard } from "./GuarrantMediumCard"

/**
 * A large card component for displaying detailed content and layout for an guarrant entity.
 *
 * This component wraps an `GuarrantCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `GuarrantMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the GuarrantLargeCard component.
 * @param {Object} props.guarrant - The object representing the guarrant entity.
 * @param {string|number} props.guarrant.id - The unique identifier for the guarrant entity.
 * @param {string} props.guarrant.name - The name or label of the guarrant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const guarrantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarrantLargeCard guarrant={guarrantEntity}>
 *   <p>Additional content for the middle column.</p>
 * </GuarrantLargeCard>
 */
export const GuarrantLargeCard = ({guarrant, children}) => {
    return (
        <GuarrantCardCapsule guarrant={guarrant} >
            <Row>
                <LeftColumn>
                    <GuarrantMediumCard guarrant={guarrant}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </GuarrantCardCapsule>
    )
}
