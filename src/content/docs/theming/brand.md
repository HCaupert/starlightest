---
title: Brand / Colors
description: "hi"
---

## Description

While there is a very (very very) minimal chance that the default colors match yours,
you probably want to make sure the widget is coherent with the rest of your storefront.

We provide a way to customize your branding and colors into the widget.

## Definition

On your widget instance, add your customization to the theme prop:

```typescript
const widget = new Widget({
  theme: {
    name: "Purse",
    logo_url: "https://some-url.com",
    colors: {
      primary: "223 100% 50%",
      primary_hover: "224 100% 63%",
    },
  },
  ...
})
```
