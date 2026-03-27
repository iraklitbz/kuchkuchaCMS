# Arquitectura base de tienda en Strapi

## Objetivo

Montar una base simple pero escalable para una tienda con:

- productos
- categorias
- marcas
- cupones
- detalles/composicion del producto
- SEO basico

## Modelo recomendado

### Product

Collection type principal del catalogo.

Campos base:

- `title`
- `slug`
- `description`
- `mainImage`
- `gallery`
- `price`
- `discountPrice`
- `sku`
- `barcode`
- `quantity`
- `quantityUnit`
- `stock`
- `lowStockThreshold`
- `isActive`
- `featured`
- `sortOrder`
- `brand`
- `categories`
- `relatedProducts`
- `seo`
- `specifications`
- `ingredients`

### Category

Collection type separada.

Esto es mejor que una enumeracion fija porque:

- permite crear nuevas categorias sin desplegar codigo
- soporta imagen y descripcion
- sirve para filtros y SEO
- puede crecer a subcategorias

Campos base:

- `name`
- `slug`
- `description`
- `image`
- `parent`
- `children`
- `products`
- `sortOrder`
- `isActive`

### Brand

Collection type separada para no repetir marca como texto libre.

Esto ayuda a:

- filtrar por marca
- mantener consistencia editorial
- tener logo, descripcion y SEO propio

Campos base:

- `name`
- `slug`
- `description`
- `logo`
- `isActive`
- `sortOrder`
- `seo`
- `products`

### Coupon

Collection type separada.

No conviene guardarlo como texto simple dentro del producto si quieres reutilizarlo o limitarlo.

Campos base:

- `code`
- `description`
- `discountType`
- `value`
- `isActive`
- `startsAt`
- `endsAt`
- `minimumSubtotal`
- `usageLimit`
- `products`
- `categories`

## Componentes

### `catalog.specification`

Para pares `label/value`.

Ejemplos:

- `Origen: Rioja`
- `Temperatura de servicio: 8C`

### `catalog.ingredient-line`

Para composicion o ingredientes repetibles.

Ejemplos:

- `Harina - 100 g`
- `Leche - 100 ml`

### `shared.seo`

Componente reutilizable para SEO basico.

Campos:

- `metaTitle`
- `metaDescription`
- `shareImage`

## Decisiones importantes

### Precio y precio de descuento

Para una primera fase, `price` y `discountPrice` en producto son suficientes.

Regla recomendada:

- `discountPrice` siempre menor que `price`
- si no existe `discountPrice`, no hay oferta activa en producto

### Cupones

Separados del producto para poder:

- aplicarlos a varios productos
- aplicarlos a categorias completas
- activarlos por fecha
- limitarlos por subtotal o uso

### Cantidad

Separada en:

- `quantity`
- `quantityUnit`

Esto funciona mejor que un solo texto porque luego permite pintar mejor el front y filtrar.

### Marca

Separada del producto para evitar inconsistencias y habilitar filtros limpios.

### SEO

Como componente reutilizable para producto, categoria y marca.

## Recomendaciones siguientes

Cuando quieras escalar, lo normal es añadir:

- `taxRate` o tipo de IVA
- `allergens`
- `origin`

## Plan por fases

### Fase 1

Base de catalogo:

- productos
- categorias
- cupones
- composicion
- especificaciones

### Fase 2

Operacion basica:

- stock mas estricto
- marcas
- productos destacados
- SEO
- filtros de catalogo
- categorias padre/hija bien definidas
- productos relacionados

### Fase 3

Comercial:

- reglas de cupones mas avanzadas
- productos relacionados
- packs
- promociones por categoria

### Fase 4

Escalado real:

- variantes por talla/sabor/formato
- multi almacenes
- historico de precios
- integracion con pedidos y pagos
