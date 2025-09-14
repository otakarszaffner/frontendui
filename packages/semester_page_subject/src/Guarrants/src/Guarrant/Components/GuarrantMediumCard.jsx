import { PersonFill } from "react-bootstrap-icons"
import { GuarrantLink } from "./GuarrantLink"
import { GuarrantCardCapsule } from "./GuarrantCardCapsule"
import { GuarrantMediumContent } from "./GuarrantMediumContent"

/**
 * A card component that displays detailed content for an guarrant entity.
 *
 * This component combines `GuarrantCardCapsule` and `GuarrantMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the guarrant entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the GuarrantMediumCard component.
 * @param {Object} props.guarrant - The object representing the guarrant entity.
 * @param {string|number} props.guarrant.id - The unique identifier for the guarrant entity.
 * @param {string} props.guarrant.name - The name or label of the guarrant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const guarrantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarrantMediumCard guarrant={guarrantEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </GuarrantMediumCard>
 */
export const GuarrantMediumCard = ({guarrant, children}) => {
    return (
        <GuarrantCardCapsule title={<><PersonFill /> <GuarrantLink guarrant={guarrant} /></>}>
            <GuarrantMediumContent guarrant={guarrant}>
                {children}
            </GuarrantMediumContent>
        </GuarrantCardCapsule>
    )
}
