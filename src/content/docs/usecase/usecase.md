---
sidebar:
  order: 2
title: Interacting with the widget
---

Managing the life cycle of an express checkout process and interacting with the widget is done by implementing the `ExpressCheckoutManager`.

The `ExpressCheckoutManager` contains two types of methods:

- Methods that feed the widget with information from your app (articles, prices...)
- Methods that are triggered by user interactions and allow your app to get feedback from the widget.

Required methods are marked with a \* in the sidebar.
If you use typescript, your IDE should warn you about required methods.

By implementing required methods you can quickly get a working widget that allows the user to go through the checkout process.

Optional methods allow you to gradually add more functionalities as needed.

We recommend using a **factory** or a **class** to implement the widget in a manner that suits your use cases and framework.

In our demo environment, we use the same (react) component but feed it with two different class implementations of the manager.

Here is the detail of the `ExpressCheckoutManager` interface you need to implement. Each method is described in the following sections.

<details>
    <summary>*ExpressCheckoutManager* interface</summary>
    ## Express Checkout Manager
```typescript
export interface ExpressCheckoutManager {
    /**
     * Used when the user is not known by Express Checkout but known by your app.
     * Allow the onboarding form to be prefilled with your user information.
     */
    getCustomerHint?(): MaybePromise<CustomerHint>;

    /**
     * Used when the user clicks on Express Checkout button and is redirected to XCO auth pages.
     * If the user is not recognized by XCO, the identifier will be prefilled with this value. It should be either an email or a phone number.
     * This will use the current user session storage to retrieve the data on the XCO auth pages.
     * @returns the email or the phone known on your app
     */
    getLoginHint?(): string;

    /**
     * Called each time the widget is opened.
     */
    onWidgetOpen?(): MaybePromise<void>;

    /**
     * Called each time the widget is closed.
     */
    onWidgetClose?(): MaybePromise<void>;

    /**
     * Called when the user updates his address.
     * @param customer.address the newly changed address
     * @returns void or a promise that resolves when the operation is done
     */
    onAddressUpdated?(customer: { address: Address }): MaybePromise<void>;

    /**
     * Called when the user is about to choose the shipping option.
     * @returns the list of available shipping homeDeliveryOptions
     */
    getShippingInfo(): MaybePromise<ShippingInfo>;

    /**
     *  Called when the user selects a shipping option.
     */
    onShippingSelected(selectedShipping: ShippingOption): Promise<Amount>;

    getPaymentSession(): Promise<any>;

    /**
     * Called when the customer logs in successfully.
     * The customer session can come from the session storage or from the authentication page in a popup.
     * @param params.idToken - the id token of the customer
     * @param params.customer - the authenticated customer object
     * @param params.type - the login type (popup or storage)
     * @returns void or a promise that resolves when the operation is done
     */
    onLoginSuccessful?(params: {
    idToken: string;
    customer: AuthenticatedCustomer;
    type: LoginType;

}): MaybePromise<void>;

    /**
     * Called when the Widget is mounted, i.e. when Widget.mount() is called.
     * Your app can use this method to fetch the cart from your backend,
     * or if the user is in a product page, returns the product with the desired quantity.
     * @returns the cart of the user
     * @see Cart
     * @see Widget.mount
     */

    getCart(): MaybePromise<CartResponse>;

    /**
     * Called when the customer updates his information. Currently, it is called the first time the user signs up.
     * Be aware that when the address is updated through the address tab, this function is not called.
     * @param customer the newly signed up customer
     */
    onCustomerUpdated?(customer: Customer): MaybePromise<void>;

    /**
     * Called when the customer enters a discount code.
     * At the moment we only support one discount code, so please return an array of at most one element in the `discounts` field.
     * @param discountCode the discount code entered by the customer. It might be a wrong code.
     */
    onDiscountSubmitted?(discountCode: string): Promise<DiscountResponse>;

    /**
     * Called when the customer removes a discount.
     * @param discountCode the discount code entered by the customer.
     */
    onDiscountRemoved?(discountCode: string): Promise<Amount>;

    /**
     * Called when the customer is searching for pickup locations.
     * @param search the search string entered by the customer.
     */
    getPickupOptions?(search: string): Promise<PickupOptionsResponse>;

}

````
</details>

To get started with, you can use this dummy implementation of the widget manager in typescript:
```typescript
import {
  Widget,
  ExpressCheckoutManager,
  MaybePromise,
  CartResponse,
  ShippingInfo,
  ShippingOption, Amount
} from "@xcheckout/widget";

const manager: ExpressCheckoutManager = {
  getCart(): MaybePromise<CartResponse> {
    console.log("getCart")
    return Promise.resolve({
      item_lines: [{
        name: "item_name",
        description: "item_description",
        price: 10_00,
        quantity: 1,
        image: {
          url: "",
          alt: "item_image"
        }
      }],
      amount: 10_00,
    });
  },

  getPaymentSession(): Promise<any> {
    console.log("getPaymentSession")
    throw Error("Ooops, time to implement the payment part!")
  },

  getShippingInfo(): MaybePromise<ShippingInfo> {
    console.log("getShippingInfo")
    const expressOption: ShippingOption = {
      id: "express",
      name: "Livraison Express",
      fee: 10,
      info: "Livré sous 1 jour ouvré",
    }
    const classicOption: ShippingOption = {
      id: "classic",
      name: "Livraison Standard",
      fee: 0,
      info: "Livré sous 3/4 jours ouvrés",
    }
    return Promise.resolve({
      defaultId: expressOption.id,
      homeDeliveryOptions: [expressOption, classicOption],
      pickupOptions: [], // No pickup options yet
    });
  },

  onShippingSelected(selectedShipping: ShippingOption): Promise<Amount> {
    console.log("onShippingSelected", selectedShipping)
    return Promise.resolve({amount: 10_00 + selectedShipping.fee});
  }
getPickupOptions(search: string): Promise<PickupOptionsResponse> {
    console.log("getPickupOptions", search)
    const openingHours: OpeningHours = {
      Monday: [{ opensAt: { hour: 9 }, closesAt: { hour: 18, minute: 30 } }],
      Tuesday: [{ opensAt: { hour: 9 }, closesAt: { hour: 18, minute: 30 } }],
      Wednesday: [
        { opensAt: { hour: 9 }, closesAt: { hour: 12, minute: 30 } },
        { opensAt: { hour: 14 }, closesAt: { hour: 18, minute: 30 } },
      ],
      Thursday: [{ opensAt: { hour: 9 }, closesAt: { hour: 18, minute: 30 } }],
      Friday: [{ opensAt: { hour: 9 }, closesAt: { hour: 18, minute: 30 } }],
      Saturday: [{ opensAt: { hour: 9 }, closesAt: { hour: 15 } }],
      Sunday: [],
    };
    const storeLocation = {
      street: "1 rue de la paix",
      postal_code: "75000",
      city: "Paris",
    };
    const store1: PickupOption = {
      id: "4",
      name: "Jules Vernes",
      fee: 0,
      info: "Disponible dans 1h",
      location: storeLocation,
      openingHours: openingHours,
    };
    return Promise.resolve({
      pickupOptions: [store1]
    });
  }
}

new Widget({
  xcoUrl: "https://gateway.upstreamxco-dev.com", // domain of the xcheckout API
  entityId: "your-entity-id", // your public entityId
  manager: manager, // the implementation of ExpressCheckoutManager
  ui: {}
})
  .mount("xco-widget")
````

You should now be able to see the widget on your application, even if it is filled with fake data, it is a good start !

:::info
Pretty much everywhere, you will see `MaybePromise` response types, do not worry about it. It is just for convenience,
it means you can return both a `Promise<Object>` or directly the plain `Object`.
:::
