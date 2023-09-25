import { AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';




@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  constructor(private dataService: DataService ) { };

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#ee82ee',
                '#ffcd56',
                '#dc143c',
                '#ff8c00',
                '#800080',
            ]
        }
    ],
    labels: []
  };

  ngAfterViewInit(): void {
    this.dataService.getBudgetData().subscribe(res => {

          for (const item of res) {
            (this.dataSource.datasets[0].data as number[]).push(item.budget);
            (this.dataSource.labels as string[]).push(item.title);
          }

        this.createChart();
      })
  }
  createChart() {
  var ctx = document.getElementById('myChart') as HTMLCanvasElement;
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}


}

