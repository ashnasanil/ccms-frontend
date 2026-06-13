import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourtService } from '../../services/court.service';
import { CaseList } from '../../models/case-list.model';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css'
})
export class CaseListComponent implements OnInit {
  private courtService = inject(CourtService);

  // Data
  allCases: CaseList[] = [];
  filteredCases: CaseList[] = [];
  
  // State
  isLoading = true;
  errorMessage = '';

  // Search
  searchControl = new FormControl('');

  // Sort
  sortColumn: keyof CaseList | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  Math = Math; // Expose Math for template

  ngOnInit(): void {
    this.loadCases();
    
    this.searchControl.valueChanges.subscribe(term => {
      this.applyFilterAndSort(term || '');
    });
  }

  loadCases(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courtService.getCases().subscribe({
      next: (data) => {
        this.allCases = data;
        this.applyFilterAndSort(this.searchControl.value || '');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching cases', err);
        this.errorMessage = 'Failed to load case list.';
        this.isLoading = false;
      }
    });
  }

  sortBy(column: keyof CaseList): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort(this.searchControl.value || '');
  }

  applyFilterAndSort(searchTerm: string): void {
    let result = [...this.allCases];

    // 1. Search Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(c => 
        c.caseNumber.toLowerCase().includes(term) ||
        c.defendantName.toLowerCase().includes(term) ||
        c.orderType.toLowerCase().includes(term) ||
        c.status.toLowerCase().includes(term)
      );
    }

    // 2. Sort
    if (this.sortColumn) {
      result.sort((a, b) => {
        const valA = String(a[this.sortColumn as keyof CaseList]).toLowerCase();
        const valB = String(b[this.sortColumn as keyof CaseList]).toLowerCase();
        
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredCases = result;
    this.currentPage = 1; // Reset to first page on new search/sort
  }

  // Pagination getters
  get totalPages(): number {
    return Math.ceil(this.filteredCases.length / this.pageSize);
  }

  get paginatedCases(): CaseList[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCases.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changePageSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = Number(select.value);
    this.currentPage = 1;
  }
}
