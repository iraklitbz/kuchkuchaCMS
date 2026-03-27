import type { Schema, Struct } from '@strapi/strapi';

export interface CatalogIngredientLine extends Struct.ComponentSchema {
  collectionName: 'components_catalog_ingredient_lines';
  info: {
    description: 'Ingredient or composition line for a product';
    displayName: 'Ingredient Line';
  };
  attributes: {
    amount: Schema.Attribute.Decimal;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String;
    unit: Schema.Attribute.Enumeration<['g', 'kg', 'ml', 'l', 'unit']>;
  };
}

export interface CatalogSpecification extends Struct.ComponentSchema {
  collectionName: 'components_catalog_specifications';
  info: {
    description: 'Label/value specification line for a product';
    displayName: 'Specification';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Reusable SEO metadata';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'catalog.ingredient-line': CatalogIngredientLine;
      'catalog.specification': CatalogSpecification;
      'shared.seo': SharedSeo;
    }
  }
}
