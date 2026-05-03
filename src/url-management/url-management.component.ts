import { Component, OnInit } from '@angular/core';
import { UrlService } from './url-management.service';

@Component({
  selector: 'app-url-management',
  templateUrl: './url-management.component.html',
  styleUrls: ['./url-management.component.scss']
})
export class UrlManagementComponent implements OnInit {
  urlToShorten: string = '';
  isPrivateChecked: boolean = false;
  searchQuery: string = '';
  publicUrls: any[] = [];

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.loadUrls();
  }

  loadUrls() {
    this.urlService.getAllUrls().subscribe((data: any) => {
      this.publicUrls = data;
    });
  }

  generateUrl() {
    if (!this.urlToShorten) return;
    this.urlService.shortenUrl(this.urlToShorten, this.isPrivateChecked).subscribe(() => {
      this.urlToShorten = '';
      this.loadUrls();
    });
  }

  deleteUrl(id: any) {
    this.urlService.deleteUrl(id).subscribe(() => {
      this.loadUrls();
    });
  }

  copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    alert('Copied to clipboard!');
  }

  clickUrl(id: any){
  this.urlService.clickUrl(id).subscribe(() => {
      this.loadUrls();
    });
  }
}