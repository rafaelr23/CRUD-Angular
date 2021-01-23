import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HeroeModule {
  id:string;
  nombre:string;
  poder:string;
  vivo:boolean;

  constructor(){
    this.vivo = true;
  }
 }
