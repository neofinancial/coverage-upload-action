# Coverage Upload Action Changelog

## 2.0.1 (July 19, 2022)

- Added action debug variable to build.yml
- Conditionally show more verbose data if action debug variable is true

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
