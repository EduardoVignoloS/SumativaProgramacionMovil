import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {
  isDarkMode = false;

  constructor() { 
    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark';
    this.applyTheme(this.isDarkMode);
  }
  toggleTheme() {
    this.applyTheme(this.isDarkMode);
  }
  applyTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }

}
