import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kontakt',
  imports: [FormsModule, RouterLink],
  templateUrl: './kontakt.component.html',
  styleUrl: './kontakt.component.scss'
})
export class KontaktComponent {

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  privacyAccepted = false;

  mailTest = true;      // true = lokal simulieren (kein Versand), false = echt senden

  post = {
    endPoint: 'https://bautista-gmbh.r-bautista-buschmann.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  sendSuccess = false;

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => {
            ngForm.resetForm();
            this.sendSuccess = true;
            setTimeout(() => this.sendSuccess = false, 3000);
          },
          error: (error) => console.error(error),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.sendSuccess = true;
      setTimeout(() => this.sendSuccess = false, 3000);
    }
  }
}
