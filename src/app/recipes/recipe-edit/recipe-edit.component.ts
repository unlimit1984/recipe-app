import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.store.select('recipes')
        .pipe(map(recipesState => recipesState.recipes.find((recipe, index) => index === this.id)))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }));
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  // getContols() {
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  get contols() {
    // return (<FormArray>this.recipeForm.get('ingredients')).controls;
    // alternative
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    // console.log(this.recipeForm);
    // 1st option
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, newRecipe);
    // } else {
    //   this.recipeService.addRecipe(newRecipe);
    // }

    // 2nd option
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }));
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }
}
