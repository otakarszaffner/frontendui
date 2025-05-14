import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterReadPageQuery = createQueryStrLazy(
`
query SemesterReadPageQuery($skip: Int, $limit: Int, $where: SemesterWhereInputFilter) {
  result: semesterPage(skip: $skip, limit: $limit, where: $where) {
    ...SemesterLarge
  }
}
`, 
    SemesterLargeFragment)

export const SemesterReadPageAsyncAction = createAsyncGraphQLAction(SemesterReadPageQuery)