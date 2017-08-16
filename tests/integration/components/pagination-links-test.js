import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pagination-links", "Integration | Component | pagination links", {
  integration: true
});

test("it renders", function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

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
  const expected = new RegExp(expectedOrder.join("\\s*"));

  assert.ok(this.$().text().trim().match(expected));
});
