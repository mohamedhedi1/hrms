import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectManagementService } from '../../../core/services/projectManagement.service';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-projectCard',
  templateUrl: './projectCard.component.html',
  styleUrls: ['./projectCard.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  projects: Project[] = [];
  constructor(private projectService: ProjectManagementService) {}

  ngOnInit() {}
}
