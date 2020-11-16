import { Component, OnDestroy, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subscription: Subscription;

  // 1st option
  // constructor(private recipeService: RecipeService {
  // 2nd option
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    // this.subscription = this.recipeService.recipesChanged
    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    // this.recipes = this.recipeService.getRecipes();
  }

  // 2nd option
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
