import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Photo, PhotoService } from '../photo.service';
import { FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  public categoryId: string;
  public category: Category | undefined;
  public photos: Photo[] = [];


  photoForm = this.formBuilder.group({
    title: "",
    description: "",
    categoryId: "",
    photo: "",
    link: ""
  });


  constructor(private activatedRoute: ActivatedRoute, private PhotoService: PhotoService, private formBuilder: FormBuilder,) {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
  }

  ngOnInit(): void {
    this.PhotoService.getCategory(this.categoryId).subscribe((currentCategory: Category) => {
      this.category = currentCategory;
    });

    this.PhotoService.getPhotosByCategory(this.categoryId).subscribe((photos: Photo[]) => {
      this.photos = photos.map(photo => ({
        ...photo,
        photo: photo?.photo?.includes("data:image/jpeg;base64,") ? photo.photo : 'data:image/jpeg;base64,' + photo.photo
      }));
    });
  }


  onSubmit(): void {
    this.PhotoService.createPhoto({
      ...this.photoForm.value,
      id: uuidv4(),
      categoryId: this.categoryId
    }).subscribe((data) => {
      this.photos = [
        ...this.photos,
        data
      ]
      this.photoForm.reset()
    })
  }




  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        console.log(reader.result)
        this.photoForm.patchValue({
          photo: reader.result as string
        });

      };
    }
  }


}
