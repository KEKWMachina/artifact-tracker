import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { artifactList } from '../configs/artifact-list.config';

@Injectable({
  providedIn: 'root'
})
export class ArtifactListService {
  private readonly artifactListKey = 'artifactList';

  public readonly artifactList = new BehaviorSubject(artifactList);

  public initList(): void {
    const savedList = this.getFoundArtifacts();
    const listWithStatus = artifactList.map((artifactObj) => ({
      ...artifactObj,
      found: savedList.includes(artifactObj.name),
    }))

    this.artifactList.next(listWithStatus);
  }

  public resetList(): void {
    localStorage.setItem(this.artifactListKey, JSON.stringify([]));

    this.initList();
  }

  public handleSearch(search: string): void {
    const searchData = search.trim().toLowerCase();
    const savedList = this.getFoundArtifacts();
    const listWithStatus = artifactList.map((artifactObj) => ({
      ...artifactObj,
      found: savedList.includes(artifactObj.name),
    }))

    this.artifactList.next(listWithStatus.filter(({ name }) => name.toLowerCase().includes(searchData)))
  }

  public handleArtifactClick(artifactName: string): void {
    const savedList = this.getFoundArtifacts();

    if (savedList.includes(artifactName)) {
      localStorage.setItem(this.artifactListKey, JSON.stringify(savedList.filter((name: string) => name !== artifactName)));
    } else {
      localStorage.setItem(this.artifactListKey, JSON.stringify([...savedList, artifactName]));
    }

    this.initList();
  }

  private getFoundArtifacts(): string[] {
    return JSON.parse(localStorage.getItem(this.artifactListKey) as string) || [];
  }
}
