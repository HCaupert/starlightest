---
title: "Updating the address"
sidebar:
  order: 6
---

:::note
This is an **optional function**
:::

## Description

Whenever the customer updates his address, the `onAddressUpdated` function is triggered.
Your application can use this function to update the customer's address in your database.

:::note
Be aware that on the first profile **creation**, `onAddressUpdated` is **not** called. [`onCustomerUpdated` is called instead.](./customer#oncustomerupdated)
:::

### Definition

```typescript
export interface ExpressCheckoutManager {
  onAddressUpdated?(address: Address): MaybePromise<void>;
}
```

### Example

Below is an example of what an [`Address`](../Types.md#address) could look like.

```typescript
const address: Address = {
  postal_code: "75001",
  city: "Paris",
  street: "5 Avenue Anatole France",
};
```
