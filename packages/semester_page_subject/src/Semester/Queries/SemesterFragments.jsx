import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SemesterLinkFragment = createQueryStrLazy(
`
fragment SemesterLink on SemesterGQLModel {
  __typename
  id
  order
  classificationtypeId
  created
  topics {
    name
    id
    created
  }
  subject{
  id
  name
  groupId
  guarantors {
        id
        roles{
        id
        lastchange
          user {
          lastchange
          id
          name
          surname
          fullname
          }
        }
          
      
  }
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
  