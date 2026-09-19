import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FeedContentComponent } from "./components/feed-content/feed-content.component";
import { RightbarComponent } from "./components/rightbar/rightbar.component";
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-feed',
  imports: [SidebarComponent, FeedContentComponent, RightbarComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent  {





}
