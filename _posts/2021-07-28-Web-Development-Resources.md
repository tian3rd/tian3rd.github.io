---
layout: post
tag:
  - "css layout"
  - "resources"
  - "design"
  - "html"
  - "js"
category:
  - "Resources"
  - "Web Dev"
last_modified_at: 2021-07-28
---

> 不积跬步，无以至千里。--《劝学》

{% include toc %}

## General

### Design and UI

- [awwwards.com](https://awwwards.com/websites)
- [ui-patterns]()
- [dribbble](https://dribbble.com)
- Wireframs/mockups/prototypes
  - [sneakpeekit](https://sneakpeekit.com)
  - [balsamiq](https://balsamiq.cloud)

### Code Snippets

- Quick css, html and js rendering: [codepen.io](https://codepen.io/pen/)
- Rendering with bootstrap: [codeplay](https://codeplay.com)
- Specific docs for web dev:
- CSS button generatore: [cssbuttoncreator](https://cssbuttoncreator.com)
- Improve front-end coding by practicing: [frontendmentor](https://www.frontendmentor.io)

### Documentation

- Documentations online: [devdocs.io](https://devdocs.io)
- [mdn web docs](https://developer.mozilla.org/en-US/)
- [w3school](https://www.w3schools.com)
- CSS property keywords: [css property names](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index)
- Web dev cheat sheet: [docs.emmet.io](https://docs.emmet.io/cheat-sheet/)

### Images Tools

- Crop or rotate an image: [imageonline.co](https://crop-circle.imageonline.co/)
- Photo hosting: [droplr]()
- Favicon: [favicon](https://www.favicon.cc)
- Icons:
  - $ site like [flaticon](https://www.flaticon.com)
  - free site like [fontawesome](https://fontawesome.com)
    - adding ``
- GIFs: [GIPHY](https://giphy.com)

### Unicode & emojis

- Look up for unicode: [unicode-table.com](https://unicode-table.com/en/)
- Basics about unicode: [Minimum about unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
- Emojis: [Emojipedia](https://emojipedia.org
- [GitHub Flavored unicode](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)

## CSS

### Layout

- Block: taking up the whole width

  - `<p>`
  - `<h1> <h2>` etc
  - <div>
  - `<li>`
  - `<ul>`

- In-line: taking up as much as needed

  - `<span>`
  - `<img>`
  - `<a>` anchor

- In-line block mode: allowing users to set a width and height on the element

  - An example:
    ```css
    <!-- four modes: inline/inline-block/block/none -->
    p {
    display: inline-block;
    width: 100px;
    height: 100px;
    <!-- if you want to hide sth, you can also use visibility -->
    visibility: hidden;
    }
    ```

- Quick center
  - 1. Set itself css property `margin: 0 auto 0 auto`
  - 2. Set its parent `display: grid; place-items: center;`

#### Positioning

[ CSS static/relative/absolute/fixed positioning ](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

- Static by default
- **Relative** is relative to where it would've been placed without specifying `position: relative; left: 600px;`
  - It's like a ghost still existing in the orignal place taking up the space (without affecting the web flow), but the actual one is relative to that ghost by the specified params
- **Absolute** is relative to its parent container, affecting the whole web flow
- Fixed is used to fix a section on the screen like a nav bar sticking on top.

#### Sizes

- css `font-size: 100%`

  - 100% is the ratio between pixel size / 16 px, e.g. 32 px == 200%
  - dynamic: 1 em = 16 px = 100%. ("em" means the witdth of "M")
  - rem: because the css size inherits its parent size, so if you want to keep it consistent regardless of browser settings (i.e. zooming), set the unit to `rem` which ignores the parent size and it's crelative to root.

#### Fonts

- Google Fonts

#### SCSS

1. For jekyll blog integration, see also: https://jekyllrb.com/docs/step-by-step/07-assets/#sass

#### Extra: bootstrap for responsive grid

Examples of responsive layout:

1.

```html
<div class="row">
  <!-- when screen size is large, show the inside div contents as 3 units out of 12 units; likewise for medium and small sizes, but with 4/12 and 6/12 of the screen width -->
  <div class="col-lg-3 col-md-4 col-sm-6">
    <p>This is a col.</p>
  </div>
</div>
```

2. Use of container: combine `container-fluid` with `padding: 3% 15%` to get some flexibility.

## HTML

## JavaScript

## APIs

1. JokeAPI: https://sv443.net/jokeapi/v2/
2. OpenStreetMap: https://wiki.openstreetmap.org/wiki/API_v0.6
3. OpenWeather: https://openweathermap.org/api
