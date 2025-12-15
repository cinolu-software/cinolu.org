import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 1rem;">
      <h1 style="margin-bottom: 1rem;">Formulaire Produit</h1>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        Page en développement - Formulaire de création/édition de produit
      </p>
      <a
        routerLink="/dashboard/products"
        style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
        <span class="material-icons">arrow_back</span>
        Retour aux produits
      </a>
    </div>
  `
})
export class ProductForm {}
