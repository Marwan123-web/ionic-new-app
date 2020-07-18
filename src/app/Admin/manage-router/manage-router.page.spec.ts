import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageRouterPage } from './manage-router.page';

describe('ManageRouterPage', () => {
  let component: ManageRouterPage;
  let fixture: ComponentFixture<ManageRouterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRouterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageRouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
