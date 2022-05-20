import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../system/services/category/category.service';
import { ICategoryResponse } from '../../system/interfaces/category.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  categories: Array<ICategoryResponse> = [];
  editCategoryStatus = false;
  editCategoryId!:number;

  constructor(
    private CategoryService : CategoryService,
    private toastr : ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories():void{
    this.CategoryService.getAll().subscribe(data => {
      this.categories = data as ICategoryResponse[];
    })
  }

  editCategory(category: ICategoryResponse): void {
    this.dialog.open(AddCategoryComponent, {
      backdropClass: 'dialog-back',
      data: {
        category: category
      }
    }).afterClosed().subscribe(result => {
      if (result && result.category) {
        this.CategoryService.update(result.category, category.id).then(() => {
          this.loadCategories();
          this.toastr.success('Category successfully updated');
        })
      }
    })
  }


  deleteCategory(cat: ICategoryResponse):void {
    this.CategoryService.delete( cat.id).then(()=>{
      this.loadCategories();
      this.toastr.success('Category successfully delete');
    })
  }

  openDialog() {
    this.dialog.open(AddCategoryComponent).afterClosed().subscribe(rezult =>{
      if (rezult && rezult.category){
        this.CategoryService.create(rezult.category).then(()=>{
          this.loadCategories();
          this.toastr.success('Category successfully create');
        })
      }
    });
  }
}
