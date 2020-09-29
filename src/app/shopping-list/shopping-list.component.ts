import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients$: Observable<{ ingredients: Ingredient[] }>;

  // private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });

    this.ingredients$ = this.store.select('shoppingList');

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();

  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
