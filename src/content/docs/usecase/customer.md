---
title: "Creating the customer"
sidebar:
  order: 5
---

:::note
This is an **optional function**
:::

## Description

When a Customer logs in to Express Checkout, you may want to create an account for the customer on your app as well.

If the customer is using Express Checkout for the first time, we will not be able to provide full detailed information until the customer supplies them. It will then be a 2-steps process.

If the customer is already known from Express Checkout, we will provide the full information directly on login.

## Creating the customer

One (or two) method(s) are available to retrieve the customer information on your app.

For both methods, if your implementation throws an error, the following things happen:

- The customer operation succeeded on our side (before we call you).
- A failure toaster appears on the widget.
- The customer cannot go further in the widget process. He is redirected to an error page.

### onLoginSuccessful

This method is called when the user successfully logs in. It returns the customer information available at this time:

- If the customer already has an Express Checkout account, the customer object contains all the information.
- If the customer does not have an Express Checkout account, the customer object only contains either an email or a phone number, depending on the information provided by the customer during the login step.

You can use it to create a new customer profile in your app as soon as possible.

Note that an Express Checkout id token will also be given as a source of reliability to allow you securing your process.

### onCustomerUpdated

This method is called when the customer updates his information on the Express Checkout widget during his **first** visit.

You can use it to update the customer profile in your app.
Specifically, for a new Customer in ExpressCheckout, since `onLoginSuccessfull` will only provide partial information, the `onCustomerUpdated` method will be used to provide the full information once supplied by the Customer.

```typescript
export type AuthenticatedCustomer =
  | Customer
  | Pick<Customer, "reference" | "email">
  | Pick<Customer, "reference" | "phone">;

export type LoginType = "popup" | "storage";

export interface ExpressCheckoutManager {
  onLoginSuccessful?(params: {
    idToken: string;
    customer: AuthenticatedCustomer;
    type: LoginType;
  }): MaybePromise<void>;

  onCustomerUpdated?(customer: Customer): MaybePromise<void>;
}
```

:::note
The function `onCustomerUpdated` is triggered when the customer updates his information only the first time he creates an Express Checkout account.

Be aware that when the address is updated through the address tab, `onCustomerUpdated` is **not** called.
Instead [`onAddressUpdated`](./onAddressUpdated) is called.
:::

#### Parameters

- `idToken`: The user identity token. Allow you to create new users securely (id token payload will match customer object).
- `customer`: The authenticated customer. If the customer already has an account, the customer object contains all the information. If the customer does not have an account, the customer object contains either an email or a phone number, depending on the channel used by the customer in the `Auth Pages`,
- `type`: The login type:
  - `storage`: if the session information are still in the session storage and has not expired.
  - `popup`: if the customer logs in through the `Auth Pages` login page.

#### Example

Bellow is an example of what a [`Customer`](../Types.md#customer) could look like.

```typescript
const customer: Customer = {
  email: "maxverstapen@example.com",
  phone: "0607080901",
  address: {
    postal_code: "75001",
    city: "Paris",
    street: "5 Avenue Anatole France",
    address_complement: "Appartement 132, code 5544",
  },
  reference: "AY7NN780sRmPvZYHg8_v",
  last_name: "Verstapen",
  first_name: "Max",
  marketingOptIn: true,
};
```
