import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { Routes, RouterModule } from "@angular/router";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
    { path: '', component: CartComponent }
];

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        RouterModule.forChild(routes)
    ]
})

// This is a Lazy Loaded Module!
export class CartModule {}