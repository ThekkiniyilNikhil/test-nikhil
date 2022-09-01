import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MaterialModule } from './material.module';
import { PaginatorDirective } from './pagination.directive';
import { UsersListComponent } from './users-list/users-list.component';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PaginatorDirective,
    DeleteConfirmationComponent,
    ViewUserDetailsComponent,
    UsersListComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [PaginatorDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
