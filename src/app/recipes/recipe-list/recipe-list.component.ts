import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe1', 'This is simply a test 1', 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'),
    new Recipe('A test recipe2', 'This is simply a test 2', 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
