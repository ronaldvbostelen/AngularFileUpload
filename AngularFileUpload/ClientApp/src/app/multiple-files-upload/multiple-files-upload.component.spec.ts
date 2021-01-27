/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { MultipleFilesUploadComponent } from './multiple-files-upload.component';

let component: MultipleFilesUploadComponent;
let fixture: ComponentFixture<MultipleFilesUploadComponent>;

describe('multiple-files-upload component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MultipleFilesUploadComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(MultipleFilesUploadComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});