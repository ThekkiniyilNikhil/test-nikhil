import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../app.modal';
import usersData from '../../assets/users.json';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  users: Users[] = usersData;
  userForm: FormGroup;
  submitted = false;
  id: string;
  isCreateMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isCreateMode = !this.id;

    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]], // valid for indian numbers
      status: ['', Validators.required]
    })

    if(!this.isCreateMode) {
      const updateUser = this.users.filter(user => this.id === user._id)[0];
      const {_id, ...newUpdateUser} = updateUser;
      this.userForm.setValue(newUpdateUser);
    }
  }

  /**
   * method to create random number
   * @returns id with numbers and letters
   */
  makeId() {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 24; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  }

  /**
   * method to submit form
   */
  onSubmit() {
    this.submitted = true;
    // returns when form is invalid
    if (this.userForm.invalid) {
      return;
    }

    let newUserObj = this.userForm.value;
    newUserObj['_id'] = this.isCreateMode ? this.makeId() : this.id;
    this.users.unshift(newUserObj);
    const relativeRoute: string = this.isCreateMode ? '../' : '../../'
    this.router.navigate([relativeRoute], { relativeTo: this.route });
    const toasterMsg: string = this.isCreateMode ? 'New User created successfully' : 'User updated successfully'
    this.toaster.open(toasterMsg, 'Splash', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
  /**
   * method to navigate back from create user page to user list
   */
  cancelUserCreateFn() {
    this.router.navigateByUrl('/users')
  }
}
