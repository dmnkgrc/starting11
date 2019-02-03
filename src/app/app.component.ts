import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { DeviceDetectorService } from "ngx-device-detector";
import { CdkDragDrop, copyArrayItem } from "@angular/cdk/drag-drop";
const jersey = require("!!svg-url-loader?limit=8000&noquotes&stripdeclarations!../assets/jersey.svg");

interface Player {
  number: number;
  name: string;
  position: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  jerseySVG: SafeUrl;
  // For better mobile UX
  events: string[] = [];
  opened = true;
  mobile = false;
  filter = "";
  // Lists of players
  availablePlayers = [];
  selectedPlayers = new Array(11);
  constructor(
    private domSanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService
  ) {
    // Get players
    this.availablePlayers = [
      {
        name: "Test Player",
        number: 1,
        position: "goalkeeper"
      },
      {
        name: "Test Player",
        number: 2,
        position: "defense"
      },
      {
        name: "Test Player",
        number: 3,
        position: "defense"
      },
      {
        name: "Test Player",
        number: 22,
        position: "midfielder"
      },
      {
        name: "Test Player",
        number: 9,
        position: "forward"
      }
    ];

    this.availablePlayers.sort((a, b) => {
      if (a.position === "goalkeeper") {
        return -1;
      } else if (b.position === "goalkeeper") {
        return 1;
      } else if (a.position === "defense") {
        return -1;
      } else if (b.position === "defense") {
        return 1;
      } else if (a.position === "midfielder") {
        return -1;
      } else if (b.position === "midfielder") {
        return 1;
      } else if (a.position === "forward") {
        return -1;
      }
      return 1;
    });
    // Make angular trust the URL for the svg
    this.jerseySVG = domSanitizer.bypassSecurityTrustUrl(jersey);
    this.mobile = !this.deviceService.isDesktop();
    if (this.mobile) {
      this.opened = false;
    }
  }

  isSelected(num: number): boolean {
    // Returns true if the player is already in the field
    return this.selectedPlayers.some(player => player.number === num);
  }

  // Removes a selected player from the list
  removeItem(index: number) {
    this.selectedPlayers.splice(index, 1);
  }

  // Gets the filtered players
  filteredPlayers(): Player[] {
    if (!this.filter) {
      return this.availablePlayers;
    }
    const filter = this.filter.toLowerCase();
    return this.availablePlayers.filter(
      player =>
        player.name.toLowerCase().includes(filter) ||
        player.number.toString().includes(filter) ||
        player.position.includes(filter)
    );
  }

  // Save team to database
  saveTeam() {}

  // Drops a player into the field
  drop(event: CdkDragDrop<Player[]>, position) {
    if (event.previousContainer !== event.container) {
      // If player was previously selected, remove previous selection
      if (
        this.isSelected(
          event.previousContainer.data[event.previousIndex].number
        )
      ) {
        const index = this.selectedPlayers.findIndex(
          player =>
            player.number ===
            event.previousContainer.data[event.previousIndex].number
        );
        this.removeItem(index);
      }
      // Copies a player from the availablePlayers to the selectedPlayers array
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        position
      );
    }
  }
}
