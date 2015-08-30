#  yourAppName Angular

## Table of Contents
1. [Adding to the Readme](#readme)
1. [Contributing](#contributing)
1. [Style Guides](#styleguides)
1. [Building for Browser](#browser)
1. [Performance Testing](#performancetesting)
1. [Testing Standards](#testingstandards)
1. [Config Files](#configfiles)
1. [Documentation Standards](#documentationstandards)
1. [Useful Gulp Tasks](#gulptasks)
1. [Misc](#misc)

<a name="readme">
## Adding to the Readme
Please don't hesitate to add to the readme. Anything that is valuable to the project should be added to either the client or server readme! Make a change, and put it through a pull request.

<a name="contributing">
## Contributing
Once you are complete your story, merge the current master into your branch, and make a pull request to the master. Everyone should feel free to hop into the pull request and offer suggestions.

<a name="styleguides">
## Style Guides
* Javascript: AirBnB Style Guide (https://github.com/airbnb/javascript/tree/master/es5)
* Angular: JohnPapa (https://github.com/johnpapa/angular-styleguide)
* SASS: SassGuideLin (http://sass-guidelin.es/)
* Performance Guide: http://blog.500tech.com/is-reactjs-fast/

<a name="browser">
## Building for Browser
Running the default `gulp` command will start the browser.

### Processes

* JS
  * Uglification
  * Minification
  * JSHint
  * Unit Test
  * Source Mapped
  * Collects all JS in Components
  * Collects Libs written in config/third-party.js

* SASS
  * Convert to CSS
  * Minify
  * Autoprefix
  * Source Mapped

* HTML
  * Move Index.html
  * Turn HTML files in components into js with Template Cache
  * Minify and Uglify JS Files

<a name="performancetesting">
## Performance Testing

### Batarang
Extends the Developer Tools, adding tools for debugging and profiling AngularJS applications. This will be in developer tools, beside console.

[Download](https://chrome.google.com/webstore/detail/angularjs-batarang-stable/niopocochgahfkiccpjmmpchncjoapek)

### Watchers
Snippet to check the number of watchers in the current page. Snippets require Chrome Canary, and can be found here.
[Snippets](https://github.com/bahmutov/code-snippets);

[Watcher Snippet](https://gist.github.com/kentcdodds/31c90402750572107922<F37>)

<a name="testingstandards">
## Testing Standards

### Code Coverage
All public methods should have unit-tests. To check the current Code Coverage, after running `gulp pre-push` or `gulp unit-test`, navigate to test/coverage, and open the index.html.

### Code Complexity
Viewing code complexity can help clean up overly complex files, and identify issues.

First install plato with `npm install -g plato`.

To run the service, go to the client folder, and run `plato -r -d  test/results app/components/*/**.js`

<a name="configfiles">
## Config Files

### third-party.js
This file is used to tell gulp which bower apps are being used. After you install a package with bower, make sure to add the js file into this package.

### paths.js
Stored paths of various files and directories in our system.

<a name="documentationstandards">
## Documentation Standards
All functions will be documented. We are using the JS Doc style. For a guide on this, please see the style guides above.

Please be smart about your docs. If the function is a public api call, give details on the way you can use the function, and what the parameters are. If not, we don't need a story book of details. If your unsure, write what you think is best, and we can look at it in a pull request.

<a name="gulptasks">
## Useful Gulp Tasks

### gulp clean
Clean the WWW and tmp repo of all files.

### gulp pre-push
Call all Unit Tests and Lint/Style Checkers. These should all pass before pushing to github.

### gulp
Run the app in browser

### gulp unit-test
Run all Unit Tests.

### gulp lint
Run Basic lint style checks.

<a name="misc">
## Misc
Stubby Api to be written.