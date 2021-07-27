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
