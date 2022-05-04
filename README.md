# custom_sidebar

Custom `Lovelace` plugin that allows you to rearrange, hide, and add Home Assistant sidebar menu items.

## Installation instructions

- Copy the contents of `www/` to `<your config dir>/www/`.

- Add in `configuration.yaml`:

```
frontend:
  extra_module_url:
    - /local/custom_sidebar/custom_sidebar.js
```

## Configuration

Configuration requires a file called `sidebar-order.json` which needs to be created in `<config directory>/www/custom_sidebar/`.

For full example see this: https://raw.githubusercontent.com/wwwescape/custom-sidebar/main/example/sidebar-order.json

Also check the [original custom-sidebar README](https://github.com/Villhellm/custom-sidebar/blob/master/README.md) for explanations.

Short example:

```
  {
  "order": [
    {
      "new_item": true,
      "item": "Google",
      "href": "https://www.google.co.in/",
      "icon": "mdi:google",
      "target": "_blank",
      "order": 5
    },
    {
      "item": "overview",
      "order": 1
    },
    {
      "new_item": true,
      "spacer": true,
      "order": 2
    },
    {
      "new_item": true,
      "spacer": true,
      "divider": true,
      "order": 4
    },
    {
      "new_item": true,
      "item": "Integrations",
      "href": "/config/integrations",
      "icon": "mdi:puzzle",
      "order: 3
    },
    {
      "new_item": true,
      "item": "Gmail",
      "href": "https://www.gmail.com/",
      "icon": "mdi:gmail",
      "target": "_blank",
      "order": 6,
      "desktop_only": true
    },
  ]
 }
```

## Additional options

2 new options are introduced that allows added a spacer element or a divider element to the sidebar.

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| spacer | boolean | **Optional** | Set to `true` to a spacer element.
| divider | boolean | **Optional** | Set to `true` to a divider element. Required `spacer` to be set to `true`.
| desktop_only | boolean | **Optional** | Set to `true` to not show the element on the mobile app.

## Notes

- Items with `hide: true` are not considered in new order.
- All items will be ordered according to their (optional) `order` property **OR** in the order of appearance in config.order.
- If using the `order` property, make sure either all items (except hidden) have this property, or none of them (otherwise order may be messed up).
- Any items present in the sidebar, but not in config.order, will be shown on the **bottom** of the top part of the list
- When using **Exceptions**, pay attention to "base_order" property - if it's set to "false", the main config.order will be ignored, leaving you with default sidebar (which now should be modified with the exception's order)
- Yes, this works on mobile (for now atleast) too!

## Exceptions

You can define user-specific order using `exceptions` feature (see [details in original repo](https://github.com/Villhellm/custom-sidebar#exceptions))

```
{
  "exceptions": [
    {
      "user": ["Jim Hawkins", "Long John Silver"],
      "order": [
          ...
      ]
    }
  ]
}
```

## Combine with Iframe Panel to show external content inside Home Assitant

If you use [Home Assistant's iframe Panel](https://www.home-assistant.io/integrations/panel_iframe/) and have some iframe_panel links configured in `configuration.yaml`

```
panel_iframe:
  router:
    title: "Router"
    url: "http://192.168.1.1"
    icon: mdi:router-wireless
  fridge:
    title: "Fridge"
    url: "http://192.168.1.5"
    icon: mdi:fridge
```

you can reorder iframe links, same as regular ones, in `sidebar-order.json`:

```
{ order: [
  { "item": "fridge" },
  { "item": "overview" },
  { "item": "router" }
  ...
]}
```

## Home Assistant built-in sidebar configuration options

Check out Home Assistant's "native" sidebar tools - quite possibly, it will be enough for your needs.

## Special thanks

This work is heavily based on by [custom-sidebar](https://github.com/Villhellm/custom-sidebar) Villhellm and [custom-sidebar-v2](https://github.com/galloween/custom-sidebar-v2) by Pasha Golovin. Thank you!
