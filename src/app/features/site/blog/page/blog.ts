import { Component } from '@angular/core';
import {
  Calendar1,
  Info,
  LucideAngularModule,
  MessageCircleMore,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { HeroBlog } from '../components/hero-blog/hero-blog';
import { RouterLink } from '@angular/router';
import { BLOGS } from '../data/blogs.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, HeroBlog, RouterLink, CommonModule],
  templateUrl: './blog.html',
  styles: ``,
})
export class Blog {
  postBlogs = BLOGS;

  icons = {
    info: Info,
    userPlus: UserPlus,
    tag: Tag,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
  };

  latestPost = this.postBlogs.reduce((latest, post) =>
    new Date(post.date) > new Date(latest.date) ? post : latest,
  );

  latestFivePosts = [...this.postBlogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
}
