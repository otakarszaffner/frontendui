import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SubjectLinkFragment = createQueryStrLazy(
`
fragment SubjectLink on SubjectGQLModel {
  __typename
  id
  name
}
`)


export const SubjectMediumFragment = createQueryStrLazy(
`
fragment SubjectMedium on SubjectGQLModel {
  ...SubjectLink
}
`, SubjectLinkFragment)

export const SubjectLargeFragment = createQueryStrLazy(
`
fragment SubjectLarge on SubjectGQLModel {
  ...SubjectMedium
}
`, SubjectMediumFragment)
  