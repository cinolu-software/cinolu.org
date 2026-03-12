import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParticipation, IProject } from '@shared/models/entities.models';

export interface MentorParticipationsFilter {
  page?: number;
  q?: string;
  phaseId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
  private _http = inject(HttpClient);

  /**
   * GET /projects/me/mentored-projects
   * Returns Project[] — no pagination wrapper here (plain array in controller).
   */
  getMentoredProjects(): Observable<IProject[]> {
    return this._http
      .get<{ data: IProject[] }>('projects/me/mentored-projects')
      .pipe(map((res) => res.data));
  }

  /**
   * GET /projects/me/mentored-projects/:projectId
   * Returns a single Project with phases, deliverables, mentors, gallery, participantsCount
   */
  getMentoredProject(projectId: string): Observable<IProject> {
    return this._http
      .get<{ data: IProject }>(`projects/me/mentored-projects/${projectId}`)
      .pipe(map((res) => res.data));
  }

  /**
   * GET /projects/me/mentored-projects/:projectId/participations
   * Returns [ProjectParticipation[], number] — paginated tuple
   * Supports query params: page, q, phaseId
   */
  getMentoredProjectParticipations(
    projectId: string,
    filter: MentorParticipationsFilter = {}
  ): Observable<[IParticipation[], number]> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', String(filter.page));
    if (filter.q) params = params.set('q', filter.q);
    if (filter.phaseId) params = params.set('phaseId', filter.phaseId);

    return this._http
      .get<{ data: [IParticipation[], number] }>(
        `projects/me/mentored-projects/${projectId}/participations`,
        { params }
      )
      .pipe(map((res) => res.data));
  }

  /**
   * GET /projects/me/mentored-projects/:projectId/participations/:participationId
   * Returns a full participation with user, venture, project, phases, deliverable_submissions, etc.
   */
  getMentoredProjectParticipation(
    projectId: string,
    participationId: string
  ): Observable<IParticipation> {
    return this._http
      .get<{ data: IParticipation }>(
        `projects/me/mentored-projects/${projectId}/participations/${participationId}`
      )
      .pipe(map((res) => res.data));
  }
}
