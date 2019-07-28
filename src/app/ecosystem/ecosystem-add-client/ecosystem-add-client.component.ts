import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Client } from '@app/core/models/user/client';
import { EcosystemService } from '@app/core';
import { Router } from '@angular/router';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';

@Component({
  selector: 'app-ecosystem-add-client',
  templateUrl: './ecosystem-add-client.component.html',
  styleUrls: ['./ecosystem-add-client.component.scss']
})
export class EcosystemAddClientComponent extends BaseListComponent implements OnInit {
  @Input()
  clients: Client[];

  @Input()
  ecosystemId: string;

  @ViewChild('closeModal')
  closeModal: ElementRef;

  newParticipants: Client[];

  constructor(private ecosystemService: EcosystemService, protected router: Router) {
    super();
    this.newParticipants = [];
  }

  ngOnInit() {}

  pushClient(client: Client) {
    const idx = this.newParticipants.indexOf(client);
    if (idx > -1) {
      this.newParticipants.splice(idx, 1);
    } else {
      this.newParticipants.push(client);
    }
  }

  save() {
    if (this.newParticipants.length > 0) {
      this.ecosystemService.addParticipants(this.ecosystemId, this.newParticipants).subscribe(() => {
        this.newParticipants = [];
        this.closeModal.nativeElement.click();
        this.router.navigate([this.router.url]);
      });
    } else {
      this.closeModal.nativeElement.click();
    }
  }
}
