---
title: "Providing Pickup Options"
sidebar:
  order: 3
---

:::note
This is an **optional function**
:::

## Description

When the customer searches for a pickup store, the method `getPickupOptions` will be called with debounce.

It should return the available pickup options for the current cart.

### Definition

```typescript
export interface ExpressCheckoutManager {
  /**
   * Called when the customer is searching for pickup locations.
   * @param search the search string entered by the customer.
   */
  getPickupOptions?(search: string): Promise<PickupOptionsResponse>;
}
```

### Example

See [`PickupOptionsResponse`](../Types.md#pickupoptionsresponse) model for more information.

```typescript
const getPickupOptions = async (search: string) => {
  return allPickupOptions.filter((option) => option.name.includes(search));
};
```
