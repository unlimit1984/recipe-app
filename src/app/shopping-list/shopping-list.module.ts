import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    // RouterModule.forChild([{path: 'shopping-list', component: ShoppingListComponent}]),
    // for lazy-loading
    RouterModule.forChild([{path: '', component: ShoppingListComponent}]),
    FormsModule,
    SharedModule
  ]
  //Option 4: On
  // providers: [
  //   LoggingService
  // ]
})
export class ShoppingListModule {

}
