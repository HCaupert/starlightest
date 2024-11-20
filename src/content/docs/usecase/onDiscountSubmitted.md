---
title: "Applying a discount"
sidebar:
  order: 7
---

:::note
Those are **optional functions**
:::

## Description

:::info
Implementing this method will **activate** the discount code feature in the widget.
:::

This method is triggered when the customer submits a discount code,
Your application has to check if the code is valid or not and return a [DiscountResponse](../Types.md#discountresponse) object.

In case of success, the `cartAmount` property is the new total amount (in cents) of the cart after applying the discount.

If the customer removes the discount, the `onDiscountRemoved` method will be called.
You **must** return the price of the cart without the discount in its implementation.

### Definition

Applying a discount is done through `onDiscountSubmitted`:

```typescript
export interface ExpressCheckoutManager {
  onDiscountSubmitted?(discountCode?: string): Promise<DiscountResponse>;
}
```

Removing a discount is done through `onDiscountRemoved`:

```typescript
export interface ExpressCheckoutManager {
  onDiscountRemoved?(discountCode?: string): Promise<Amount>;
}
```

### Example

Here is an example of [`Discount`](../Types.md#discount) implementation.

```typescript
onDiscountSubmitted = async (discountCode: string) => {
  if (discountCode === "REDUCTION10") {
    return {
      success: true,
      discounts: [
        {
          reduction: 10_00,
          text: "10€ discount",
        },
      ],
      amount: 90_00,
    };
  } else {
    return {
      success: false,
      text: "Invalid code",
    };
  }
};
```
