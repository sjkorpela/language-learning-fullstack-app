# LLFSA project plan (OUTDATED, DELETE MAYBE?)

My plan for this project written down. Multiple languages will most likely be supported but documentation will use finnish/english.

## What is LLFSA planned to be?

LLFSA (Language Learning Fullstack Application) is planned to be an application where teachers can create and publish tests, and students can then take those tests. That is the base idea.

Teachers will create and update tests with the application when signed in as a teacher. Teacher will also be able to read all test submissions. And students will be able to take tests with a given key. That is the planned level of complexity. (Frontend and backend, RESTful API, user authentication, form submission)

## Planned features (as a list)

### Necessary features

- Teacher password (same for all teachers)
- Creating tests (teachers only)
  - Vocab test (finnish given, english blank or vice versa)
- Taking tests (students, students will enter their name when taking the test)
- Reading test results (teachers)

### Optional features

- Deleting tests
- Updating tests
- Reading test results (students, their own)
- Pleasent UI
- Pleasent UX
- More test variants
  - Fill in the blanks
  - Multiple choice
  - Essay
- Multiple test types per test (ex. test1: multiple choice + fill in the blanks + essay)
- Multiple correct options/small mistakes allowed etc. (indexing?)
- Allowed attempts per test
- Different test modes
  - Auto-graded (ex. 50% correct needed)
  - Manually graded (must be graded by teacher user)
  - Practice test (no grading)
- Seperate teacher users
- Some kind of student authentication (ex. each student is given a key)
- Admin user to create teacher users?
