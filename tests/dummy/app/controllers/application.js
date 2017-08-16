import Ember from "ember";

export default Ember.Controller.extend({

  currentPage: 3,

  actions: {

    setPage (newPage) {
      Ember.set(this, 'currentPage', newPage);
    },

  }

});
