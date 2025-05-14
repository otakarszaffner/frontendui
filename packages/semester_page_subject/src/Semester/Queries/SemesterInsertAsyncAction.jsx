import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterInsertMutation = createQueryStrLazy(
`
mutation SemesterInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: semesterInsert(
    semester: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...SemesterLarge
  }
}
`,
    SemesterLargeFragment)


export const SemesterInsertAsyncAction = createAsyncGraphQLAction(SemesterInsertMutation)