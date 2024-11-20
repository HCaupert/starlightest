---
title: Analytics
sidebar:
  order: 13
---

:::note
This is an **optional function**
:::

## Description

Express Checkout provides a lot of built-in analytics, which are available through the back-office app.
It allows the tracking of many things, like how many times the widget has been loaded, opened, an existing user logged, and so on.

There are also analytics that needs to be filled on your side if you want to have more feedback on your back-office application.

### Product category

You may want to share the product category of your items to gain clearer insights into which category performs best with the xco widget.
To do so, when you are building the widget, add the product category alongside the manager.

```typescript
new Widget({
  entityId: "your-entity-id", // your public entityId
  manager: manager, // the implementation of ExpressCheckoutManager
  productCategory: {"T-shirt"}, // the main category of your product
})
  .mount("xco-widget")
```
