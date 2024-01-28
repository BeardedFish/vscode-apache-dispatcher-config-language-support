# Changelog

## v1.3.1 - 2024-01-28

- Fixed issue where scoped properties not defined in the configuration's schema would show autocompletion items

## v1.3.0 - 2024-01-07

- Added support for `.farm` files

## v1.2.1 - 2023-12-29

- Fixed issue where directories could have jump links in the `$include` function (e.g., `$include "directory/"` would link to a directory but this should not be possible)

## v1.2.0 - 2023-12-25

- Added a `language server` to the extension which provides the following features:
	- Property and Value Documentation Hints
	- Property and Value Autocompletion Hints
	- Documentation Hints on Hover
	- Document Outline Support
	- Jump Link Support for the `$include` Function

## v1.0.3 - 2023-12-14

- Fixed bug where syntax highlighting would break via variable interpolation
- Fixed bug where syntax highlighting would break if a property with a single quote string was on the same line as another property with a single quote string

## v1.0.2 - 2023-12-03

- Added syntax highlighting support for numbers.
- Added interpolation syntax highlighting to the global scope.
- Fixed issue where an unclosed string would highlight all the content below it.
- Fixed issue where nested interpolation would not highlight the trailing `}` characters.

## v1.0.1 - 2023-11-12

- Fixed issue where `-` symbol would break property highlighting

## v1.0.0 - 2023-11-09

- Initial release
