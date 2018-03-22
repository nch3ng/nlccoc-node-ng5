import { ScriptLoaderService } from './../_services/script-loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { TestBed, async } from '@angular/core/testing';
describe('AuthComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AuthComponent
        ],
        providers: [
         {provide: Router, 
          useClass: class { navigate = jasmine.createSpy("navigate"); },
          ScriptLoaderService}
        ],
        imports: [FormsModule, RouterTestingModule],
      }).compileComponents();
  
    }));
    it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AuthComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
   
  });
  