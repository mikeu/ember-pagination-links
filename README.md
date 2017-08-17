# ember-pagination-links

> Simple pagination links for ember applications.

This Ember addon creates a simple set of pagination-style links, based on a
given count of page numbers to display at once and the number of the final
page. It includes navigation arrows for moving to the next and previous pages,
and optionally to the first and last pages as well. When the user clicks on
a page number, that value will be passed to an action you supply.

The `pagination-links` component does not manage the data to be displayed on
each page. It is independent of any data store or fetching strategies. You
tell the component how many pages you would like the user to be able to access,
and the component in turn tells you each time the user clicks on a new page
number. It is up to you then how to present the new page, and what models or
other information should be displayed.

## Installation

**TODO**

## Usage

Define an action to be called when the user changes pages:
```js
export default Ember.Controller.extend({
  actions: {
    setPage (newPage) {
      Ember.set(this, "applicationPage", newPage);
    },
  },
});
```

Add a set of pagination links to your template:
```hbs
{{pagination-links
  lastPage=42
  goToPage=(action 'setPage')
}}
```

### Options

The following options can be passed to the `pagination-links` component
to configure it:

#### Required

* `lastPage` (integer): Highest page number to include.
* `goToPage` (callback): Function to call when the user changes pages.

#### Optional

* `width` (integer, default `10`): Maximum number of page numbers to display.
* `currentPage` (integer, default `1`): Page number to display initially.
* `firstPageIcon` (string, default `"«"`): Text of the link to the first page.
* `prevPageIcon` (string, default `"‹"`): Text of the link to the previous page.
* `nextPageIcon` (string, default `"›"`): Text of the link to the next page.
* `lastPageIcon` (string, default `"»"`): Text of the link to the final page.
* `showFirstAndLast` (boolean, default `true`): Whether to include links to the
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
