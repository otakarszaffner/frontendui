import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SemesterLinkFragment = createQueryStrLazy(
`
fragment SemesterLink on SemesterGQLModel {
  __typename
  id
  semesterPage {
    subject {
      name
      id
    }
    order
    topics {
      name
    }
    id
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
  