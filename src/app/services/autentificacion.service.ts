import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private TOKEN_KEY = 'auth_token';

  constructor() {}

  // Guardar token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserName(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.name || null;
  }

  getUserEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.email || null;
  }

  // Cerrar sesión (borrar token)
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
