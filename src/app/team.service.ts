import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Team } from "./team";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  // Get all teams
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>("http://localhost:4201/teams");
  }

  saveTeam(starting11) {
    return this.http.post("http://localhost:4201/teams", {
      players: starting11
    });
  }
}
