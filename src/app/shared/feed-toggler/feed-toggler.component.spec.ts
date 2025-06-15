import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FeedTogglerComponent } from './feed-toggler.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('FeedTogglerComponent', () => {
  let component: FeedTogglerComponent;
  let fixture: ComponentFixture<FeedTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedTogglerComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]), // Настройка маршрутов (пустой массив, если маршруты не нужны)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
