import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an semester entity.
 *
 * This component checks if the `vectors` attribute exists on the `semester` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the SemesterVectorsAttribute component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {Array} [props.semester.vectors] - An array of vectors items associated with the semester entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <SemesterVectorsAttribute semester={semesterEntity} />
 */
export const SemesterVectorsAttribute = ({semester}) => {
    const { vectors } = semester
    if (typeof vectors === 'undefined') return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    Probably {'<VectorMediumCard vector=\{vector\} />'} <br />
                    {JSON.stringify(vector)}
                </div>
            )}
        </>
    )
}

const SemesterVectorsAttributeQuery = `
query SemesterQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: semesterById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const SemesterVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    SemesterVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const SemesterVectorsAttributeInfinite = ({semester}) => { 
    const {vectors} = semester

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={SemesterVectorsAttributeAsyncAction}
        />
    )
}