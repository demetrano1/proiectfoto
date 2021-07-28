import { Component, OnInit } from '@angular/core';
import { Category, PhotoService } from '../photo.service';
import { FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];


  categoryForm = this.formBuilder.group({
    title: "",
    description: "",
    author: ""
  });


  constructor(private PhotoService: PhotoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.PhotoService.getCategories().subscribe((allCategories: Category[]) => {
      this.categories = allCategories;
    });
  }


  onSubmit(): void {
    // Process checkout data here
    this.PhotoService.createCategory({
      ...this.categoryForm.value,
      id: uuidv4(),
    }).subscribe((data) => {
      this.categories = [...this.categories, data]
      this.categoryForm.reset()

    })
  }

}
