---
title: "Selecting a Shipping Option *"
sidebar:
  order: 4
---

:::info
This is a **required function**
:::

## Description

When the customer selects a shipping option (clicks on it), `onShippingSelected` will be called by the widget.

This function **MUST** return the new cart price (including shipping fee).

### Definition

This function can be defined through the `Manager`:

```typescript
export interface ExpressCheckoutManager {
  /**
   *  Called when the user selects a shipping option.
   */
  onShippingSelected(selectedShipping: ShippingOption): Promise<Amount>;
}
```

### Example

See [`Amount`](../Types.md#amount) model for more information

```typescript
const onShippingSelected = async (selectedShipping: ShippingOption) => {
  return {
    amount: itemsTotal + selectedShipping.fee,
  };
};
```
