/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SingleFileUploadComponent } from './single-file-upload.component';

let component: SingleFileUploadComponent;
let fixture: ComponentFixture<SingleFileUploadComponent>;

describe('single-file-upload component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SingleFileUploadComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SingleFileUploadComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});