import { Injectable, signal } from '@angular/core';
import { User, USERS } from '../../data/user';
import { UserStatus } from '../../data/enums/userStatus';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = signal<User[]>([]);
  constructor() {
    this.users.set(USERS);
  }

  addUser(user: User) {
    user.id = this.users().length + 1;
    user.status = UserStatus.Active;
    user.isEmailVerified = false;
    user.lastLogin = null;
    user.createdAt = new Date().toISOString();
    this.users.update((products) => [...products, user]);
    console.log(this.users());
  }

  editUser(user: User) {
    this.users.update((users) => {
      return users.map((item) => (item.id === user.id ? user : item));
    });
  }

  changeStatus(id: number, status: UserStatus) {
    this.users.update((users) => {
      return users.map((item) => (item.id === id ? { ...item, status: status } : item));
    });
  }
}
