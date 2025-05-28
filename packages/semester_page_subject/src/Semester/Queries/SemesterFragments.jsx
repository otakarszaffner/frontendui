import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SemesterLinkFragment = createQueryStrLazy(
`
fragment SemesterLink on SemesterGQLModel {
  __typename
  id
  subject{
  id
  name
  guarantors {
        id
      }
  }
  order
  classificationtypeId
  created
  topics {
    name
    created
  }
}
`)


export const SemesterMediumFragment = createQueryStrLazy(
`
fragment SemesterMedium on SemesterGQLModel {
  ...SemesterLink
}
`, SemesterLinkFragment)

export const SemesterLargeFragment = createQueryStrLazy(
`
fragment SemesterLarge on SemesterGQLModel {
  ...SemesterMedium
}
`, SemesterMediumFragment)
  