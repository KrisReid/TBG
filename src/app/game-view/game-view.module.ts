import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {GameViewComponent} from './game-view.component';

import {ArraySortPipe} from './sort.pipe';

@NgModule({
    imports: [BrowserModule],
    declarations: [GameViewComponent, ArraySortPipe],
})
export class GameViewModule { }
