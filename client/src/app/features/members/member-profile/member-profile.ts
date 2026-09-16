import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  protected member = signal<Member | undefined>(undefined);
  protected editableMember?: EditableMember;

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data['member']);
      this.editableMember = {
        displayName: this.member()?.displayName || '',
        description: this.member()?.description || '',
        city: this.member()?.city || '',
        country: this.member()?.country || ''
      };
    });
  }
}
