import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutersPage } from './routers.page';

describe('RoutersPage', () => {
  let component: RoutersPage;
  let fixture: ComponentFixture<RoutersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
