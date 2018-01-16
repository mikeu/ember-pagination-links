import Ember from 'ember';
import layout from '../templates/components/pagination-links';

const { get, set } = Ember;

export default Ember.Component.extend({

  layout,

  classNames: ['pagination-links'],

  currentPage: 1,

  lastPage: 1,

  firstPageIcon: '«',
  prevPageIcon: '‹',
  nextPageIcon: '›',
  lastPageIcon: '»',
  ellipsisIcon: '⋯',

  showFirstAndLast: true,

  showEllipses: false,

  width: 10,

  goToPage: (newPage) => {
    throw new Error(`No goToPage action supplied. Would have switched to page ${newPage}.`);
  },

  actions: {

    goToPage: function (page) {
      this.setCurrentPage(page);
    },

    goToPrevPage: function () {
      const page = Math.max(get(this, 'currentPage') - 1, 1);
      this.setCurrentPage(page);
    },

    goToNextPage: function () {
      const page = Math.min(get(this, 'currentPage') + 1, get(this, 'lastPage'));
      this.setCurrentPage(page);
    },
  },

  /**
   * Whether the 'previous page' button should be disabled.
   */
  prevDisabled: Ember.computed('currentPage', function () {
    return get(this, 'currentPage') === 1;
  }),

  /**
   * Whether the 'next page' button should be disabled.
   */
  nextDisabled: Ember.computed('currentPage', 'lastPage', function () {
    return get(this, 'currentPage') === get(this, 'lastPage');
  }),

  /**
   * Whether the 'first page' button should be disabled.
   */
  firstDisabled: Ember.computed('currentPage', 'showFirstAndLast', function () {
    const shouldUse = get(this, 'showFirstAndLast');
    const onFirst = get(this, 'currentPage') === 1;
    return onFirst || !shouldUse;
  }),

  /**
   * Whether the 'last page' button should be disabled.
   */
  lastDisabled: Ember.computed('currentPage', 'showFirstAndLast', 'lastPage', function () {
    const lastPage = get(this, 'lastPage');
    if (!lastPage) {
      return true;
    }

    const shouldUse = get(this, 'showFirstAndLast');
    const onLast = get(this, 'currentPage') === lastPage;
    return onLast || !shouldUse;
  }),

  /**
   * The first page number to display as a link.
   */
  listStartPage: Ember.computed('currentPage', 'width', 'lastPage', function () {
    const width = get(this, 'width');
    const lastPage = get(this, 'lastPage');
    // If the entire desired width fits regardless of the current page,
    // then always start on page 1.
    if (lastPage - width <= 0) {
      return 1;
    }

    const currentPage = get(this, 'currentPage');
    const halfWidthFromCurrent = currentPage - Math.ceil(width / 2);
    const fullWidthFromEnd = lastPage - width + 1;

    return Math.max(1, Math.min(halfWidthFromCurrent, fullWidthFromEnd));
  }),

  /**
   * The last page number to display as a link.
   */
  listEndPage: Ember.computed('listStartPage', 'width', 'lastPage', function () {
    const listStartPage = get(this, 'listStartPage');
    const width = get(this, 'width');
    const lastPage = get(this, 'lastPage');

    return Math.min(listStartPage + width - 1, lastPage);
  }),

  /**
   * List of page numbers to show before the current one.
   */
  pagesBeforeCurrent: Ember.computed('listStartPage', 'currentPage', function () {
    const listStartPage = get(this, 'listStartPage');
    const currentPage = get(this, 'currentPage');

    return this.range(listStartPage, currentPage - 1);
  }),

  /**
   * List of page numbers to show after the current one.
   */
  pagesAfterCurrent: Ember.computed('currentPage', 'listEndPage', function () {
    const currentPage = get(this, 'currentPage');
    const listEndPage = get(this, 'listEndPage');

    return this.range(currentPage + 1, listEndPage);
  }),

  /**
   * Whether to display the ellipsis string at the beginning of the list.
   */
  showFirstEllipsis: Ember.computed('showEllipses', 'listStartPage', function () {
    const enabled = get(this, 'showEllipses');
    const start = get(this, 'listStartPage');

    return enabled && (start > 1);
  }),

  /**
   * Whether to display the ellipsis string at the end of the list.
   */
  showLastEllipsis: Ember.computed('showEllipses', 'listEndPage', 'lastPage', function () {
    const enabled = get(this, 'showEllipses');
    const endOfList = get(this, 'listEndPage');
    const lastPage = get(this, 'lastPage');

    return enabled && (endOfList < lastPage);
  }),

  paginationChanged: Ember.observer('lastPage', 'currentPage', function () {
    const overflowBehaviour = get(this, 'overflow');
    if (!overflowBehaviour) { return; }

    const lastPage = get(this, 'lastPage');
    const currentPage = get(this, 'currentPage');
    if (currentPage <= lastPage) { return; }

    if (overflowBehaviour === 'last') {
      set(this, 'currentPage', lastPage);
    } else if (overflowBehaviour === 'first') {
      set(this, 'currentPage', 1);
    }
  }),

  /**
   * Update the current page and call the user-supplied action.
   */
  setCurrentPage (page) {
    set(this, 'currentPage', page);
    get(this, 'goToPage')(page);
  },

  /**
   * Create an array containing a sequence of integers.
   */
  range (start, finish) {
    const range = [];
    for (let i = start; i <= finish; i++) {
      range.push(i);
    }

    return range;
  },

});
