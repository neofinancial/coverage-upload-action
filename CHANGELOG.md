# Coverage Upload Action Changelog

## 2.1.1 (April 19, 2024)

- Updated default ignoredUsers to dependabot[bot]

## 2.1.0 (April 9, 2024)

- Added optional input ignoredUsers. ignoredUsers is a comma separated string of authors which will not run this action. Defaulted to just 'dependabot'

## 2.0.0 (May 18, 2022)

- Modified action to receive body from the payload
- Display difference in code coverage when the difference is zero
- Only show up to two decimal places for the coverage difference
- Added messages to explain the error to the user
- Update action to accept comment from service

## 1.0.2 (May 10, 2022)

- require authtoken to post to endpoint

## 1.0.1 (February 7, 2022)

- Fix getting branch head commit hash on pull request events

## 1.0.0 (February 7, 2022)

Initial release
