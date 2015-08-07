/*jshint node: true */
"use strict";

var EventEmitter = require('events').EventEmitter,
    template = require('./templates/searchbar.handlebars');

var Searchbar = function () {
    var that = this;

    /**
     * Event emitter for this searchbar element.
     *
     * @type {*|n}
     */
    that.emitter = new EventEmitter();

    /**
     * The current search term.
     *
     * @type {string}
     */
    that.searchTerm = '';
};

Searchbar.prototype = {

    /**
     * Parses the searchbar template into an HTML string.
     *
     * @returns {*}
     */
    parseSearchbar: function () {
        var html = template();

        var div = document.createElement('div');
            div.innerHTML = html.trim();

        var searchBar = this.applySearcbarEvents(div.firstChild);
            searchBar = this.setDefaultSearchTerm(searchBar);

        return searchBar;
    },

    /**
     * Applies onclick events to this searchbar.
     *
     * @param searchbar
     * @returns {*}
     */
    applySearcbarEvents: function (searchbar) {
        var that = this;
        var button = searchbar.querySelector('button[type=submit]');
        var search = searchbar.querySelector('input[type=search]');

        if (typeof button === 'undefined') {
            return searchbar;
        }

        button.onclick = function (ev) {
            ev.preventDefault();
            that.emitter.emit('search-request', search);
        };

        return searchbar;
    },

    /**
     * Applies the default search value to the search input.
     *
     * @param searchBar
     * @returns {*}
     */
    setDefaultSearchTerm: function (searchbar) {
        var search = searchbar.querySelector('input[type=search]');

        search.value = this.searchTerm;

        return searchbar;
    }
};

module.exports = Searchbar;
