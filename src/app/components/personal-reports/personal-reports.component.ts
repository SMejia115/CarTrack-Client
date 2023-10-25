import { select } from 'd3-selection'; // Asegúrate de importar los módulos de D3 necesarios
import { colorSets } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-reports',
  templateUrl: './personal-reports.component.html',
  styleUrls: ['./personal-reports.component.css']
})
export class PersonalReportsComponent{
  single: any = [
    {
      name: 'Estados Unidos',
      value: 328239523, // Población en millones
    },
    {
      name: 'China',
      value: 1444216107, // Población en millones
    },
    {
      name: 'India',
      value: 1380004385, // Población en millones
    },
    {
      name: 'Brasil',
      value: 212559417, // Población en millones
    },
    {
      name: 'Rusia',
      value: 145912025, // Población en millones
    },
  ];
//   public barChartLabels: Label[] = []; 

//   public barChartData: ChartDataSets[] = [
//     {
//       data: [],
//       label: 'Ventas',
//     },
//   ];

//   public barChartOptions: ChartOptions = {
//     responsive: true,
//   };

//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;

//   constructor() { }

//   ngOnInit() {
//     // Simula datos de ejemplo (asegúrate de proporcionar tus propios datos)
//     this.barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
//     this.barChartData[0].data = [65, 59, 80, 81, 56];
//   }
}
