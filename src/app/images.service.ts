import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');


// import { IpcRenderer } from 'electron';




// const { ipcRenderer } = (<any> window).require('electron');
// declare global {
//   interface Window {
//     require: any;
//   }
// }
// const electron = window.require("electron");

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images = new BehaviorSubject<string[]>([]);
  directory = new BehaviorSubject<string[]>([]);

  // private _ipc: IpcRenderer | undefined;

  // constructor() {
  //   //if (window.require) {
  //     try {
  //       this._ipc = window.require('electron').ipcRenderer;
  //       this._ipc.on('getImagesResponse', (event, images) => {  
  //         this.images.next(images);
  //       });
  //       this._ipc.on('getDirectoryResponse', (event, directory) => {
  //           this.directory.next(directory);
  //       });

  //     } catch (e) {
  //       throw e;
  //     }
  //   //} else {
  //   //  console.warn('Electron\'s IPC was not loaded');
  //   //}
  // }

  constructor() {
    electron.ipcRenderer.on('getImagesResponse', (event, images) => {
      this.images.next(images);
    });
    electron.ipcRenderer.on('getDirectoryResponse', (event, directory) => {
      this.directory.next(directory);
    });
  }

  navigateDirectory(path) {
    electron.ipcRenderer.send('navigateDirectory', path); // ok
  }
}