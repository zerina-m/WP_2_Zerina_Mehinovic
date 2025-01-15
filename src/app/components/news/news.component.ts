import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
   newsData: any[] = [];

   constructor(private newsService: NewsService) {}

   ngOnInit(): void {
       this.newsService.getNews().subscribe(
         (data: any) => {
           this.newsData = data;
         },
         (error: any) => {
           console.error('Error fetching news data', error);
         }
       );
     }
}
