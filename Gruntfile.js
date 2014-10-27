'use strict';
var assert = require('assert');
var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        'test/**/*.js',
        '!test/tmp/*'
      ]
    },
    copy: {
      test: {
        flatten: true,
        expand: true,
        src: ['test/fixtures/*.png'],
        dest: 'test/tmp/'
      }
    },
    filerev: {
      compile: {
        src: ['test/tmp/file.png']
      },
      withConfig: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        src: ['test/tmp/cfgfile.png']
      },
      withDest: {
        src: ['test/fixtures/file.png'],
        dest: 'test/tmp/dest'
      },
      withExpand: {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*'],
        dest: 'test/tmp/expand'
      },
      withSummaryAttributeName: {
        options: {
          summary: 'foo'
        },
        src: ['test/fixtures/file.png', 'test/fixtures/another.png'],
        dest: 'test/tmp'
      },
      withSourceMaps: {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*.js'],
        dest: 'test/tmp/withSourceMaps'
      },
      withBasenameOption: {
        options: {
          basename: true
        },
        src: ['test/tmp/another.png'],
        dest: 'test/tmp/relative'
      }
    },
    simplemocha: {
      test: {
        src: 'test/*.js'
      }
    },
    clean: {
      test: ['test/tmp']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [
    'jshint',
    'clean',
    'copy',
    'filerev:compile',
    'filerev:withConfig',
    'filerev:withDest',
    'filerev:withExpand',
    'filerev:withSummaryAttributeName',
    'filerev:withSourceMaps',
    'checkSummary',
    'clearSummary',
    'filerev:withBasenameOption',
    'checkBasenameSummary',
    'simplemocha',
    'clean'
  ]);

  grunt.registerTask('clearSummary', 'clear filerev summary', function () {
    grunt.filerev.summary = {};
  });

  grunt.registerTask('checkSummary', 'Check that summary attribute is correctly created', function () {
    var src = path.normalize('test/fixtures/file.png');
    var expected = path.normalize('test/tmp/file.26365248.png');
    assert.equal(grunt.filerev.summary[src], expected);
  });

  grunt.registerTask('checkBasenameSummary', 'Check that summary attribute is correctly created', function () {
    assert.equal(Object.keys(grunt.filerev.summary)[0], 'another.png');
    assert.equal(grunt.filerev.summary['another.png'], 'another.92279d3f.png');
  });
};
