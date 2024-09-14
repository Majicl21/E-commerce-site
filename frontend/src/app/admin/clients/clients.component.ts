import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: any[] = []; // Variable to store clients data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/client/')
      .subscribe(data => {
        this.clients = data;
        console.log(data)
      }, error => {
        console.error('Error fetching clients:', error);
      });
  }
}
