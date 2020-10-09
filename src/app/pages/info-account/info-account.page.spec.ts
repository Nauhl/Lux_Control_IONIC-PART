import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoAccountPage } from './info-account.page';

describe('InfoAccountPage', () => {
  let component: InfoAccountPage;
  let fixture: ComponentFixture<InfoAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
