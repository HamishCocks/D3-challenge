// @TODO: YOUR CODE HERE!


// which activity uses d3.csv

//plot smokers vs age

//Moe is margin of error

// define widths and heights of what we need

var svgWidth = 1200;
var svgHeight = 700;

var chartMargin = {
    top: 50,
    right: 70,
    bottom: 70,
    left: 80
  };

// var svgWidth2 = parseInt(d3.select('#scatter')
//                 .style('width'));
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var toolTip = d3.select("dot")
.append("div")
.style("position", "absolute")
.style("visibility", "hidden")
.text(function(d) { 
  return d.abbr;
});

//create variable for te svg and append it to the div with id = scatter
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
//append a group "g" to the svg to hold the contents of the graph
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// svg.call(toolTip);

//import the csv file and promise a function
d3.csv("assets/data/data.csv").then(function(data) {
  console.log(data);

    //we want smokers and age variables 
    //w can iterate over the 
  data.forEach(function(data) {
      data.smokes = +data.smokes;
      data.age = +data.age;
    });
  console.log(data);

  //creating scales
  var xLinearScale = d3.scaleLinear()
    .domain([30, d3.max(data, d => d.age) + 1])
    .range([0, chartWidth])

  var yLinearScale = d3.scaleLinear()
    .domain([8, d3.max(data, d => d.smokes) + 1])
    .range([chartHeight, 0]);

  //creating axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
  
  //appendign the axes
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

//TO DO look up SCATTERPLOT docs and use that to build it up, styling etc.

//build the scatterplot
    
    chartGroup.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 18)
    .style("fill",'#5EB8EF')
    .attr('stroke', '#d3d3d3')
    .attr('stroke-width', 2)
    .attr("width", d => chartWidth - xLinearScale(d.age))
    .attr("height", d => chartHeight - yLinearScale(d.smokes));
    

    chartGroup.selectAll("dot")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) { 
      return d.abbr;
    })
    .style("fill",'white')
    .attr("font-size", "15px")
    .attr("font-weight", 600)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("dx", d => xLinearScale(d.age)) //lookup: what is dx and dy, fit text to radius size of circle 
    .attr("dy", d => yLinearScale(d.smokes)); // use tooltip for mouseover and mouseout;


    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .attr("font-weight", 600)
    .attr("fill", "black")
    .text("Age (Median)");

    chartGroup.append("text")
    .attr("transform", `translate(${20 - chartMargin.right}, ${chartHeight / 2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .attr("font-weight", 600)
    .attr("fill", "black")
    .text("Smokes (%)");

}).catch(function(error) {
    console.log(error);
});