# Coverage Upload Action

Upload code coverage data to a remote server

## Overview

This action will display the current coverage on any pull requests. You can also provide a remote endpoint to receive the coverage data and respond with the difference in coverage between the current branch and base branch, or a string to be displayed in the comment.

The pull request comment contains the following information:

```txt
|           | Hit | Found | Percentage | Difference |
| --------- | --- | ----- | ---------- | ---------- |
| Lines     |     |       |            |            |
| Functions |     |       |            |            |
| Branches  |     |       |            |            |
```

If your data is not sent to a remote endpoint the difference column will not be shown. Information on how to respond to the action to appropriately display the difference is available in the below REST API message format section.

## Usage

In your `.github/workflows` directory make a new workflow file that runs on pull requests and pushes to the default branch.

```yml
name: CI

on:
  pull_request:
    types: ['opened', 'reopened', 'synchronize']
  push:
    branches: ['master']

jobs:
  title:
    name: run tests
    runs-on: ubuntu-latest
    steps:
      - name: Test
        run: npm test -- --coverage
      - name: Upload coverage
        uses: neofinancial/coverage-action
        with:
          coverageEndpoint: https://your.endpoint.here
          coverageToken: ${{ secrets.COVERAGE_TOKEN }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you have an existing workflow that runs your tests you can just add the `Upload coverage` step at the end of that workflow.

## Settings

| Name             | Description                                                            | Default              | Required |
| ---------------- | ---------------------------------------------------------------------- | -------------------- | -------- |
| coverageEndpoint | The remote endpoint to upload coverage data to                         | null                 | No       |
| coverageToken    | A token to authenticate with the remote endpoint and identify the repo | null                 | No       |
| coverageData     | The location of the lcov file containing coverage information          | `coverage/lcov.info` | No       |

## REST API Message Format

This action will send a POST request to the specified endpoint with a message that looks like this:

```json
{
  "id": 218177808,
  "actor": "a-github-user",
  "hash": "3ba1efac955942305a038ba37d25e20b4d2092e6",
  "baseRef": "master",
  "ref": "my-branch",
  "functionsHit": 10,
  "functionsTotal": 20,
  "linesHit": 77,
  "linesTotal": 101,
  "branchesHit": 19,
  "branchesTotal": 23,
  "token": "secret"
}
```

The `id` field is the GitHub repository ID and is added automatically. The `token` field is the token generated by your API service to authenticate and identify the repository.

The action expects to receive one of two responses from the POST request to the remote endpoint:

response body:

```json
{
  "type": "difference",
  "data": {
    "linesDifference": "int",
    "functionsDifference": "int",
    "branchesDifference": "int"
  }
}
```

where these above values are the % change in coverage for a particular metric and will be displayed in the `difference` column in the comment posted by the action

or alternatively ...

response body:

```json
{
  "type": "comment",
  "data": {
    "comment": "string"
  }
}
```

where these above value is a markdown string and will be displayed in the comment posted by the action

Whether or not a response is received the action will print out general information about the repository and its code coverage:

```
"Repo ID": "int"
"Ref of branch being merged":  "string"
"Ref of branch being merged into":  "string"
"SHA of merge commit": "string"
"PR creator": "string"
"Time PR created": "date"
"Lines percent": "int"
"Functions percent": "int"
"Branches percent": "int"
```
These values are the % change in coverage for a particular metric and will be displayed in the `difference` column in the comment posted by the action.


## Contributing

1. Test your changes (see below)
1. Update the version in `package.json`
1. Update `CHANGELOG.md`
1. Commit your changes to github and open a pull request

### Testing

##### Testing action changes directly

1. In [build.yml](./.github/workflows/build.yml#L30) set `Upload coverage` steps `uses` clause to `./`
1. Open a pull request to run the `build` workflow. The code on your branch will be ran for the `Upload coverage` step upon github actions running. Check the `Upload coverage` steps output for more details about your run.

#### Testing action against another repository

1. In your repository that references this action, change your workflows code from
 `uses: neofinancial/coverage-upload-action@v1` to `uses: neofinancial/coverage-upload-action@<commit-hash>` where the commit hash is the **full** commit hash you wish to test.
1. If your other repository is running a local server you want to test changes against, make sure you change the `coverageEndpoint` in `build.yml` to an ngrok url that points towards your local server.
1. Run the workflow that references this action.



