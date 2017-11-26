import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

	form: FormGroup;

	contractTypes = [
		{id: 1, name: 'stage', value: 'intership'},
		{id: 2, name: 'cdi', value: 'permanent'},
		{id: 3, name: 'cdd', value: 'fixed-term'},
		{id: 4, name: 'indépendant', value: 'freelance'},
		{id: 5, name: 'intérim', value: 'temp'},
	];

	currencies = [
    {id: 1, name: 'euros', value: 'EU', symbol: '€'},
    {id: 2, name: 'livres sterling', value: 'POUNDS', symbol: '£'},
    {id: 3, name: 'francs CFA', value: 'CFA', symbol: 'CFA'},
    {id: 4, name: 'dollars canadien', value: 'CAD', symbol: '$'}
    ];

  statuses = [
    {id: 1, name: 'cadre', value: 'executive'},
    {id: 1, name: 'employé', value: 'employee'}
  ];

  experience = [
    { id: 1, name: 'junior', value: 'junior'},
    { id: 2, name: 'medior', value: 'medior'},
    { id: 3, name: 'senior', value: 'senior'}
  ];

  areas = [
    {id: 1, name: 'aucun déplacements', value: 'none'},
    {id: 2, name: 'déplacements régionaux', value: 'region'},
    {id: 3, name: 'déplacements nationaux', value: 'nation'},
    {id: 4, name: 'déplacements internationaux', value: 'international'}
  ];

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({

  		id: -1,
  		title: '',
  		company: '',
  		city: '',
  		zipcode: 35,
  		description: '',
  		contract: '',
  		salary: null,
  		currency: '',
  		startdate: new Date(),
  		experience: '',
  		status: '',
  		area: '',
  		field:'',
  		publishdate: new Date(),
  		lastupdate: new Date()
  	});
  }

  createJob(jobData){
  	this.jobService.addJob(jobData).subscribe();
  }

}
