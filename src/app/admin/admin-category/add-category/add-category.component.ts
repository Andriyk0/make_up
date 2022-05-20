import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public categoryForm!: FormGroup;
  public isUploaded = false;
  public uploadPercent!: number;


  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initCategoryGroup();
  }

  initCategoryGroup(): void {
    this.categoryForm = this.fb.group({
      name: [this.data?.category ? this.data.category.name : null, Validators.required],
      path: [this.data?.category ? this.data.category.path : null, Validators.required],
    })
    this.isUploaded = !!this.data?.category
  }

  addCategory() {
    this.dialogRef.close({
      category:this.categoryForm.value
    })
  }
}
