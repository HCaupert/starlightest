---
title: "Using your own button"
---

## Description

While hacking the express checkout button style is possible, very often you would prefer using your own already existing button.

## Hiding the default button

The first step is to change the `showButton` prop to false in the widget instanciation:

```typescript
const widget = new Widget({
  showButton: false,
  ...
})
```

You can place the `<div id="xco"/>` wherever you want as it will not be used as a positioning reference anymore.
We recommend placing it at a top level location.

## Using your own button

You now need to open the side panel _manually_. To do so, there is a `toggle()` method on the widget object.
Your mileage may vary but here is what a React component could look like:

```typescript jsx
<Button onClick={() => widget.toggle()}>
  <XcoLogo />
  Acheter en 1-clic
</Button>
```

Note that calling `toggle` outside of an even listener will not work ()
