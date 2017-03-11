import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let h1: HTMLElement;

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        });
        fixture = TestBed.createComponent(AppComponent);
        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    });
    it('should display title', () => {
        expect(h1.textContent).toBe('');
        fixture.detectChanges();
        expect(h1.textContent).toBe('Example');
    });
});
