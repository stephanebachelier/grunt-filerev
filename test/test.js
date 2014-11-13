'use strict';
var fs = require('fs');
var assert = require('assert');

var hashes = require('./hashes.json');

it('should revision files based on content', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should accept options', function () {
  var file = 'test/fixtures/cfgfile.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should allow a dest directory option', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should allow sources defined with expand', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should use same revision as .js source for the .map', function () {
  var file = 'test/fixtures/math.js.map';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should revision .js file ok without any .map', function () {
  var file = 'test/fixtures/physics.js';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});
