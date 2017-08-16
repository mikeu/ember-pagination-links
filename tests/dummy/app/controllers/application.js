import Ember from "ember";

export default Ember.Controller.extend({

  applicationPage: 3,

  actions: {

    setPage (newPage) {
      Ember.set(this, "applicationPage", newPage);
    },

  }

});
