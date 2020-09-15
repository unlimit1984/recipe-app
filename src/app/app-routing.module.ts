import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
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
  // for lazy-loading
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  // {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)}
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
