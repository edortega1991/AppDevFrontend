import { Component, OnInit } from '@angular/core';
import { DatosModel } from "../../models/datos.model";
import { DataService } from 'src/app/services/data.service';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  public temperatura : boolean = false;
  public humedad : boolean = false;
  public nivel : boolean = false;
  public indice : boolean = false;
  public arrTemperatura = new DatosModel;
  public arrHumedad = new DatosModel;
  public arrNivel = new DatosModel;
  public arrIndiceAmbiental = new DatosModel;
  public arrData = new DatosModel;

  private updateSubscription: Subscription;
  
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    debugger;
    this.updateSubscription = interval(10000).subscribe(
      (val) => { 
        console.log('entro: '+ new Date);
        this.dataService.reloadData().subscribe(resp =>{
          //this.getDatos();
          console.log('estaresp '+resp.data);
          this.arrData = resp.data;

        });
    });
    this.getDatos();
      

  }

  getDatos() {
    this.dataService.getDatos().subscribe(resp =>{
      debugger;
      console.log(resp);
      this.arrData = resp.data;
    });
  }
}
