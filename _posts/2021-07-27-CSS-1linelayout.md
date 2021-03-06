---
layout: post
title: "10 Basic CSS Layouts"
tag:
  - "css layout"
category:
  - "Web Dev"
  - "CSS"
---

> Click [1linelayouts.glitch.me](1linelayouts.glitch.me) to explore more.

{% include toc %}

## 1. Super Centered - Grid + Place-items

<!-- example 1: super center -->
<div class="ex1">
    <div class="parent1 blue">
    <div class="box1 coral" contenteditable="">Type in here <br>:)</div>
    </div>
</div>

So basicly, the use of `div` grid display combined with `place-items: center;` will do the trick. Source code is here:

```html
<!-- html -->
<div class="parent1 blue">
    <div class="box1 coral" contenteditable="">Type in here <br>:)</div>
    </div>
</div>
```

```css
/* css */
.parent1 {
  display: grid;
  place-items: center;
}
.box1 {
  border-radius: 10px;
  border: 1px solid red;
  background: lightpink;
  text-align: center;
}
```

## 2. The Deconstructed Pancake - Flex + Flex-wrap

<div class="ex2">
  <div class="parent2">
      <div class="box2" contenteditable>Child 1</div>
      <div class="box2" contenteditable>Child 2</div>
      <div class="box2" contenteditable>Child 3</div>
  </div>
</div>

It's the use of `flex: flex-grow flex-shrink flex-size (max min ideal)`. It's useful for pictures to take up space as needed. Here is the code:

```html
<!-- html -->
<div class="parent2">
  <div class="box2" contenteditable>Child 1</div>
  <div class="box2" contenteditable>Child 2</div>
  <div class="box2" contenteditable>Child 3</div>
</div>
```

```css
/* css */
.parent2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box2 {
  margin: 5px;
  /* streching */
  flex: 1 1 150px;
  /* no stretch */
  /* flex: 0 1 150px; */
}
```

## 3. Sidebar stays - Grid + Grid-template-column

<div class="ex3">
  <div class="parent3">
      <div class="sidebar-left" contenteditable>
        Min: 120px;<br>Max: 25%;
      </div>
      <div class="content-right" contenteditable>
        Right element takes the second grid position.
      </div>
  </div>
</div>

So the left sidebar will keep a minimum width of 120px, and expand to 25% of parent div while possible. Here is the code:

```html
<!-- html -->
<div class="parent3">
  <div class="sidebar-left" contenteditable>Min: 120px;<br />Max: 25%;</div>
  <div class="content-right" contenteditable>
    Right element takes the second grid position.
  </div>
</div>
```

```css
/* css */
.parent3 {
  display: grid;
  grid-template-columns: minmax(120px, 25%);
}
```

## 4. Pancake stack - Grid + Grid-template-rows

<div class="ex4">
<div class="parent4">
  <div class="top-cake-header" contenteditable>Top cake!</div>
  <div class="middle-cake-main" contenteditable>Middle cake!</div>
  <div class="bottom-cake-footer" contenteditable>Bottom cake!</div>
</div>
</div>

It is essentially the same as the third one. It's common in the header-main-footer structure. Here's the code:

```html
<!-- html -->
<div class="parent4">
  <div class="top-cake-header" contenteditable>Top cake!</div>
  <div class="middle-cake-main" contenteditable>Middle cake!</div>
  <div class="bottom-cake-footer" contenteditable>Bottom cake!</div>
</div>
```

```css
/* css */
.parent4 {
  display: grid;
  // 1fr: remaining fractional unit
  grid-template-rows: auto 1fr auto;
}
```

## 5. Classic Holy Grail Layout: Grid + Grid-template

<div class="ex5">
    <div class="parent5" contenteditable>
        <div class="section-header-content">Header</div>
        <div class="section-left-sidebar">Left Sidebar</div>
        <div class="section-main-content">Main Content</div>
        <div class="section-right-sidebar">Right Sidebar</div>
        <div class="section-footer-content">Footer</div>
    </div>
</div>
It is the classic layout using `grid-template` and `grid-column`. Here is the code:
```html
<!-- html -->
<div class="ex5">
    <div class="parent5">
        <div class="section-header-content" contenteditable>Header</div>
        <div class="section-left-sidebar" contenteditable>Left Sidebar</div>
        <div class="section-main-content" contenteditable>Main Content</div>
        <div class="section-right-sidebar" contenteditable>Right Sidebar</div>
        <div class="section-footer-content" contenteditable>Footer</div>
    </div>
</div>
```

```css
/* css */
.parent5 {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
}
.section-header-content {
  //  span across all three: 1 - 2 - 3 (4 not included)
  grid-column: 1 / 4;
}
.section-left-sidebar {
  grid-column: 1 / 2;
}
.section-main-content {
  grid-column: 2 / 3;
}
.section-right-sidebar {
  grid-column: 3 / 4;
}
.section-footer-content {
  grid-column: 1 / 5;
}
```

## 6. 12-Span Grid: repeat()

<div class="ex6">
  <div class="parent6">
    <div class="span-12" contenteditable>Span 12</div>
    <div class="span-6" contenteditable>Span 6</div>
    <div class="span-3-left" contenteditable>Span 3</div>
    <div class="span-4-middle" contenteditable>Span 4</div>
    <div class="span-5-right" contenteditable>Span 5</div>
  </div>
</div>

So basically, we can get extra flexibility by combining `grid-template-columns` in parent and `grid-column` in children. We can simplify the code using `repeat()` function. Here is the code:

```html
<!-- html -->
<div class="parent6">
  <div class="span-12" contenteditable>Span 12</div>
  <div class="span-6" contenteditable>Span 6</div>
  <div class="span-3-left" contenteditable>Span 3</div>
  <div class="span-4-middle" contenteditable>Span 4</div>
  <div class="span-5-right" contenteditable>Span 5</div>
</div>
```

```css
/* css */
.parent6 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.span-12 {
  grid-column: 1 / 12;
}
.span-6 {
  grid-column: 2 / 8;
}
.span-3-left {
  grid-column: 1 / 4;
}
.span-4-middle {
  grid-column: 4 / 8;
}
.span-5-right {
  grid-column: 8 / 13;
}
```

## 7. RAM (Repeat, Auto, Minmax)

<div class="ex7">
  <div class="parent7">
    <div class="box" contenteditable>1</div>
    <div class="box" contenteditable>2</div>
    <div class="box" contenteditable>3</div>
    <div class="box" contenteditable>4</div>
  </div>
</div>

Flexible layout to be responsive: `grid-template-columns: repeat(auto-fit, minmax(<base>, 1fr))`, so here is the code:

```html
<!-- html -->
<div class="parent7">
  <div class="box" contenteditable>1</div>
  <div class="box" contenteditable>2</div>
  <div class="box" contenteditable>3</div>
  <div class="box" contenteditable>4</div>
</div>
```

```css
/* css */
.parent7 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
.box {
  display: grid;
  place-items: center;
}
```

## 8. Card Line Up: Flex + Justify-content

<div class="ex8">
    <div class="parent8">
      <div class="card-template">
        <div class="card-title">Card 1</div>
        <div class="card-description" contenteditable>
          Medium length of description here for test of content.
        </div>
        <div class="card-pic"></div>
      </div>
      <div class="card-template">
        <div class="card-title">Card 2</div>
        <div class="card-description" contenteditable>
          Long length of description here for test of content and edge cases.
          Hello world! Hello again!
        </div>
        <div class="card-pic"></div>
      </div>
      <div class="card-template">
        <div class="card-title">Card 3</div>
        <div class="card-description" contenteditable>Short description.</div>
        <div class="card-pic"></div>
      </div>
    </div>
</div>

Wow, this takes some time to debug... But it's a pretty neat trick to master. Using `flex` layout for cards (with `flex-direction: column`) and applying `justify-content: space-between` to align corresponding elements. So here's the code:

```html
<!-- html -->
<div class="parent8">
  <div class="card-template">
    <div class="card-title">Card 1</div>
    <div class="card-description" contenteditable>
      Medium length of description here for test of content.
    </div>
    <div class="card-pic"></div>
  </div>
  <div class="card-template">
    <div class="card-title">Card 2</div>
    <div class="card-description" contenteditable>
      Long length of description here for test of content and edge cases. Hello
      world! Hello again!
    </div>
    <div class="card-pic"></div>
  </div>
  <div class="card-template">
    <div class="card-title">Card 3</div>
    <div class="card-description" contenteditable>Short description.</div>
    <div class="card-pic"></div>
  </div>
</div>
```

```css
/* css */
.parent8 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 700px;
  //   attention here to set height as auto
  height: auto;
}
.card-template {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

## 9. Clamping: clamp() && Keep ratio: apect-ratio()

<div class="ex9">
  <div class="parent9">
    <div class="card-template2">
      <h3>Card</h3>
      <div class="card-description2" contenteditable>
        Here is the body text of the card. Here's some more jabbish...
      </div>
      <div class="card-pic2"></div>
    </div>
  </div>
</div>

Basically, it uses in a card where you don't want to comprimise the card size when screen gets smaller, but aslo don't expand too much on a bigger screen. `clamp()` function offers a lower and upper bounder for the card to adapt to. And the `aspect-ratio: width / height` respect the ratio of the image or video when the screen size changes. Here's the code:

```html
<!-- html -->
<div class="parent9">
  <div class="card-template2">
    <h3>Card</h3>
    <div class="card-description2" contenteditable>
      Here is the body text of the card. Here's some more...
    </div>
    <div class="card-pic2"></div>
  </div>
</div>
```

```css
/* css */
.parent9 {
  display: grid;
  place-items: center;
  width: 350px;
  height: 350px;
}
.card-template2 {
  display: flex;
  flex-direction: column;
  // set width to be 23ch <= w <= 46ch
  width: clamp(23ch, 80%, 46ch);
}
.card-pic2 {
  background-color: lightcoral;
  // now supports chrome and firefox, not safari...
  aspect-ratio: 16 / 9;
}
```
