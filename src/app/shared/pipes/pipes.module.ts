import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumToArrayPipe } from './enum-to-array/enum-to-array.pipe';
import { HideCardNumberPipe } from './hide-card-number/hide-card-number.pipe';



@NgModule({
  declarations: [EnumToArrayPipe , HideCardNumberPipe],
  imports: [
    CommonModule
  ],
  exports: [EnumToArrayPipe, HideCardNumberPipe]
})
export class PipesModule { }
