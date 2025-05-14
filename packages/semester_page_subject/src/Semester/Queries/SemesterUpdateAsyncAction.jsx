import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterUpdateMutation = createQueryStrLazy(
`
mutation SemesterUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: semesterUpdate(
    semester: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on SemesterGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...SemesterLarge
      }      
    }
    ...SemesterLarge
  }
}
`, SemesterLargeFragment)

export const SemesterUpdateAsyncAction = createAsyncGraphQLAction(SemesterUpdateMutation)