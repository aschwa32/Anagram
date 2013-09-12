var vows = require('vows'),
    assert = require('assert');
    
var gram_set = require('./anagram.js')
    
var fs = require('fs');

// Create a Test Suite
vows.describe('Anagrams Output').addBatch({
    'check if file exists': {
        topic: function () { 
        	fs.stat('./out.txt', this.callback)
         },

        'accessible?': function(err,stat) {
            assert.isNull(err);
            assert.isObject(stat);
        }
    }
}).run();