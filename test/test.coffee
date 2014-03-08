chai   = require 'chai'
expect = chai.expect
demo   = require '../demo.js'

describe "compose()", ->
  it "allows composing a function from two functions", ->
    f = (x) -> x + 1
    g = (x) -> x + 2
    expect(demo.compose(f,g)(42)).to.equal(45)

describe "makePost()", ->
  it "transforms raw data into Post", ->
    data = { poi_id: 'foo', name: 'bar', lat: 1, lng: 2 }

    expected_result = { title: 'foo - bar', coordinates: { 'foo' : 'bar' } }

    result = demo.makePost(data, -> @foo = 'bar')
    expect(result).to.deep.equal(expected_result)

describe "filterMaxDistanceFromSaintPriest", ->
