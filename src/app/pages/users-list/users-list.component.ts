import { Component, computed, signal } from '@angular/core';
import { User } from '../../data/user';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { NgClass, TitleCasePipe } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserStatus } from '../../data/enums/userStatus';
import { UserRole } from '../../data/enums/userRole';

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

  constructor(private _userService: UserService) {}

  filteredUsers = computed(() => {
    const query = this.searchText().toLowerCase().trim();
    return this.users().filter((user) => {
      const matchesSearch = !query || user.name.toLowerCase().includes(query);
      return matchesSearch;
    });
  });

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
    } else {
      // Add new
      this._userService.addUser(user);
    }
    this.closeModal();
  }

  bulkChangeStatus(status: UserStatus) {
    this.selectedUsers.forEach((element) => {
      this._userService.changeStatus(element, status);
    });
    this.selectedUsers = [];
    this.allChecked = false;
    this.showActions = false;
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  toggleSelection(productId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers.push(productId);
    } else {
      this.selectedUsers = this.selectedUsers.filter((id) => id !== productId);
    }
    console.log(this.selectedUsers);
  }

  toggleSelectAll(isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers = this.users().map((u) => u.id);
    } else {
      this.selectedUsers = [];
    }
    console.log(this.selectedUsers);
  }

  isAllSelected(): boolean {
    return this.users.length > 0 && this.selectedUsers.length === this.users.length;
  }
}
