<script setup lang="ts">
import Header from '../Header.vue'
import DocGoals from './sections/Goals.vue'
import DocIntro from './sections/Intro.vue'

const sections = {
    intro: {
        label: "Intro",
        href: "#"
    },
    goals: {
        label: "Goals",
        href: "#goals"
    },
    config: {
        label: "Config",
        href: "#config"
    },
    caution: {
        label: "Caution",
        href: "#caution"
    },
    optional: {
        label: "Optional Values",
        href: "#optional-values"
    },
    notes: {
        label: "Notes",
        href: "#notes"
    }
}

</script>

<style>
</style>



<template>
    <Header />

    <div class="flex-center">
        <div class="max-width-2">
            <div class="docs">
                <!-- Docs navigation -->
                <div class="docs--nav">
                    <div
                        class="pl-12 py-20 flex flex-column gap-10 fs-8 docs-sticky main-col-1- text-col-6- border-1-1">
                        <div v-for="section in sections">
                            <a :href="section.href">{{ section.label }}</a>
                        </div>
                    </div>
                </div>

                <div class="docs--content">
                    <div class="fs-2 fw-300-- fw-800 mb-30">Gomarvin explained</div>

                    <div class="text-2 fw-400 mb-110 max-w-640">
                        <DocIntro />
                        <DocGoals />
                        <h1 id="config">Config</h1>
                        <p>
                            The server is generated based on the config file. To create and edit that file, either use
                            the
                            <router-link to="/" class="mr-4">Current Editor</router-link>or copy a predefined config
                            file from
                            gomarvin github repo
                            <a href="https://github.com/tompston/gomarvin/tree/main/examples" rel="noreferrer"
                                target="_blank" class="underline">examples dir</a>.


                        <div class="mt-10"></div>

                        The frontend saves the config in local storage on change.
                        </p>
                        <p class="mt-10">
                            One config file holds all of the information that is needed to generate the boilerpate.
                            Incidentally in this case, that same config file also documents the API endpoints by
                            default. So we can kill 2 birds with 1 stone, to some degree.
                        </p>

                        <br />

                        <h1 id="caution">Caution!</h1>
                        <ul>
                            <li>
                                <p>
                                    Do not edit functions that are used by generated controllers, like
                                    <code>res.Response()</code> and
                                    <code>validate.ValidateStruct()</code>. If you want
                                    to customize them, copy the controllers to a new file and edit them manually.
                                </p>
                            </li>

                            <li>changing framework in the config file after the first generation will break things.</li>
                        </ul>

                        <div>
                            <p class="text-center my-30 fw-600 main-col-danger text-col-white py-16 px-10 border-rad-3">
                                If a file has
                                <code>.gen</code> in the name, that means it will be regenerated on
                                each run. So editing them is a bad idea if you want to save changes. Either rename the
                                file or move it somewhere else to edit it.

                            </p>
                        </div>

                        <h1 id="optional-values">Optional values</h1>
                        <p>
                            Controllers aren't the only thing that we can automatically generate from the config
                            file. As the goal of this project is to automate out the boring parts of writing rest
                            servers, we can also generate:
                        </p>
                        <ul>
                            <li>Typescript functions that fetch the generated endpoints</li>
                            <li>SQL files that hold placeholder tables and queries for the module endpoints</li>
                        </ul>

                        <h3 id="include_ts_fetch" class="doc-subheader-1">include_ts_fetch</h3>

                        <!-- <p>Currently won't do anything, work in progress</p> -->
                        <!-- <br /> -->
                        <p>
                            If set to true,
                            <code>main.gen.ts</code>
                            will be created at the root of the project and
                            populated with util functions for fetching the data. Everything is in a single file, so
                            that it's easier to import the code into frontend.
                            <br />
                            <br />To stay agnostic about frontend frameworks, the generated util functions return only
                            the promise of the response.
                            That way, you can implement custom loading / error states in the framework of your choice.

                            <br>
                            <br>

                            The name of the generated typescript fetch function is the same as the defined controller name.
                            The same applies to the body.
                            <br>
                            <br>


                            Typescript is used because:
                        <ul>
                            <li>strict types are great</li>
                            <li>Typescript can be compiled down to be valid javascript</li>
                        </ul>

                        </p>


                        <h3 id="include_ts_fetch-example" class="doc-subheader-1">Example using generated fetch
                            functions</h3>
                        <pre>
                            <code>
<span class="op-60">// import the generated file</span>
import * as F from "../../build/fiber_with_modules/main.gen";

async function FetchGetUserByIdEndpoint() {
    let res = await F.GetUserById(1);
    let users = await res.json();
    console.log(users);
}


async function FetchCreateUserEndpoint(){
    let res = await F.CreateUser({
          username: "qweqwe",
          email: "qwe@qwe.com",
          age: 20,
          password: "very-long-and-good-password",
    })

    let users = await res.json()
    console.log(users)
}
                            </code>
                        </pre>


                        <!-- <br /> -->

                        <br />
                        <h3 id="include_sql" class="doc-subheader-1">include_sql</h3>
                        <p>
                            if set to true,
                            <code>/db/sql/</code> dirs will be created and populated with
                        </p>
                        <ul>
                            <li>
                                <code>module_name.sql.gen.txt</code>
                                (regenerated on each gomarvin run) example file that holds
                                <ul>
                                    <li>
                                        placeholder table with 3 rows -
                                        <code>module_id</code>,
                                        <code>created_at</code> and
                                        <code>updated_at</code>
                                    </li>
                                    <li>
                                        function that updates the
                                        <code>updated_at</code> timestamp when the row is
                                        changed
                                    </li>
                                    <li>sql queries that are generated from the existing controllers.</li>
                                </ul>
                            </li>
                            <li>
                                <code>functions.sql</code>

                                <ul>
                                    example of a function that can auto update
                                    <code>updated_at</code>
                                    field on change. ( postgres only )
                                </ul>
                            </li>
                            <li>
                                <code>sqlc.yml</code>
                                <ul>
                                    config file that generates go functions used in controllers
                                    from the module_name.sql file.
                                </ul>
                            </li>
                            <!-- <li>
                                Ideally
                                <code>include_sql</code> is a thing you toggle to be true when you want to create the example files for new modules and then turn it off, so that the text files could be deleted.
                            </li> -->
                        </ul>
                        <p>
                            As sqlc uses sql files for codegen, we create placeholder
                            <code>.gen.txt</code> files in
                            the same dir. So copy and rename the files to preserve changes to them
                        </p>

                        <div class="mt-30"></div>

                        <h1 id="notes">Notes</h1>
                        <ul>
                            <li>
                                <p>
                                    The generated variables and functions in
                                    <code>controllers.gen.go</code> have a
                                    <code>__</code> prefix. This is done for 3 reasons:
                                </p>
                                <ul>
                                    <li>easier to identify what code is regenerated on eah run</li>
                                    <li>
                                        as these values will be regenerated, the prefix removes the option of
                                        exporting them from the package
                                    </li>
                                    <li>
                                        If you wish to copy and edit all of the generated code in one go, just make
                                        a copy of it and replace the prefix.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>
                                    The project is in early stage, this means that there will be breaking changes
                                    later.
                                </p>
                            </li>
                            <li>
                                <p>Gin router has some bugs with url params. So that should be fixed manually</p>
                            </li>
                            <li>
                                Routers for the modules will be automatically imported and available only on the
                                first run
                            </li>
                            <li>
                                Codegen is not tested on the oldest go versions shown under options. So don't known
                                which stuff is compatible.
                            </li>
                            <li>
                                Go has some great benefits for writing backends. On of them is that switching
                                framewoks is relativley easy. So this project supports Gin and Fiber currently. The
                                goal is to support 4 frameworks at most.
                            </li>
                            <li>
                                The
                                <a>frontend editor</a> does all of the validation for the config file.
                                If there are errors shown in the UI, the codegen won't be able to generate
                                everything correctly.
                            </li>
                            <li>
                                If the frontend crashes for some reason, open DevTools, run
                                <code>localStorage.clear();</code> and reload the page.
                            </li>
                            <li>
                                If you encounter a bug after the config file is created from the frontend UI, open a
                                issue on Github. There are probably edge case that have not been tested.
                            </li>
                            <li>
                                The project does not take care of deleting files on the system. Thus, if a Module is
                                removed from the config, you will need to delete it in the project manually, if
                                needed.
                            </li>
                            <li>
                                My first attempt at fixing this problem was
                                <a href="https://github.com/tompston/gomakeme">gomakeme</a>. gomakeme was written
                                because i wanted to see how far i can push codegen that could make my life easier.
                                So this is a continuation of that. The motivation to do so is based on the problem
                                stated at the start. So the absolute goal of this is project is to minimize time
                                needed to do one of the main jobs of backends =
                                <code>run this query and return the data</code>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
