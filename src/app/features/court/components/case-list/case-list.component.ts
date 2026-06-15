import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CourtService } from '../../services/court.service';
import { CaseList } from '../../models/case-list.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css'
})
export class CaseListComponent implements OnInit, AfterViewInit {
  private courtService = inject(CourtService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  searchControl = new FormControl('');

  // State
  isLoading = true;
  errorMessage = '';

  // Table Setup
  displayedColumns: string[] = ['caseNumber', 'defendantName', 'orderType', 'status', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<CaseList>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadCases();

    this.searchControl.valueChanges.subscribe(value => {
      this.dataSource.filter = (value || '').trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });

    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      if (status) {
        this.searchControl.setValue(status);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCases(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courtService.getCases().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching cases', err);
        this.errorMessage = 'Failed to load case list.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

}
