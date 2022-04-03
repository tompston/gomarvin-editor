<template>
    <h1 id="config">Config</h1>
    <p>
        The server is generated based on the config file. To create and edit that file, either use the
        <router-link to="/" class="mr-4">Current Editor</router-link>or copy a predefined config file from
        gomarvin github repo
        <a
            href="https://github.com/tompston/gomarvin/tree/main/examples"
            rel="noreferrer"
            target="_blank"
            class="underline"
        >examples dir</a>. 
        

        <div class="mt-10"></div>

        The frontend saves the config in local storage on change.
    </p>
    <p class="mt-10">
        One config file holds all of the information that is needed to generate the boilerpate.
        Incidentally in this case, that same config file also documents the API endpoints by
        default. So we can kill 2 birds with 1 stone, to some degree.
    </p>
</template>