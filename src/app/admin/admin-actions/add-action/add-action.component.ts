import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { percentage } from 'rxfire/storage';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {

  public actionForm!: FormGroup;
  public isUploaded = false;
  public uploadPercent!: number;


  constructor(
    private fb:FormBuilder,
    private storage : Storage,
    public dialogRef: MatDialogRef<AddActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initActionGroup();
  }

  initActionGroup(): void {
    this.actionForm = this.fb.group({
      name: [this.data?.action ? this.data.action.name : null, Validators.required],
      description: [this.data?.action ? this.data.action.description : null, Validators.required],
      attention: [this.data?.action ? this.data.action.attention : null, Validators.required],
      imagePath: [this.data?.action ? this.data.action.imagePath : null, Validators.required],
    })
    this.isUploaded = !!this.data?.action
  }

  addAction() {
    this.dialogRef.close({
      action:this.actionForm.value
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
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
      this.actionForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value;
  }

}
