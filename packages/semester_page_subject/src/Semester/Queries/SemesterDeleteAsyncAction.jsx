import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterDeleteMutation = createQueryStrLazy(
`
mutation SemesterDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: semesterDelete(
    semester: {id: $id, lastchange: $lastchange}
  ) {
    ... on SemesterGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...SemesterLarge
      }
    }
  }
}
`,
    SemesterLargeFragment)

export const SemesterDeleteAsyncAction = createAsyncGraphQLAction(SemesterDeleteMutation)