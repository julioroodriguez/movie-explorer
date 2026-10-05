import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {

  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture =
      TestBed.createComponent(PaginationComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should emit a valid page change', () => {

    component.currentPage = 2;
    component.totalPages = 5;

    spyOn(component.pageChange, 'emit');

    component.changePage(3);

    expect(
      component.pageChange.emit
    ).toHaveBeenCalledWith(3);

  });

  it('should not emit a page lower than 1', () => {

    component.currentPage = 1;
    component.totalPages = 5;

    spyOn(component.pageChange, 'emit');

    component.changePage(0);

    expect(
      component.pageChange.emit
    ).not.toHaveBeenCalled();

  });

  it('should not emit a page greater than total pages', () => {

    component.currentPage = 5;
    component.totalPages = 5;

    spyOn(component.pageChange, 'emit');

    component.changePage(6);

    expect(
      component.pageChange.emit
    ).not.toHaveBeenCalled();

  });

  it('should not emit the current page again', () => {

    component.currentPage = 3;
    component.totalPages = 5;

    spyOn(component.pageChange, 'emit');

    component.changePage(3);

    expect(
      component.pageChange.emit
    ).not.toHaveBeenCalled();

  });

});