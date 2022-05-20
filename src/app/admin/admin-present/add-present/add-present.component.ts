import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { percentage } from 'rxfire/storage';

@Component({
  selector: 'app-add-present',
  templateUrl: './add-present.component.html',
  styleUrls: ['./add-present.component.scss']
})
export class AddPresentComponent implements OnInit {

  public presentForm!: FormGroup;
  public isUploaded = false;
  public uploadPercent!: number;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    public dialogRef: MatDialogRef<AddPresentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initPresentForm();
  }

  initPresentForm(): void {
    this.presentForm = this.fb.group({
      name: [this.data?.pres?.name ? this.data?.pres?.name : null, Validators.required],
      path: [this.data?.pres?.path ? this.data?.pres?.path : null, Validators.required],
      description: [this.data?.pres?.description ? this.data?.pres?.description : null, Validators.required],
      price: [this.data?.pres?.price ? this.data?.pres?.price : null, Validators.required],
      use: [this.data?.pres?.use ? this.data?.pres?.use : null, Validators.required],
      sex: [this.data?.pres?.sex ? this.data?.pres?.sex : null, Validators.required],
      country: [this.data?.pres?.country ? this.data?.pres?.country : null, Validators.required],
      imagePath: [this.data?.pres?.imagePath ? this.data?.pres?.imagePath : null, Validators.required],
      count: [1, Validators.required]
    })
    this.isUploaded = !!this.data?.prod
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.presentForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format')
    }
    return Promise.resolve(url);
  }

  deleteImage(imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    this.uploadPercent = 0;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      console.log('File deleted successfully');
      this.presentForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.presentForm.get(control)?.value;
  }

  createPresent():void{
    this.dialogRef.close({
      pres: this.presentForm.value
    })
  }
}
