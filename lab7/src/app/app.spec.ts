import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { App } from './app';
import { UserApiService } from './services/user-api.service';
import { FakeStorage, makeUser } from '../testing/fakes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: UserApiService, useValue: { getUsers: vi.fn().mockResolvedValue([makeUser()]) } },
        { provide: Storage, useValue: new FakeStorage() },
      ],
    }).compileComponents();
  });

  it('повинен створити застосунок', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('повинен містити таблицю та компонент вибраного', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-users-table')).not.toBeNull();
    expect(el.querySelector('app-favorites')).not.toBeNull();
    expect(el.querySelector('mat-toolbar')?.textContent).toContain('Користувачі системи');
  });
});
