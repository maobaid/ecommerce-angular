import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { User } from '../../data/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRole } from '../../data/enums/userRole';
import { UserStatus } from '../../data/enums/userStatus';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() user = signal<User | undefined>(undefined);
  @Output() formSubmit = new EventEmitter<User>();
  userForm!: FormGroup;

  UserRole = UserRole;
  UserStatus = UserStatus;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: [UserRole.Admin, [Validators.required]],
      status: [UserStatus.Active],
      avatarUrl: ['', Validators.required],
    });

    effect(() => {
      const value = this.user();
      if (value) {
        this.userForm.patchValue(value);
        // this._userService.getProductCategory(value.id);
      } else {
        this.userForm.reset();
      }
    });
  }

  submit() {
    console.log(this.userForm);
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    const newUser: User = {
      ...this.user(),
      ...formValue,
    };

    if (!this.user) {
      newUser.createdAt = new Date().toISOString();
    }
    this.formSubmit.emit(newUser);
  }
}
