---
title: "Providing Cart Information *"
sidebar:
  order: 1
---

:::info
This is a **required function**
:::

## Description

This callback function is required to be implemented by your application.

This function is called whenever the widget is opened and must return the current cart of the user that will be displayed in the widget.

:::note
If you need to do any other action when the widget is opened, you can use the [`onWidgetOpen`](./openclose.md) function.
:::
Its aim is to keep the widget cart synced with the one on your application, by returning the list of its items and the total amount, either it is on a single product page or at the checkout steps of your app's cart.

### Definition

```typescript
export interface ExpressCheckoutManager {
  getCart(): MaybePromise<CartResponse>;
}
```

Check [Cart](../Types.md#cart), [Item](../Types.md#item) and [discount](../Types.md#discount) for objects structure.

### Example

Below is an example of what a [`Cart`](../Types.md#cart) object with a list of [`Item`](../Types.md#item) could look like.

```typescript
const items: Item[] = [
  {
    name: "RB20",
    description: "F1 car from the redbull f1 team",
    price: 1_000_00,
    quantity: 2,
    image: {
      url: "/src/assets/redbull_f1_car.png",
      alt: "Redbull f1 car",
    },
  },
  {
    name: "1st trophy",
    description: "Trophy for the 1st of a grandprix in 2023",
    price: 5_00,
    quantity: 16,
    image: {
      url: "/src/assets/trophy.png",
      alt: "F1 1st trophy of 2023",
    },
  },
];

const appliedDiscounts: Discount[] = [
  {
    reduction: 10_00,
    text: "10€ discount",
  },
];

const cart: Cart = {
  item_lines: items,
  discounts: appliedDiscounts,
  amount: 2_070_00,
};
```
