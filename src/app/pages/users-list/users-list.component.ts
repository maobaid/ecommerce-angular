import { Component, computed, signal } from '@angular/core';
import { User } from '../../data/user';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { NgClass, TitleCasePipe } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserStatus } from '../../data/enums/userStatus';
import { UserRole } from '../../data/enums/userRole';
import { ToastService } from '../../services/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, NgClass, TitleCasePipe, UserFormComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users = this._userService.users;
  showActions = false;
  allChecked = false;
  selectedUsers: number[] = [];

  modalOpen = false;
  selectedUser = signal<User | undefined>(undefined);

  searchText = signal('');

  UserRole = UserRole;
  UserStatus = UserStatus;

  constructor(private _userService: UserService, private _toast: ToastService) {}

  filteredUsers = computed(() => {
    const query = this.searchText().toLowerCase().trim();
    return this.users().filter((user) => {
      const matchesSearch = !query || user.name.toLowerCase().includes(query);
      return matchesSearch;
    });
  });

  ngOnInit(): void {
    this._userService.loadUsers();
  }

  openAddModal() {
    this.selectedUser.set(undefined);
    this.modalOpen = true;
  }

  openEditModal(user: User) {
    this.selectedUser.set(user);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleFormSubmit(user: User) {
    if (user.id) {
      // Update existing
      this._userService.editUser(user);
      this._toast.success('User Updated');
    } else {
      // Add new
      this._toast.success('User Added');
      this._userService.addUser(user);
    }
    this.closeModal();
  }

  bulkChangeStatus(status: UserStatus) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Status will be changed to ${status}, This may affect the user's activity!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Changed!`,
          text: `Changed to ${status}`,
          icon: 'success',
        });
        this.selectedUsers.forEach((element) => {
          this._userService.changeStatus(element, status);
        });
      }
      this.selectedUsers = [];
      this.allChecked = false;
      this.showActions = false;
    });
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  toggleSelection(userId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers = this.selectedUsers.filter((id) => id !== userId);
    }
  }

  toggleSelectAll(isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers = this.users().map((u) => u.id);
    } else {
      this.selectedUsers = [];
    }
  }

  isAllSelected(): boolean {
    return this.users().length > 0 && this.selectedUsers.length === this.users().length;
  }
}
