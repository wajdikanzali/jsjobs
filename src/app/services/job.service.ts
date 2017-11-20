import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {

  initialJobs = [];
	jobs = [];
	jobsSubject = new Subject();

  constructor(private http:Http) { }

   getJobs(){
    // on a à la fois des données de jobs.json + des données ajoutées par notre formulaire
    // on a pas encore récupéré de donnée depuis jobs.json
    // on a des jobs récupéré de jobs.json
    if(this.jobs.length > 0 && this.initialJobs.length > 0){
      console.log('case if');
      return Observable.of([...this.jobs, ...this.initialJobs])

    }else if (this.jobs.length > 0 && this.initialJobs.length === 0){
      console.log('case else if');
      return this.http.get('data/jobs.json')
                      .map(res => res.json())
                      .do(data => {
                        this.initialJobs = data;
                        this.jobs = [...this.jobs, ...this.initialJobs];
                      });
    }else {
      console.log('case else');
      return this.http.get('data/jobs.json')
                      .map(res => res.json())
                      .do(data => this.initialJobs = data);
    }
    
  }

  addJob(jobData) {
  	jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
  	return this.jobsSubject.next(jobData);

  }

}