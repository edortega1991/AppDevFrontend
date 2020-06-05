import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosComponent } from './components/datos/datos.component';
import { GraficasComponent } from './components/graficas/graficas.component';

const routes: Routes = [
  { path: 'datos', component: DatosComponent },
  { path: 'graficas', component: GraficasComponent },
  { path: '**', pathMatch:'full', redirectTo: 'datos' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
