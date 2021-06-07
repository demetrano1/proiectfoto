import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  public getPosts(page: number, limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`);
  }

  public createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/posts', post);
  }

  public deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/posts/${postId}`);
  }

  public updatePost(postId: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`http://localhost:3000/posts/${postId}`, post);
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${postId}`);
  }

  public getComments(postId: number, page: number, limit: number = 10): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:3000/posts/${postId}/comments?_page=${page}&_limit=${limit}`);
  }

  public addComment(postId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`http://localhost:3000/posts/${postId}/comments`, comment);
  }

  public searchPosts(searchString: string, page: number, limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts?q=${searchString}&_page=${page}&_limit=${limit}`);
  }
}

export interface Post {
  id?: number;
  title: string;
  description: string;
  author: string;
}

export interface Comment {
  id?: number;
  title: string;
  description: string;
}
