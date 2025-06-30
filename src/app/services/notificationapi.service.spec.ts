import { TestBed } from '@angular/core/testing';

import { NotificationapiService } from './notificationapi.service';

describe('NotificationapiService', () => {
  let service: NotificationapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
