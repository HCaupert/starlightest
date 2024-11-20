---
title: Syncing the Cart / Analytics
sidebar:
  order: 9
---

:::note
Those are **optional functions**
:::

## Description

As a utility, the widget also exposes two methods: `onWidgetOpen` / `onWidgetClose`

This method can unlock few use cases.

### Adding items to the cart

When a customer opens the widget on a product page, you might want to add the item to his regular cart on your app.
Depending on the experience you want to provide, you could create something like this.

> If the user goes to the payment, but closes the widget, add the item to the cart

`getPaymentSession` & `onWidgetClose` would allow this use case.

### Analytics

While Express Checkout provides a bunch of analytics, you might want to create your own.

> How many times the widget got opened this week?

`onWidgetOpen` will allow you to do this.

See [Analytics](./analytics) for more information.

