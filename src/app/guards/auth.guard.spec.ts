import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'; // Import Router
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule

describe('AuthGuard', () => { // Renamed to 'AuthGuard' for clarity

  let authGuard: AuthGuard; // Declare a variable to hold the instance of AuthGuard
  let router: Router; // Declare a variable for the Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule to mock Router
      providers: [AuthGuard] // Provide AuthGuard
    });

    // Get instances of the AuthGuard and Router from the TestBed injector
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    // Spy on router.navigate to check if it's called
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some-token'); // Mock localStorage.getItem to return a token
    expect(authGuard.canActivate()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled(); // Ensure navigation didn't happen
  });

  it('should not allow activation and navigate to login if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage.getItem to return null
    expect(authGuard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Ensure navigation to login happened
  });
});
