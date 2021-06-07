import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public postId: number;
  public post: Post | undefined;
  public comments: Comment[] = [];

  constructor(private activatedRoute: ActivatedRoute, private postsService: PostsService) {
    this.postId = this.activatedRoute.snapshot.params.postId;
  }

  ngOnInit(): void {
    this.postsService.getPost(this.postId).subscribe((currentPost: Post) => {
      this.post = currentPost;
    });

    this.postsService.getComments(this.postId, 1).subscribe((allComments: Comment[]) => {
      this.comments = allComments;
    });
  }

}
