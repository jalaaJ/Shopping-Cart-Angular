import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { Routes, RouterModule } from "@angular/router";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';

const routes: Routes = [
    {path: '', component: ProductsComponent }
];

@NgModule({
    declarations: [ProductsComponent],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        DataViewModule,
        TagModule,
        RatingModule,
        RouterModule.forChild(routes)
    ]
})


// This is a Lazy Loaded Module!
export class ProductsModule {}