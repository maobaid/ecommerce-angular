import { Injectable, signal } from '@angular/core';
import { User, USERS } from '../../data/user';
import { UserStatus } from '../../data/enums/userStatus';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = signal<User[]>([]);
  constructor(private _storageService: StorageService) {
    this.users.set(USERS);
  }

  saveUsers() {
    this._storageService.saveData('users', this.users());
  }

  loadUsers() {
    const storedUsers = this._storageService.getData('users');
    if (storedUsers) {
      this.users.set(storedUsers);
    }
  }

  addUser(user: User) {
    user.id = this.users().length + 1;
    user.status = UserStatus.Active;
    user.isEmailVerified = false;
    user.lastLogin = null;
    user.createdAt = new Date().toISOString();
    this.users.update((products) => [...products, user]);
    console.log(this.users());
    this.saveUsers();
  }

  editUser(user: User) {
    this.users.update((users) => {
      return users.map((item) => (item.id === user.id ? user : item));
    });
    this.saveUsers();
  }

  changeStatus(id: number, status: UserStatus) {
    this.users.update((users) => {
      return users.map((item) => (item.id === id ? { ...item, status: status } : item));
    });
    this.saveUsers();
  }
}
