import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ecosystem } from '@app/core/models/ecosystem';
import { defaultValues } from '@app/shared/_helpers/default_values';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { EcosystemService } from '@app/core';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent extends BaseListComponent implements OnInit {
  ecosystem: Ecosystem;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private ecosystemService: EcosystemService,
    protected router: Router
  ) {
    super(ecosystemService, router, {
      deleteText: 'Once deleted, you will need to add the user again to this ecosystem!'
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ ecosystem }) => {
      this.ecosystem = ecosystem;
    });
  }

  back() {
    this.location.back();
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
