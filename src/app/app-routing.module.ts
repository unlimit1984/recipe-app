import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'}
  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {path: '', component: RecipeStartComponent},
  //     {path: 'new', component: RecipeEditComponent},
  //     {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
  //     {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  //   ]
  // },
  // {path: 'shopping-list', component: ShoppingListComponent},
  // {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
