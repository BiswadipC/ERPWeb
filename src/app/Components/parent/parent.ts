import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-parent',
  imports: [Navbar, RouterOutlet],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {

}
