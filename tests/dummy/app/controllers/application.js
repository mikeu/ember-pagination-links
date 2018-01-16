import Ember from 'ember';

export default Ember.Controller.extend({

  applicationPage: 3,

  lastPage: 15,

  showEllipses: true,

  actions: {

    setPage (newPage) {
      Ember.set(this, 'applicationPage', newPage);
    },

  },

});
