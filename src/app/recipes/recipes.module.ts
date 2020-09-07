import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]
  }
];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    // RouterModule.forChild(routes), // Option 1
    RecipesRoutingModule, //Option 2
    // CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent
  // ]
})
export class RecipesModule {

}
