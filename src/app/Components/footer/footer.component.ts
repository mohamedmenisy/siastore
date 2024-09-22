import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../../Services/data-transfer.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isVisible = true;
  constructor(private data: DataTransferService) {}
  ngOnInit(): void {
    this.data.footerVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }
}
