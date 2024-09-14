import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { Order, Client, ClientService } from '../../../../Services/client/client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.css']
})
export class OrdersChartComponent implements OnInit {
  public chartSeries!: any[];
  public chartOptions!: ApexChart;
  public chartXAxis!: ApexXAxis;
  public chartYAxis!: ApexYAxis;
  public chartDataLabels!: ApexDataLabels;
  public chartPlotOptions!: ApexPlotOptions;

  constructor(private http: HttpClient,private clientService : ClientService) {}
  orders: Order[] = [];
  clients: Client[] = [];
  client !: Number ;
  months:number[]= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  ngOnInit(): void {
    this.initializeChart();
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.clientService.getOrders()
      .subscribe(data => {
        this.orders = data;
        this.orders.forEach(order => {
          const orderMonth = new Date(order.created_at).getMonth();
          this.months[orderMonth]++;
          console.log(orderMonth)
        });
    })
  }

  initializeChart() {

    this.chartSeries = [
      {
        name: 'Orders',
        data: this.months
      }
    ];

    this.chartOptions = {
      type: 'bar',
      height: 350
    };

    this.chartXAxis = {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
    };

    this.chartDataLabels = {
      enabled: false
    };

    this.chartYAxis = {
      title: {
        text: 'Number of Orders'
      }
    };

    this.chartPlotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    };
  }
}
