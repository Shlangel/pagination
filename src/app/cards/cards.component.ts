import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { UserService }  from '../user.service';
import { User, UserResponse } from '../user';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  users: User[] = [];
  pageEvent: PageEvent;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  public currentPage: number = 1;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsersData(this.currentPage)
      .subscribe(response => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.pageSize = response.per_page;
        this.totalItems = response.total;
      });
  }

  pageEventHandler(pageData) {
    this.userService.getUsersData(pageData.pageIndex + 1)
      .subscribe(response => {
        this.currentPage = response.page;
        this.users = response.data;
      })
  }

  navigateToDetails(id) {
    this.router.navigate([`/cards/${id}`])
  }
}
