import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { Contract } from '../../interfaces/contract.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'admin-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  @ViewChild("chart")
  chart?: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  private subscription?:Subscription;
  public contracts?: Contract[];
  public deposits: number[] = [];
  public depositsDate: string[] = [''];

  constructor(
    private adminService: AdminService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Deposito",
          data: this.deposits
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Depositos a lo largo del año",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
      }
    };
  }


  ngOnInit(): void {
    this.subscription = this.adminService.getContracts()
      .subscribe( contracts => {
        this.contracts = this.sortByStartDate( contracts )

        this.contracts.forEach(contract => {
          this.deposits.push( +contract.deposit )

          switch (contract.startDate[1].toString()){
            case '6':
              return this.depositsDate.push( "Jun"  );
            case '7':
              return this.depositsDate.push( "Jul"  );
            case '8':
              return this.depositsDate.push( "Aug"  );
            case '9':
              return this.depositsDate.push( "Sep"  );
            case '10':
              return this.depositsDate.push( "Oct"  );
            case '11':
              return this.depositsDate.push( "Nov"  );
            case '12':
              return this.depositsDate.push( "Dec"  );
            default:
              return this.depositsDate.push( "Unk"  );
          }

        });
      });
  }

  ngOnDestroy(): void {
    if ( this.subscription ){
      this.subscription.unsubscribe();
    }
  }
  createDateFromNumbers(dateArray: number[]): Date {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day);
  }

  sortByStartDate(contratos: Contract[]): Contract[] {
    return contratos.sort((a, b) => {
      const fechaInicioA = this.createDateFromNumbers(a.startDate);
      const fechaInicioB = this.createDateFromNumbers(b.startDate);
      return fechaInicioA.getTime() - fechaInicioB.getTime();
    });
  }

  test(){
    console.log(this.depositsDate.toString());
  }
}
