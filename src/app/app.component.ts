import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtifactListService } from './services/artifact-list.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('searchField') public readonly searchField!: ElementRef<HTMLInputElement>;

  constructor(public artifactListService: ArtifactListService) { }

  public ngOnInit(): void {
    this.artifactListService.initList();
  }

  public onCardClick(artifactName: string): void {
    this.resetSearchfield();

    this.artifactListService.handleArtifactClick(artifactName);
  }

  public onSearchInput(event: Event): void {
    this.artifactListService.handleSearch((event.target as HTMLInputElement).value);
  }

  public handleReset(): void {
    this.resetSearchfield();

    this.artifactListService.resetList();
  }

  private resetSearchfield(): void {
    this.searchField.nativeElement.value = '';
  }
}
