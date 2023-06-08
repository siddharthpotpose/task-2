import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'codezen';

  formData!: FormGroup;
  usersData: any[] = [];


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      fullName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]

    });

  }


  onAddMember() {

    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: ' Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })

console.log(this.formData.value)
this.usersData.push(this.formData.value);
this.formData.reset()
  }

  onSaveMembers() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save data in your device!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Saved!',
          'Your file has been Saved.',
          'success'
        )
        const jsonData = JSON.stringify(this.usersData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'usersData.json';
        a.click();

        URL.revokeObjectURL(url);
      }
    })


  }





}
