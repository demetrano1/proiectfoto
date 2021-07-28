import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3000/categories`);
  }

  public createCategory(category: Category): Observable<Category> {
    console.log(category)

    return this.http.post<Category>('http://localhost:3000/categories', category, {
      headers:  { 
        'accept': 'application/json',
        'content-type': 'application/json'
      }  
    })
  }


  public createPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>('http://localhost:3000/photos', photo, {
      headers:  { 
        'accept': 'application/json',
        'content-type': 'application/json'
      }  
    });
  }

  public deletePhoto(photoId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/photos/${photoId}`);
  }

  // public createPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>('http://localhost:3000/posts', post);
  // }

  // public deletePost(postId: number): Observable<void> {
  //   return this.http.delete<void>(`http://localhost:3000/posts/${postId}`);
  // }

  // public updatePost(postId: number, post: Post): Observable<Post> {
  //   return this.http.put<Post>(`http://localhost:3000/posts/${postId}`, post);
  // }

  public getCategory(cateogyId: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories/${cateogyId}`);
  }
  
  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`http://localhost:3000/photos`);
  }

  public getPhotosByCategory(categoryId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`http://localhost:3000/photos?categoryId=${categoryId}`);
  }

  // public getComments(postId: number, page: number, limit: number = 10): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(`http://localhost:3000/posts/${postId}/comments?_page=${page}&_limit=${limit}`);
  // }

  // public addComment(postId: number, comment: Comment): Observable<Comment> {
  //   return this.http.post<Comment>(`http://localhost:3000/posts/${postId}/comments`, comment);
  // }

  // public searchPosts(searchString: string, page: number, limit: number = 10): Observable<Post[]> {
  //   return this.http.get<Post[]>(`http://localhost:3000/posts?q=${searchString}&_page=${page}&_limit=${limit}`);
  // }
}


// "title": "Travel",
// "description": "Gallery of travel photos",
// "author": "Dumitru",
// "id": "travel"
export interface Category {
  id: string;
  title: string;
  description: string;
  author: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  photo: string;
  link?:string;
}
