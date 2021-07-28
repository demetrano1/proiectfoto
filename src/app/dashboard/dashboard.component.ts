import { Component, OnInit } from '@angular/core';
import { Category, Photo, PhotoService } from '../photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'photo project';

  public categories: Category[] = [];

  public photos: Photo[] = [];

  public selectedCategories: string[] = []




  constructor(private PhotoService: PhotoService) { }

  ngOnInit(): void {
    this.PhotoService.getCategories().subscribe((allCategories: Category[]) => {
      this.categories = allCategories;
      this.selectedCategories = this.categories.map(c => c.id)
    });

    this.PhotoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
    });
    
  }



  onClickCategory(id: string) {
    console.log('id', id)
    if(this.selectedCategories.indexOf(id) === -1) {
      this.selectedCategories = [...this.selectedCategories, id]
    } else {
      this.selectedCategories = this.selectedCategories.filter(s => s !== id)
    }
  }


}
