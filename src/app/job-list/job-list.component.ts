import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

	jobs = [];
  error = '';

  constructor(private http:Http, private jobService: JobService) { }

  ngOnInit() {
  	
    this.jobService.getJobs()
          .subscribe(
              data => {
                this.jobs = data;
                console.log(data);
              },
              error => {
                console.error(error);
                this.error = error;
              }
            );

  }



}
