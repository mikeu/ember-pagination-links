import Ember from "ember";

export default Ember.Controller.extend({

  applicationPage: 3,

  lastPage: 15,

  actions: {

    setPage (newPage) {
      Ember.set(this, "applicationPage", newPage);
    },

  },

});
