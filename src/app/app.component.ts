import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DeviceDetectorService } from "ngx-device-detector";
import { TeamService } from "./team.service";
import { CdkDragDrop, CdkDrag } from "@angular/cdk/drag-drop";
import { capitalize, sortBy } from "lodash";
import { Player, Team } from "./team";
import moment from "moment";

const jersey = require("!!svg-url-loader?limit=8000&noquotes&stripdeclarations!../assets/jersey.svg");
import players from "../assets/team-209.json";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  jerseySVG: string;
  // For better mobile UX
  events: string[] = [];
  opened = true;
  mobile = false;
  filter = "";
  // Lists of players
  availablePlayers: Player[] = [];
  selectedPlayers: Player[] = new Array(11);

  teams$: Observable<Team[]>;

  constructor(
    private deviceService: DeviceDetectorService,
    public teamService: TeamService
  ) {
    // Get players
    this.availablePlayers = players;

    // Sort players by position for more readability
    this.availablePlayers.sort((a, b) => {
      if (a.position === "Goalkeeper") {
        return -1;
      } else if (b.position === "Goalkeeper") {
        return 1;
      } else if (a.position === "Defender") {
        return -1;
      } else if (b.position === "Defender") {
        return 1;
      } else if (a.position === "Midfielder") {
        return -1;
      } else if (b.position === "Midfielder") {
        return 1;
      } else if (a.position === "Forward") {
        return -1;
      }
      return 1;
    });

    // Sort the already created teams from newest to oldest
    this.teams$ = this.teamService.getTeams().pipe(
      map(teams => {
        return sortBy(teams, ["created_at"]).reverse();
      })
    );

    // Make angular trust the URL for the svg
    this.jerseySVG = jersey;

    // Close sidebar for mobile devices by default
    this.mobile = !this.deviceService.isDesktop();
    if (this.mobile) {
      this.opened = false;
    }
  }

  isSelected(num: number): boolean {
    // Returns true if the player is already in the field
    return this.selectedPlayers.some(player => player && player.number === num);
  }

  // Removes a selected player from the list
  removeItem(index: number) {
    this.selectedPlayers[index] = null;
  }

  // Gets the filtered players
  filteredPlayers(): Player[] {
    if (!this.filter) {
      return this.availablePlayers;
    }
    const filter = this.filter.toLowerCase();

    // Try to find by position, name and number
    return this.availablePlayers.filter(
      player =>
        player.name.toLowerCase().includes(filter) ||
        player.number.toString().includes(filter) ||
        player.position.toLowerCase().includes(filter)
    );
  }

  // Save team to database
  saveTeam() {
    if (confirm("Save progress?")) {
      this.teamService.saveTeam(this.selectedPlayers).subscribe(team => {
        this.teams$ = this.teamService.getTeams();
      });
    }
  }

  // Converts timestamp to human date
  toHuman(timestamp: string) {
    return moment(timestamp).fromNow();
  }

  // Retrieve team
  selectTeam(team: Team) {
    this.selectedPlayers = [...team.players];
  }

  // Gets the height of the grid rows
  getRowHeight(): string {
    const windowHeight = window.innerHeight;
    return `${(windowHeight - 64) / 8}px`;
  }

  // Gets the ids of the connected players
  getConnectedItems(): string[] {
    const result = [];
    for (let i = 0; i < 12; i++) {
      result.push(`selectedPlayers${i}`);
    }
    return result;
  }

  // Check if is Defender row
  isDefenderRow(index): boolean {
    return index === 0 || index === 3 || index === 7 || index === 10;
  }

  // Check if it is a row which starts with a Midfielder
  isMidfielderRow(index): boolean {
    return index === 1 || index === 8;
  }

  // Gets players filtered by position
  getByPosition(team: Team, position: string) {
    return team.players.filter(player => player.position === position);
  }

  // Drops a player into the field
  drop(event: CdkDragDrop<Player[]>, position) {
    const data = event.previousContainer.data[event.previousIndex];
    const positions = [
      "Defender",
      "Midfielder",
      "Forward",
      "Defender",
      "Goalkeeper",
      "Midfielder",
      "Forward",
      "Defender",
      "Midfielder",
      "Forward",
      "Defender"
    ];

    // Do not allow to add players to incorrect positions
    if (data.position !== positions[position]) {
      return;
    }

    // Only do something if it is not being added to original list
    if (event.previousContainer !== event.container) {
      // If player was previously selected, remove previous selection
      if (this.isSelected(data.number)) {
        const index = this.selectedPlayers.findIndex(
          player => player.number === data.number
        );
        this.removeItem(index);
      }
      // Copies a player from the availablePlayers to the selectedPlayers array
      this.selectedPlayers[position] =
        event.previousContainer.data[event.previousIndex];
    }
  }
}
