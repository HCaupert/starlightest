---
title: "Providing Shipping Information *"
sidebar:
  order: 2
---

:::info
This is a **required function**
:::

## Description

When the customer reaches the summary page, shipping options are displayed.

The method `getShippingOptions` from the `ExpressCheckoutManager` will be called.
It should return the available shipping options for the current cart.

There is two type of shipping options:

- **Home delivery**: The customer can choose a shipping option to deliver the product to his home.
- **Pickup delivery**: The customer can choose a pickup store to get the product.

If you provide only one type of shipping options, the other section will be hidden.

For Pickup delivery, the customer can see at least 3 and at most 5 locations.
Moreover, you can give him the possibility to search for a pickup store. See [search among pickup options](./getPickupOptions.md) for more information.

Please note that errors in your implementation will result in:

- A failure toaster on the widget.
- The customer will not be able to go further in the express checkout process. He will be redirected to an error page.

### Definition

```typescript
export interface ExpressCheckoutManager {
  getShippingInfo(): MaybePromise<ShippingInfo>;
}
```

### Example

Below is an example of what a [`shippingInfo`](../Types.md#shippinginfo) could look like.

```typescript
type ShippingInfo = {
  options: [
    {
      id: string;
      name: string;
      fee: number; // Price of the shipping option in cents
      expectedDeliveryDate: Date;
      external_id?: string;
      additionalAttributes?: Record<...>;
    },
    {...}
  ];
  defaultId?: string;
};
```
