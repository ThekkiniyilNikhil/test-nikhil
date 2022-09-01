import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import usersData from '../../assets/users.json';
import { Users } from '../app.modal';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  users: Users[] = usersData;
  displayedColumns: string[] = ['user', 'email', 'phone', 'status', 'action'];
  dataSource: MatTableDataSource<Users>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  quickFilterButtons: string[] = ['active', 'inactive', 'blocked'];
  activeIdx = -1;

  constructor(public dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource(this.users);
   }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Users, filter: string) => data.status === filter;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * method to filter status column by active, inactive, blocked status
   * @param statusColValue value of status col
   */
   filterStatusColumnFn(statusColValue: string, idx: number) {
    if(this.activeIdx === idx) {
      this.dataSource.filter = '';
      this.activeIdx = -1;
    } else {
      this.activeIdx = idx;
      this.dataSource.filter = statusColValue;
    }
  }
  /**
   * method to delete single user from list
   * @param user
   */
  deleteConfirmationFn(user: Users) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '480px',
      height: '220px',
      data: user
    });
    dialogRef.afterClosed().subscribe((result: Users) => {
      this.users = this.users.filter(user => user._id !== result._id);
      this.dataSource.data = this.users;
    })
  }
  /**
   * method to navigate to the users details page
   * @param user
   */
  viewUserDetFn(user: Users) {
    this.router.navigate(['/view-details', user._id]);
  }
  /**
   * method to navigate to create user
   */
  navigateToCreateUserFn() {
    this.router.navigateByUrl('/create-user');
  }
  /**
   * method to navigate to edit user page
   * @param user - edit user details
   */
  editUsersDetFn(user: Users) {
    this.router.navigate(['edit-user', user._id]);
  }

}
