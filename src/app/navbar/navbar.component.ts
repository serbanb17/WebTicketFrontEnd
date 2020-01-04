import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
    }

    search() {
        var textInput: HTMLInputElement = document.getElementById("searchText") as HTMLInputElement;
        var searchText: string = textInput.value.replace('\\', ' ').replace('/', ' ');
        textInput.value = '';
        
        this.router.navigate(['event-search/6/0/' + encodeURIComponent(searchText)]);
        this.triggerNavbarTogglerClick();
    }

    triggerNavbarTogglerClick() {
        if (window.getComputedStyle(document.getElementsByClassName("navbar-toggler")[0] as HTMLElement).display == 'block')
            (document.getElementsByClassName("navbar-toggler")[0] as HTMLElement).click();
    }

    enterDown(event) {
        if(event.key === "Enter") {
            this.search();
        }
    }
}
