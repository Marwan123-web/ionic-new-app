import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRouterPage } from './add-router.page';

describe('AddRouterPage', () => {
  let component: AddRouterPage;
  let fixture: ComponentFixture<AddRouterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRouterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
