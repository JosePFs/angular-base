import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shelves: any[];
  addBookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly libraryService: LibraryService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getShelves();
  }

  private buildForm() {
    this.addBookForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      author: [null, Validators.compose([Validators.required])],
      size: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidators.maxIntegerValidator(5)
        ])
      ]
    });
  }

  private getShelves() {
    this.shelves = this.libraryService.shelves(5, 5);
  }

  addBook() {
    this.libraryService.add(this.addBookForm.getRawValue());
    this.shelves = this.libraryService.shelves(5, 5);
  }

  removeBook(index: number) {
    this.libraryService.delete(Number(index));
    this.shelves = this.libraryService.shelves(5, 5);
  }

  onLogout() {
    this.authService.authenticated = false;
    this.router.navigate(['']);
  }

  trackByFn(index: number) {
    return index;
  }
}
