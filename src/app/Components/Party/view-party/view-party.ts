import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PartyService } from '../../../Services/party-service';
import { IParty } from '../../../ClassesAndInterfaces/IParty';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-party',
  imports: [RouterLink],
  templateUrl: './view-party.html',
  styleUrl: './view-party.css',
})
export class ViewParty implements OnInit {
  constructor(private ps: PartyService, private cdr: ChangeDetectorRef){}
  parties: IParty[] = [];

  ngOnInit(): void {
    this.ps.GetParties().subscribe(res => {
      this.parties = res;
      this.cdr.detectChanges();
    });
  }


searchTerm = '';
currentPage = 1;
pageSize = 10;

// Search across the party's main fields.
get filteredParties() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    return this.parties;
  }

  return this.parties.filter((party: any) =>
    [
      party.PartyCode,
      party.PartyName,
      party.Phone,
      party.Email,
      party.Website
    ].some(value =>
      String(value ?? '').toLowerCase().includes(term)
    )
  );
}

// Calculate the number of pages.
get totalPages(): number {
  return Math.max(
    1,
    Math.ceil(this.filteredParties.length / this.pageSize)
  );
}

// Return only the records for the current page.
get paginatedParties() {
  const startIndex = (this.currentPage - 1) * this.pageSize;

  return this.filteredParties.slice(
    startIndex,
    startIndex + this.pageSize
  );
}

// Last item number displayed on the current page.
get endItem(): number {
  return Math.min(
    this.currentPage * this.pageSize,
    this.filteredParties.length
  );
}

// Page numbers displayed in the pagination bar.
get pageNumbers(): number[] {
  return Array.from(
    { length: this.totalPages },
    (_, index) => index + 1
  );
}

// Search handler.
onSearch(event: Event): void {
  this.searchTerm =
    (event.target as HTMLInputElement).value;

  this.currentPage = 1;
}

// Change page size.
changePageSize(event: Event): void {
  this.pageSize = Number(
    (event.target as HTMLSelectElement).value
  );

  this.currentPage = 1;
}

// Navigate between pages.
  goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    }
  }

} // class...
