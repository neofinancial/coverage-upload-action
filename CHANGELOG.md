# Coverage Upload Action Changelog

## 3.0.0 (June 20, 2022)

- Parse all paths and display names from a config file
- Modify post request to send a path and displayName to a remote endpoint
- Modify post request to send data to a remote endpoint as a list of pull request objects

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
