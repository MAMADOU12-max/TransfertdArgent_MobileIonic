import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoAppDioufCodeurPage } from './info-app-diouf-codeur.page';

describe('InfoAppDioufCodeurPage', () => {
  let component: InfoAppDioufCodeurPage;
  let fixture: ComponentFixture<InfoAppDioufCodeurPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAppDioufCodeurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAppDioufCodeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
