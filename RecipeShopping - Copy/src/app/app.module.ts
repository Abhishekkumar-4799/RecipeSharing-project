import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
//import { RecipeModule } from './recipes/recipe.module';
import { ShoppingModule } from './shoppinglist/shopping.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RecipeModule,
    ShoppingModule,
    SharedModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }