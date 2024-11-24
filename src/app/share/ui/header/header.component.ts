import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { CartStateService } from '../../data-access/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  cartState = inject(CartStateService).state;

  ngAfterViewInit() {
    // obtener el elemento de destino y el del activador
    const $targetE1 = document.getElementById('navbar-sticky');
    const $triggerE1 = document.getElementById('activador');

    const options: CollapseOptions = {
      onCollapse: () => {
        console.log('element has been collapsed');
      },
      onExpand: () => {
        console.log('element has been expanded');
      },
      onToggle: () => {
        console.log('element has been toggled');
      }
    };

    const instanceOptions: InstanceOptions = {
      id: 'targetE1',
      override: true,
    };

    const collapse: CollapseInterface = new Collapse(
      $targetE1,
      $triggerE1,
      options,
      instanceOptions
    );
    
    // show the target element
    collapse.expand();

  }

}
