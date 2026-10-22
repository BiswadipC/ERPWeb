import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AttributeService } from '../../../Services/attribute-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IAttributeHead } from '../../../ClassesAndInterfaces/IAttribute';

@Component({
  selector: 'app-view-attribute',
  imports: [RouterLink],
  templateUrl: './view-attribute.html',
  styleUrl: './view-attribute.css',
})
export class ViewAttribute implements OnInit {
  constructor(private as: AttributeService, private cdr: ChangeDetectorRef){}
  heads: IAttributeHead[] = [];

    GetAttributes()
    {
      this.as.GetAttributes().subscribe(res => {
        this.heads = res;
        this.cdr.detectChanges();
      })
    }

    ngOnInit(): void {
      this.GetAttributes();
    } // ngOnInit...
} // class...
