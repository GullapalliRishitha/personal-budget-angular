import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3chart',
  templateUrl: './d3chart.component.html',
  styleUrls: ['./d3chart.component.css']
})
export class D3chartComponent implements OnInit{

  constructor(private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.getBudgetData().subscribe(res =>  {
        this.D3chartt(res);
      })

  }

  D3chartt(data: any[]){

    console.log(data);
    const width = 325;
    const height = 325;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .range(["#ffcd56", "#0000ff", "#daa520", "#fd6b19", "#808080", "#a0522d", "#808080", "#000080", "#00ced1"]);

    const pie = d3.pie()
      .value((d: any) => d.budget);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arcs.append("path")
      .attr("d", (d: any) => arc(d) as string)
      .attr("fill", (d: any) => color(d.data.title) as string);

    arcs.append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.title);
  }

}
