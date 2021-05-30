/*
*    main_LoadingData.js
*/

d3.csv("data/ages.csv").then((data)=> {
    data.forEach((d)=>{
      d.age = +d.age;
    });
  	  console.log(data);
    });

d3.tsv("data/ages.tsv").then((data)=> {
    data.forEach((d)=>{
      d.age = +d.age;
    });
  	  console.log(data);
    });


var svg = d3.select("#chart-area").append("svg")
                                	.attr("width", 400)
                                	.attr("height", 400);

d3.json("data/ages.json").then((data)=> {
  	data.forEach((d)=>{
  		d.age = +d.age;
  	});
    console.log(data)
    var circles = svg.selectAll("circle")
                    .data(data)

    circles.enter()
         .append("circle")
             .attr("cx", (d, i) =>{return 70 + i * 72})
             .attr("cy", 200)
             .attr("r", (d)=>{return d.age * 3})
             .attr("fill","lightskyblue");

    }).catch((error)=>{
      console.log(error)
    });