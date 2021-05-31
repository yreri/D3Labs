/*
*    main_LoadingData.js
*/

var margin = {left:100, right: 10, top: 10, bottom: 100};
var width = 600;
var height = 400;
var interval;
var formattedData = new Array();
var years = new Array();
var index = 0;
var time = 0;

var g = d3.select("#chart-area")
					.append("svg")
					.attr("width", width + margin.right + margin.left)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var t = d3.transition()
					.duration(600);

var x = d3.scaleLog()
					.domain([142, 150000])
					.range([0,width])
					.base(10);

var y = d3.scaleLinear()
					.domain([0,90])
					.range([height,0]);

var color = d3.scaleOrdinal()
							.range(d3.schemePastel2);

var area = d3.scaleLinear()
						 .domain([2000, 1400000000])
						 .range([25*Math.PI, 1500*Math.PI]);

var bottomAxis = d3.axisBottom(x)
									 .tickValues([400,4000,40000])
									 .tickFormat(d3.format("$"));

var leftAxis = d3.axisLeft(y);

var legend = g.append("g")
 							.attr("transform", "translate(" + (width - 10) + "," + (height - 165) + ")");

	g.append("g")
	 .attr("class", "x axis")
	 .attr("transform", "translate(0, " + height + ")")
	 .call(bottomAxis)
	 .selectAll("text")
	 .attr("y", 10)
	 .attr("x", -5)
	 .attr("text-anchor", "middle")
    .attr("fill", "#53A2BE");

	g.append("g")
	 .attr("class", "left axis")
	 .call(leftAxis)
    .selectAll("text")
    .attr("fill", "#53A2BE");

	g.append("text")
	 .attr("class", "x axis-label")
	 .attr("x", width/2)
	 .attr("y", height + 60)
	 .attr("font-size", "30px")
	 .attr("text-anchor", "middle")
        .attr("fill", "#176087")
	 .text("GDP Per Capita ($)");

	g.append("text")
	 .attr("class", "y axis-label")
	 .attr("x", - (height / 2))
	 .attr("y", -60)
	 .attr("font-size", "30px")
	 .attr("text-anchor", "middle")
	 .attr("transform", "rotate(-90)")
        .attr("fill", "#176087")
	 .text("Life expectancy (Years)");

	var areaLabel = g.append("text")
 									 .attr("class", "x axis-label")
 								 	 .attr("x", width-50)
									 .attr("y", height-10)
									 .attr("font-size", "50px")
									 .attr("text-anchor", "middle")
									 .attr("fill", "#F8BD7F")
									 .text("Year");

var continents = new Array();

d3.json("data/data.json").then((data) => {data.forEach((d, i)=>{
				d.year = +d.year;
      });
 			formattedData = data.map((year) => {
				return year["countries"].filter((country) => {
				var dataExists = (country.income && country.life_exp);
				return dataExists;
				}).map((country) => {
					country.income = +country.income;
					country.life_exp = +country.life_exp;
					return country;
				})
			});

			years = data.map((d) => {return d.year;});
			var cont = formattedData[0].map((d) => {return d.continent;});
			var continents = [...new Set(cont)];

			color.domain(continents);
			continents.forEach((c, i) => {

			var legendRow = legend.append("g")
					.attr("transform", "translate(0, " + (i * 20) + ")");

			legendRow.append("rect")
							 .attr("width", 10)
							 .attr("height", 10)
							 .attr("fill", color(c));

			legendRow.append("text")
							 .attr("x", -20)
							 .attr("y", 10)
							 .attr("text-anchor", "end")
							 .style("text-transform", "capitalize")
							 .text(c);

			 });

 			var length = years.length;

			d3.interval( ( )=>{
				if (index >= length){

				}
				update(years[index], formattedData[index]);
				index++;

    	}, 500);

  }).catch((error)=>{console.log(error);});


function update(year, data){

	var label = year;
    areaLabel.text(label);

	var circles = g.selectAll("circle")
								 .data(data, (d) => { return d.country; });

	circles.exit()
				 .attr("fill", (d) => {return color(d.continent);})
		     .transition(t)
		     .attr("cy", (d) => {return y(d.life_exp);})
		     .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
		     .remove();

	circles.transition(t)
		     .attr("cx", (d) => {return x(d.income);})
		     .attr("cy", (d) => {return y(d.life_exp);})
		     .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});

  circles.enter().append("circle")
				 .attr("style", "stroke:white")
				 .attr("fill", (d) => {return color(d.continent);})
				 .attr("cx", (d) => {return x(d.income);})
				 .attr("cy", (d) => {return y(d.life_exp);})
				 .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
				 .merge(circles)
				 .transition(t)
				 .attr("cx", (d) => {return x(d.income);})
				 .attr("cy", (d) => {return y(d.life_exp);})
				 .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});
}

function step(){
	update(years[index], formattedData[index]);
	index++;
}

$("#play-button").on("click", ( ) => {
	var button = $("#play-button")

	if (button.text() == "Play"){
		button.text("Pause");
		interval = setInterval(step, 1000);
	}
	else if (button.text() == "Pause"){
		button.text("Play");
		clearInterval(interval);
	}

});
