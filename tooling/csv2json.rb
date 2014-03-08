require 'csv'
require 'json'
require 'pry'

class Point < Struct.new(:id, :ent,:opt,:type, :lat,:lng, :addr, :comment, :picto, :poi_id, :name, :search_name)
  def initialize(ary)
    @id, @ent,@opt,@type, @lat,@lng, @addr, @comment, @picto, @poi_id, @name, @search_name = ary
  end

  def to_json
    {
    :id => @id,
    :ent => @ent,
    :opt => @opt,
    :type => @type,
    :lat => @lat,
    :lng => @lng,
    :addr => @addr,
    :comment => @comment,
    :picto => @picto,
    :poi_id => @poi_id,
    :name => @name,
    :search_name => @search_name
    }.to_json
  end
end

csv = CSV.read("zpoi.csv")
File.open("points.js", 'w') do |f|
  f.write('points = [')
  first = true
  csv.each do |j|
    poi = Point.new(j)
    f.write(",\n") if !first
    f.write(poi.to_json)
    first = false
  end
  f.write(']')
end
