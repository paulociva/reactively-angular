import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'drivers',
    loadComponent: () => import('./drivers/drivers.component').then(mod => mod.DriversComponent),
    title: 'RxF1 - Drivers',
  }, {
    path: 'races',
    loadComponent: () => import('./races/races.component').then(mod => mod.RacesComponent),
    title: 'RxF1 - Races',
  }, {
    path: 'qualifying-results',
    loadComponent: () => import('./qualifying-results/qualifying-results.component').then(mod => mod.QualifyingResultsComponent),
    title: 'RxF1 - Qualifying Results',
    data: {
      showRaceSelector: true
    }
  }, {
    path: 'driver-standings',
    loadComponent: () => import('./driver-standings/driver-standings.component').then(mod => mod.DriverStandingsComponent),
    title: 'RxF1 - Driver Standings',
    data: {
      showRaceSelector: true
    }
  }, {
    path: 'status',
    loadComponent: () => import('./status/status.component').then(mod => mod.StatusComponent),
    title: 'RxF1 - Status'
  }, {
    path: '**',
    redirectTo: 'drivers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
