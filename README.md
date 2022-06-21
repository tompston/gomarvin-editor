# Editor for gomarvin configs
If the frontend crashes for some reason, open DevTools, run

```
localStorage.clear();
```
and reload the page


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
 -->
