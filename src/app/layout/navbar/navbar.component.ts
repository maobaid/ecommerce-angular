import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    console.log(this.isDropdownOpen);
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {}
}
