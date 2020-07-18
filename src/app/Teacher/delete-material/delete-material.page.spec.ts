import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteMaterialPage } from './delete-material.page';

describe('DeleteMaterialPage', () => {
  let component: DeleteMaterialPage;
  let fixture: ComponentFixture<DeleteMaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
