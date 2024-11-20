---
title: "Prefilling the forms"
sidebar:
  order: 8
---

:::note
Those are **optional functions**
:::

Speeding up the checkout process is a key feature of Express Checkout.
You can help the widget by prefilling some forms with the information you already know about the customer.

The customer can interact with two forms :

- [The login form](#prefill-the-login---getloginhint), where the customer fills his identifier (email or phone)
- [The profile form](#prefill-the-profile---getcustomerhint), where the customer creates his profile

### Prefill the login - _getLoginHint_

If the customer is not logged in when clicking on the Express Checkout button, he will be redirected to Express Checkout authentication page, `Auth Pages`.

By providing the identifier (email or phone number) you already know about the customer, it can be prefilled, hence speeding up the authentication.

```typescript
export interface ExpressCheckoutManager {
  getLoginHint?(): string;
}
```

You can return a raw string with one of the following values:

- Phone example: `+33612345678`
- Email example: `customer@merchant.fr`

### Prefill the profile - _getCustomerHint_

When new customers try to connect to Express Checkout for the first time, they will be asked to create their profile.
When the widget shows up the profile creation form, it can be prefilled with any information you already know about the customer.

```typescript
export interface ExpressCheckoutManager {
  getCustomerHint?(): MaybePromise<CustomerHint>;
}
```

Bellow, an example of what a [`CustomerHint`](../Types.md#customerhint) could look like. **Every field is optional**.

```typescript
const customerHint: CustomerHint = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@email.fr", // Might repeat the login hint
  address: {
    postal_code: "75001",
    city: "Paris",
    street: "5 Avenue Anatole France",
    address_complement: "Appartement 132, code 5544",
  },
  phone: "+33612345678", // Might repeat the login hint
};
```
