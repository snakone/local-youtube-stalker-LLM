import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })

export class CrafterService {
  private _snackBar = inject(MatSnackBar);

  public openSnackBar(message: string, action: string = 'Cerrar') {
    this._snackBar.open(
      message, 
      action, 
      {
        verticalPosition: 'bottom', 
        horizontalPosition: 'center',
        direction: 'ltr',
        duration: 5000,
        politeness: "assertive"
      });
  }
}