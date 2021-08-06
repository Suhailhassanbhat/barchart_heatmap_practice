d3.csv('https://raw.githubusercontent.com/CSGilligan/baseball-parity-project/main/mlb_disparity_by_day.csv').then(function(data){
  const margin = { top: 40, left: 50, right: 30, bottom: 60 };
  const height = 600 - margin.top - margin.bottom;
  const width = 720 - margin.left - margin.right;
  
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
   
   
   const parseTime = d3.timeParse("%m/%d/%Y")
   
   const yearScale = d3.scaleLinear().domain([1995, 2021]).range([height, 0])
   const dayScale = d3.scaleLinear().range([0, width]) 
   const colorScale = d3.scaleLinear().range(['#006837', '#ffffbf', '#a50126'])
    
   
  data.forEach((d) => {
      d.new_date = d.date + "/2030"
      });   
  data.forEach((d) => {
      d.datetime = parseTime(d.new_date);
      });   
  data=data.filter(function(d){ return d.deviation != "-"})

  const dates = data.map((d) => d.datetime)
  const deviation = data.map(d=> +d.deviation)
  dayScale.domain(d3.extent(dates))
  colorScale.domain([0, d3.max(deviation)/2, d3.max(deviation)])


  var yAxis = d3.axisLeft(yearScale).ticks(35).tickFormat(d3.format("d"));
  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)
    

  var xAxis = d3.axisBottom(dayScale).ticks(width/30).tickFormat(d3.timeFormat('%m/%d')).tickPadding(12)
  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + -(margin.top+8) + ")")
    .call(xAxis).select(".domain").remove()


  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', width/250)
    .attr('height', 18)
    .attr('fill', function(d){return colorScale(d.deviation)})
    .attr('y', function(d) {
      return yearScale(d.year) - 5
  })
    .attr('x', function(d) {
      return dayScale(d.datetime)
  })



})

