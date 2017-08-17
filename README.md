# ember-pagination-links

> Simple pagination links for ember applications.

This Ember addon creates a simple set of pagination-style links, based on a
given count of page numbers to display at once and the number of the final
page. It includes navigation arrows for moving to the next and previous pages,
and optionally to the first and last pages as well. When the user clicks on
a page number, that value will be passed to an action you supply.

## Installation

**TODO**

## Usage

Add a set of pagination links to your template:

```hbs
{{pagination-links lastPage=42}}
```

### Options

The following options can be passed to the `pagination-links` component
to configure it:

#### Required

* `lastPage` (integer): The highest page number to include.

#### Optional

* `width` (integer, default `10`): Maximum number of page numbers to display.
* `currentPage` (integer, default `1`): The number of the page to start on.
* `firstPageIcon` (string, default `"«"`): Text of the link to the first page.
* `prevPageIcon` (string, default `"‹"`): Text of the link to the previous page.
* `nextPageIcon` (string, default `"›"`): Text of the link to the next page.
* `lastPageIcon` (string, default `"»"`): Text of the link to the final page.
* `showFirstAndLast` (boolean, default `false`): Whether to include links to the
                                                first and last pages.


## Development

* `git clone <repository-url>` this repository
* `cd ember-pagination-links`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
