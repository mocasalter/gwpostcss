A starter Sass project from Gravity Works.

## Prereqs
* Sass (Gem)
* Sass Globbing (Gem)
* Susy (Gem)
* Compass (Gem)
* Node
* Gulp

## Install

```
npm install
gulp
```

## Writing Media Queries
Mobile first. Use the 'breakpoint' mixin along with breakpoint variables to use mediaqueries alongside your objects. Example:
```scss
body {
  // mobile first css here.
  @include breakpoint($mobile) {
    // Your > mobile css here.
  }
}
```


