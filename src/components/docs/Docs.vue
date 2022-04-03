<script setup lang="ts">
import Header from '../Header.vue'
// 
import DocGoals from './sections/Goals.vue'
import DocIntro from './sections/Intro.vue'
import DocConfig from './sections/Config.vue'

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
        <div class="max-width-1">
            <div class="docs">
                <!-- Docs navigation -->
                <div class="docs--nav">
                    <div
                        class="pl-12 py-20 flex flex-column gap-12 fs-8 docs-sticky temp-main-col-2 text-col-6"
                    >
                        <div v-for="section in sections">
                            <a :href="section.href">{{ section.label }}</a>
                        </div>
                    </div>
                </div>

                <div class="docs--content">
                    <div class="fs-1 fw-300 mb-20">Gomarvin explained</div>

                    <div class="text-2 fw-400 mb-110 max-w-620">
                        <DocIntro />
                        <DocGoals />
                        <DocConfig />

                        <br />

                        <h1 id="caution">CAUTION!</h1>
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
                            <p class="text-center my-50 fw-500">
                                If a file has
                                <code>.gen</code> in the name, that means it will be regenerated on
                                each run. So editing them is a bad idea if you want to save changes. Either create a
                                copy of the file and remove
                                <code>.gen</code>
                                to save changes or copy the generated
                                dir to another place
                            </p>
                        </div>

                        <h1 id="optional-values">Optional values</h1>
                        <p>
                            Controllers aren't the only thing that we can automatically generate from the config
                            file. As the goal of this project is to automate out the boring parts of writing rest
                            servers, we can also generate
                        </p>
                        <ul>
                            <li>Typescript functions that fetch the generated endpoints (WIP)</li>
                            <li>SQL files that hold placeholder tables and queries for the module endpoints</li>
                        </ul>
                        <h3 id="include_sql">include_sql</h3>
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
                        </ul>
                        <p>
                            As sqlc uses sql files for codegen, we create placeholder
                            <code>.gen.txt</code> files in
                            the same dir. So copy and rename the files to preserve changes to them
                        </p>

                        <div class="mt-10"></div>
                        <p>
                            Ideally
                            <code>include_sql</code> is a thing you toggle to be true when you want to create the example files for new modules and then turn it off, so that the text files could be deleted.
                        </p>

                        <h3 id="include_ts_fetch">include_ts_fetch (WIP)</h3>
                        <p>
                            If set to true,
                            <code>main.gen.ts</code> will be created at the root of the project and
                            populated with util functions for fetching the data. Everything is in a single file, so
                            that it's easier to import the code into frontend.
                        </p>

                        <br />

                        <h1 id="notes">Notes</h1>
                        <ul>
                            <li>
                                <p>
                                    The generated variables and functions in
                                    <code>controllers.gen.go</code> have a
                                    <code>__</code> prefix. This is done for 3 reasons:
                                </p>
                                <ul>
                                    <li>
                                        so thay you would know which code is generated and will be regenerated on
                                        each run
                                    </li>
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
                                Routers for the modules will be automatically imported and available only on the
                                first run
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
                                <a
                                    href="https://github.com/tompston/gomakeme"
                                >gomakeme</a>. gomakeme was written
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
