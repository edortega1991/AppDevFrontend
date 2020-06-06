import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
//import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DatosModel } from "../../models/datos.model";
import { DataService } from 'src/app/services/data.service';
import { Subscription, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  temperatura = false;
  humedad = false;
  nivel = false;
  indice = false;
  todas = false;
  public arrData = new DatosModel;
  

  public lineChartData: ChartDataSets[] = [{}];
  public lineChartLabels: Label[] = [];
  
  public lineChartHumedad: ChartDataSets[] = [{}];
  public lineChartNivel: ChartDataSets[] = [{}];
  public lineChartTemperatura: ChartDataSets[] = [{}];
  public lineChartIndiceAmbiental : ChartDataSets[] = [{}];



  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    },
    { // green
      backgroundColor: 'rgba(75, 169, 59,0.2)',
      borderColor: 'rgba(75, 169, 59,1)',
      pointBackgroundColor: 'rgba(75, 169, 59,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 169, 59,0.8)'
    }
  ];

  public lineChartColorsTemperatura: Color[] = [
     { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    }
  ];
  public lineChartColorsHumedad: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public lineChartColorsNivel: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }    
  ];
  public lineChartColorsIndiceAmbiental: Color[] = [
    { // green
      backgroundColor: 'rgba(75, 169, 59,0.2)',
      borderColor: 'rgba(75, 169, 59,1)',
      pointBackgroundColor: 'rgba(75, 169, 59,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 169, 59,0.8)'
    }   
    
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  private updateSubscription: Subscription;
  
  constructor(private dataService:DataService,
              private toastr:ToastrService) {    

  }

  ngOnInit(): void {
    this.updateSubscription = interval(60000).subscribe(
      (val) => { 
        console.log('grafica: '+ new Date);
        this.dataService.reloadData().subscribe(resp =>{
          //this.getDatos();
          //console.log('estaresp '+resp.data);
          this.arrData = resp.data;
         // this.lineChartData = resp.data;
         this.getData();

        });
    });
    //this.getDatos();
    this.getData();
  }

  getData(){

    this.dataService.getDatos().subscribe(resp=>{
      this.toastr.success('Se cargaron los datos correctamente','Datos de gráficas');
      let arrTem: number[] =[];
      let arrHum: number[] =[];
      let arrNiv: number[] =[];
      let arrInc: number[] =[];
      let arrNunMuetras: string[] = [];

      resp.data.forEach(element => {
        let dato = element.Temperatura;
        let numero = dato.replace(",",".")
        let num = parseFloat(numero);
        arrTem.push(num);

        let dato1 = element.Humedad;
        let numero1 = dato1.replace(",",".")
        let num1 = parseFloat(numero1);
        arrHum.push(num1);

        let dato2 = element.Nivel;
        let numero2 = dato2.replace(",",".")
        let num2 = parseFloat(numero2);
        arrNiv.push(num2);

        let dato3 = element.IndiceAmbiental;
        let numero3 = dato3.replace(",",".")
        let num3 = parseFloat(numero3);
        arrInc.push(num3);
        
        arrNunMuetras.push(element.id.toString());
        
      });
      this.lineChartData = [
        { data: arrNiv, label: 'Nivel' },
        { data: arrHum, label: 'Humedad' },
        { data: arrTem, label: 'Temperatura' },        
        { data: arrInc, label: 'Indice Ambiental' }
        
      ];
      this.lineChartTemperatura = [
        { data: arrTem, label: 'Temperatura' }       
      ];
      this.lineChartHumedad = [
        { data: arrHum, label: 'Humedad' }       
      ];
      this.lineChartNivel = [
        { data: arrNiv, label: 'Nivel' }       
      ];
      this.lineChartIndiceAmbiental = [
        { data: arrInc, label: 'Indice Ambiental' }       
      ];
      this.lineChartLabels= arrNunMuetras;
    })
  }

  getDatos() {
    this.dataService.arrTemp().subscribe(resp =>{
          
      this.arrData = resp.data;
      
    });
  }
}
