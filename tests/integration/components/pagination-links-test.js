import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pagination-links", "Integration | Component | pagination links", {
  integration: true
});

function expectedRegex (start, end) {
  const arrayGiven = Ember.isArray(start);
  const numbersGiven = Number.isInteger(start) && Number.isInteger(end);

  Ember.assert("Either array or two integers must be given to expectedRegex", arrayGiven || numbersGiven);

  if (!arrayGiven) {
    Ember.assert("The 'end' cannot be less than 'start'", start <= end);
    start = Array.apply(null, Array(end - start + 1)).map(function (_, i) {return start + i;});
  }

  return new RegExp(start.join("\\s*"));
}

test("it renders in the expected order", function (assert) {
  this.render(hbs`{{pagination-links
                    firstPageIcon="F"
                    prevPageIcon="P"
                    nextPageIcon="N"
                    lastPageIcon="L"
                    width=10
                    lastPage=3
                    showFirstAndLast=true
                  }}`);

  const expectedOrder = ["F", "P", "1", "2", "3", "N", "L"];
  const expected = expectedRegex(expectedOrder);

  assert.ok(this.$().text().trim().match(expected));
});

test("it updates its action parameter when the last page changes", function (assert) {
  assert.expect(2);

  let lastPage = 37;
  // Test double for clicking last page icon.
  this.set("goToPage", (newPage) => {
    assert.equal(newPage, lastPage);
  });

  this.set("lastPage", lastPage);
  this.render(hbs`{{pagination-links lastPage=lastPage goToPage=goToPage}}`);
  // Click the link, see 37.
  Ember.run(() => document.querySelector(".pagination-links-last").click());

  lastPage = 42;
  this.set("lastPage", lastPage);
  // Click the link, see 42.
  Ember.run(() => document.querySelector(".pagination-links-last").click());
});

test("it removes page numbers from the links when last page decreases", function (assert) {
  this.set("lastPage", 10);
  // Create some links with a constant max width of the initial page count.
  this.render(hbs`{{pagination-links lastPage=lastPage width=10}}`);
  // See all pages.
  let expected = expectedRegex(1, 10);
  assert.ok(this.$().text().trim().match(expected));

  // Lower the page count.
  this.set("lastPage", 9);
  // Make sure the OLD regex no longer matches.
  assert.notOk(this.$().text().trim().match(expected));
  // But that then we do see the correct set of pages.
  expected = expectedRegex(1, 9);
  assert.ok(this.$().text().trim().match(expected));
});

test("it switches to the last page when overflow is 'last' and lastPage goes too low", function (assert) {
  this.set("lastPage", 10);
  this.render(hbs`{{pagination-links currentPage=7 lastPage=lastPage width=10 overflow='last'}}`);

  this.set("lastPage", 5);
  assert.equal(this.$(".pagination-links-current").text().trim(), 5);
});

test("it switches to the first page when overflow is 'first' and lastPage goes too low", function (assert) {
  this.set("lastPage", 10);
  this.render(hbs`{{pagination-links currentPage=7 lastPage=lastPage width=10 overflow='first'}}`);

  this.set("lastPage", 5);
  assert.equal(this.$(".pagination-links-current").text().trim(), 1);
});

test("it switches to the last page when overflow is 'last' and currentPage goes too high", function (assert) {
  this.set("currentPage", 5);
  this.render(hbs`{{pagination-links currentPage=currentPage lastPage=10 width=10 overflow='last'}}`);

  this.set("currentPage", 15);
  assert.equal(this.$(".pagination-links-current").text().trim(), 10);
});

test("it switches to the first page when overflow is 'first' and currentPage goes too high", function (assert) {
  this.set("currentPage", 5);
  this.render(hbs`{{pagination-links currentPage=currentPage lastPage=10 width=10 overflow='first'}}`);

  this.set("currentPage", 15);
  assert.equal(this.$(".pagination-links-current").text().trim(), 1);
});

test("it does not change current page when overflow is not set", function (assert) {
  this.set("lastPage", 10);
  this.render(hbs`{{pagination-links currentPage=7 lastPage=lastPage width=10}}`);

  this.set("lastPage", 5);
  assert.equal(this.$(".pagination-links-current").text().trim(), 7);
});
