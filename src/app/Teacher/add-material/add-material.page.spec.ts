import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMaterialPage } from './add-material.page';

describe('AddMaterialPage', () => {
  let component: AddMaterialPage;
  let fixture: ComponentFixture<AddMaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
