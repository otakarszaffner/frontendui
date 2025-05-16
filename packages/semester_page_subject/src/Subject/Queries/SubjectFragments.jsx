import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SubjectLinkFragment = createQueryStrLazy(
`
fragment SubjectLink on SubjectGQLModel {
    __typename
    id
    name
    semesters {
      created
      order
      id
      classificationtypeId
    }
    program {
      name
      type {
        name
        titleType {
          name
        }
      }
    }
    guarantors {
      id
    }
    
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