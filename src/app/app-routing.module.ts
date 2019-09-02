import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedPageComponent } from './shared/components/unauthorized-page/unauthorized-page.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: 'not-found', component: NotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  { path: 'home', component: LandingComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
