# Editor for gomarvin configs

- If you're updating from v0.3.x or less to v0.4.x or the frontend crashes for some reason, open DevTools, and run `localStorage.clear()`and reload the page
- If using a version that is less than 0.4.x, use [this editor](https://7e0e40cb.gomarvin.pages.dev/)

## commands

```bash
npm i               # install node_modules
npm run dev         # run the project on localhost:3000
npm run preview     # preview build on localhost:8888
```

<!--

// return the size of the stored stuff in localstorage
// https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage

var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
};
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");




/*
  --- Centering content + full width backgrounds in html
      <div class="flex-center">
          <div class="max-width-1">content</div>
      </div>


<a
  href="qwe"
  rel="noreferrer"
  target="_blank"
  style="text-decoration: none"
  >qweqwe</a
>
*/


git add .
git commit -m "next"
git push


# delete branch
git branch -d gh-pages

# create


<script setup lang="ts">
import { ref } from 'vue'
</script>

<template></template>

<style>
</style>



<div class="flex-center">
    <div class="max-width-1">content</div>
</div>

## New vue tips and tricks
/**
 * https://stackoverflow.com/questions/33731939/vue-js-toggle-class-on-click
 * @click="$event.target.classList.toggle('active')"
 */


         "postbuild": "purgecss --css dist/assets/*.css --content dist/assets/*.js -o dist/assets/  --safelist html body"

 -->
