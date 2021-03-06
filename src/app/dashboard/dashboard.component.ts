import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/interfaces/book.interface';
import { SearchResult } from 'src/app/core/interfaces/search-result.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly notSpaceErrorString = 'Not enough space';

  addBookForm: FormGroup;
  searchForm: FormGroup;
  sizesForm: FormGroup;
  searchResult: SearchResult;
  shelves$: Observable<Book[][]>;
  notSpaceErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly libraryService: LibraryService
  ) {
    this.shelves$ = this.libraryService.shelves$;
  }

  ngOnInit() {
    this.buildForms();
  }

  private buildForms() {
    this.addBookForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      author: [null, Validators.compose([Validators.required])],
      size: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidators.maxIntegerValidator(
            this.libraryService.getShelfSize()
          )
        ])
      ]
    });
    this.searchForm = this.formBuilder.group({
      search: [null, Validators.compose([Validators.required])]
    });
    this.sizesForm = this.formBuilder.group({
      shelfSize: [
        this.libraryService.getShelfSize(),
        Validators.compose([Validators.required])
      ],
      shelvesSize: [
        this.libraryService.getShelvesSize(),
        Validators.compose([Validators.required])
      ]
    });
  }

  addBook() {
    this.resetNotSpaceErrorMessage();
    if (!this.libraryService.add(this.addBookForm.getRawValue())) {
      this.setNotSpaceErrorMessage();
    }
  }

  removeBook(index: number) {
    this.libraryService.delete(Number(index));
    this.resetNotSpaceErrorMessage();
  }

  searchBook() {
    this.searchResult = this.libraryService.search(
      this.searchForm.get('search').value
    );
  }

  onLogout() {
    this.authService.authenticated = false;
    this.router.navigate(['']);
  }

  setSizes() {
    this.libraryService.setSize(
      this.sizesForm.get('shelfSize').value,
      this.sizesForm.get('shelvesSize').value
    );
    this.resetNotSpaceErrorMessage();
  }

  resetNotSpaceErrorMessage() {
    this.notSpaceErrorMessage = '';
  }

  setNotSpaceErrorMessage() {
    this.notSpaceErrorMessage = this.notSpaceErrorString;
  }

  trackByShelves(index: number) {
    return index;
  }
}
