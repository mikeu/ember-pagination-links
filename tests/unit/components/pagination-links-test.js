import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('pagination-links', 'Unit | Component | pagination links', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('firstDisabled is true when first and last are not used', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('showFirstAndLast', false);

  pageLinks.set('currentPage', 1);
  assert.ok(pageLinks.get('firstDisabled'));

  pageLinks.set('currentPage', 2);
  assert.ok(pageLinks.get('firstDisabled'));
});

test('firstDisabled is true when current page is 1', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('currentPage', 1);

  pageLinks.set('showFirstAndLast', false);
  assert.ok(pageLinks.get('firstDisabled'));

  pageLinks.set('showFirstAndLast', true);
  assert.ok(pageLinks.get('firstDisabled'));
});

test('firstDisabled is false when current page is not 1 and first and last are used', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('currentPage', 2);
  pageLinks.set('showFirstAndLast', true);

  assert.notOk(pageLinks.get('firstDisabled'));
});


test('lastDisabled is true when the page total is not known', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('lastPage', undefined);
  assert.ok(pageLinks.get('lastDisabled'));

  pageLinks.set('lastPage', 0);
  assert.ok(pageLinks.get('lastDisabled'));

  pageLinks.set('lastPage', null);
  assert.ok(pageLinks.get('lastDisabled'));

  pageLinks.set('lastPage', false);
  assert.ok(pageLinks.get('lastDisabled'));
});

test('lastDisabled is true when first and last are not used', function (assert) {
  const pageLinks = this.subject();
  const testLast = 10;

  pageLinks.set('showFirstAndLast', false);
  pageLinks.set('lastPage', testLast);

  pageLinks.set('currentPage', 1);
  assert.ok(pageLinks.get('lastDisabled'));

  pageLinks.set('currentPage', testLast);
  assert.ok(pageLinks.get('lastDisabled'));
});

test('lastDisabled is true when on the last page', function (assert) {
  const pageLinks = this.subject();
  const testLast = 10;

  pageLinks.set('lastPage', testLast);
  pageLinks.set('currentPage', testLast);

  pageLinks.set('showFirstAndLast', true);
  assert.ok(pageLinks.get('lastDisabled'));

  pageLinks.set('showFirstAndLast', false);
  assert.ok(pageLinks.get('lastDisabled'));
});

test('lastDisabled is false when not on the last page, and first and last are used', function (assert) {
  const pageLinks = this.subject();
  const testLast = 10;

  pageLinks.set('lastPage', testLast);
  pageLinks.set('currentPage', testLast - 1);
  pageLinks.set('showFirstAndLast', true);
  assert.notOk(pageLinks.get('lastDisabled'));
});


test('prev is disabled when on the first page', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('currentPage', 1);
  assert.ok(pageLinks.get('prevDisabled'));
});

test('prev is not disabled when not on the first page', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('currentPage', 2);
  assert.notOk(pageLinks.get('prevDisabled'));
});


test('next is disabled when on the last page', function (assert) {
  const pageLinks = this.subject();
  const testLast = 10;

  pageLinks.set('lastPage', testLast);
  pageLinks.set('currentPage', testLast);
  assert.ok(pageLinks.get('nextDisabled'));
});

test('next is not disabled when not on the last page', function (assert) {
  const pageLinks = this.subject();
  const testLast = 10;

  pageLinks.set('lastPage', testLast);
  pageLinks.set('currentPage', testLast - 1);
  assert.notOk(pageLinks.get('nextDisabled'));
});


test('list starts on page 1 when current page is less than half the width', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('currentPage', 3);
  assert.equal(pageLinks.get('listStartPage'), 1);
});

test('list starts on page 1 when number of pages does not exceed the width', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 8);
  pageLinks.set('currentPage', 7);
  assert.equal(pageLinks.get('listStartPage'), 1);
});

test('list starts at least full width from the end', function (assert) {
  const pager = this.subject();

  pager.set('width', 10);
  pager.set('lastPage', 20);
  pager.set('currentPage', 20);
  assert.equal(pager.get('listStartPage'), 11);
});


test('list starts just over half the width before the current page, otherwise', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 20);
  pageLinks.set('currentPage', 10);
  assert.equal(pageLinks.get('listStartPage'), 5);
});


test('list ends on last page when current page is less than half the width from it', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 20);
  pageLinks.set('currentPage', 18);
  assert.equal(pageLinks.get('listEndPage'), 20);
});

test('list ends on last page when number of pages does not exceed the width', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 8);
  pageLinks.set('currentPage', 7);
  assert.equal(pageLinks.get('listEndPage'), 8);
});

test('list ends just under half the width after the current page, otherwise', function (assert) {
  const pageLinks = this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 20);
  pageLinks.set('currentPage', 10);
  assert.equal(pageLinks.get('listEndPage'), 14);
});


test('list before current page is correct', function (assert) {
  const pageLinks =this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 20);
  pageLinks.set('currentPage', 10);
  assert.deepEqual(pageLinks.get('pagesBeforeCurrent'), [5, 6, 7, 8, 9]);
});

test('list after current page is correct', function (assert) {
  const pageLinks =this.subject();

  pageLinks.set('width', 10);
  pageLinks.set('lastPage', 20);
  pageLinks.set('currentPage', 10);
  assert.deepEqual(pageLinks.get('pagesAfterCurrent'), [11, 12, 13, 14]);
});
