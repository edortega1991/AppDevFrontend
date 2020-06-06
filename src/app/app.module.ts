import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosComponent } from './components/datos/datos.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

//Graficos
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DatosComponent,
    GraficasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule adde
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
