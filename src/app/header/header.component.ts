import { Component, OnInit } from '@angular/core';
import { Category, PhotoService } from '../photo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public categories: Category[] = [];

  constructor(private PhotoService: PhotoService) { }
  ngOnInit(): void {
    this.PhotoService.getCategories().subscribe((allCategories: Category[]) => {
      this.categories = allCategories;
    });
  }

}
