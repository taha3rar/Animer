import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ecosystem } from '@app/core/models/ecosystem';
import { defaultValues } from '@app/shared/helpers/default_values';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { EcosystemService } from '@app/core';
import { Client } from '@app/core/models/user/client';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent extends BaseListComponent implements OnInit {
  ecosystem: Ecosystem;
  userClients: Client[];
  potentialClients: Client[];

  constructor(private route: ActivatedRoute, private ecosystemService: EcosystemService, protected router: Router) {
    super(ecosystemService, router, {
      deleteText: 'Once deleted, you will need to add the user again to this ecosystem!'
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ ecosystem, userClients }) => {
      this.ecosystem = ecosystem;
      this.userClients = userClients;

      this.potentialClients = userClients.filter((item: Client) => {
        return !ecosystem.participants.some((other: Client) => {
          return item._id === other._id;
        });
      });
    });
  }

  back() {
    this.router.navigateByUrl('/ecosystem');
  }

  get ownedBy() {
    return `${this.ecosystem.created_by.first_name} ${this.ecosystem.created_by.last_name}`;
  }

  getProfilePicture(profilePicture: string) {
    return profilePicture || defaultValues.profile_picture;
  }

  delete(userId: string) {
    this.ecosystemService.deleteParticipant(this.ecosystem._id, userId).subscribe(
      () => {
        this.router.navigate([this.router.url]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
