import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosModel } from '../models/datos.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlEndPoint : string = "http://localhost:3000/api/"
  constructor(private http: HttpClient) {
   }

  getDatos():Observable<any>{
    return this.http.get(this.urlEndPoint+'datosTotal');
  }

  reloadData():Observable<any>{
    return this.http.get(this.urlEndPoint+'updateDatosIndice');
  }

  arrTemp():Observable<any>{
    return this.http.get(this.urlEndPoint+'arrTemp');
  }

}
