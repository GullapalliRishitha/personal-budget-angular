import { AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: []
  };

  ngAfterViewInit(): void {
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {

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

