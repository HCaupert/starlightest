---
title: "Creating the payment session *"
sidebar:
  order: 11
---

:::info
This is a **required function**
:::

## Description

This function is used to get the payment session, created through your backend, when the customer is about to pay.
The payment session is then used to instantiate the Purse payment widget embedded within the Express Checkout Widget.

**The only thing required to be implemented here is the [client-session](https://docs.purse.tech/docs/api/api-v2/API/clientSession) endpoint**.
It should return the raw payload of the session.
