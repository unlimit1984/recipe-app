import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  // 1st option
  // constructor(private recipeService: RecipeService,
  //             private route: ActivatedRoute) {
  // 2nd option
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     // this.recipe = this.recipeService.getRecipe(this.id);
    //     this.store.select('recipes')
    //       .pipe(
    //         map(recipesState => recipesState.recipes.find((value, index) => index === this.id))
    //       )
    //       .subscribe(recipe => {
    //         this.recipe = recipe;
    //       });
    //   }
    // );
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => index === this.id);
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  // 2nd option
  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    // alternative way
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  // onDeleteRecipe() {
  //   this.recipeService.deleteRecipe(this.id);
  //   // this.router.navigate(['../'], {relativeTo: this.route});
  //   // or
  //   this.router.navigate(['/recipes']);
  // }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
