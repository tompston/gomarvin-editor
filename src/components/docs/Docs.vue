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

      <div class="docs grid-cols-[140px_auto] md:grid-cols-[1fr]">


        <div class="docs--nav hide-on-md">
          <div class="p-[15px] flex flex-col gap-1 fs-9 docs-sticky border-1-1">
            <div v-for="section in sections">
              <a :href="section.href" class="docs-sticky-link">{{ section.label }}</a>
            </div>
          </div>
        </div>

        <div class="docs--content">
          <div class="fs-2 fw-600 mb-[20px] leading-none">Gomarvin explained</div>

          <div class="text-2 fw-400 mb-[110px] max-w-[640px] md:max-w-[100%]">
            <DocIntro />
            <DocGoals />
            <h1 id="config">Config</h1>
            <p>
              The server is generated based on the config file. To create and edit that file, either use
              the
              <router-link to="/" class="mr-1">Current Editor</router-link>or copy a predefined config
              file from
              gomarvin github repo
              <a href="https://github.com/tompston/gomarvin/tree/main/examples" rel="noreferrer" target="_blank"
                class="underline">examples dir</a>.


            <div class="mt-[10px]"></div>

            The frontend saves the config in local storage on change.
            </p>
            <p class="mt-[10px]">
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

              <li>Bugs caused by url params and routing should be fixed manually. (Mostly a Gin problem)</li>
              <li>The currently generated codebase uses a global <code>database.DB</code> variable to create a
                database connection. Some places say that this is not the best approach. So do your own research on
                which method you want to use.</li>

            </ul>

            <div>
              <p class="text-center my-30 fw-600 main-col-danger text-white py-[16px] px-10 border-rad-3 sm:px-5">
                If a file has
                <code class="!text-white !border-white">.gen</code> in the name, that means it will be regenerated on
                each run. So editing them is a bad idea if you want to save changes. Rename the file and remove the upper comment to edit them.
              </p>
            </div>

            <div class="mt-4">
              <h1 id="optional-values">Optional values</h1>
            </div>
            <p>
              Controllers aren't the only thing that we can automatically generate from the config
              file. As the goal of this project is to automate out the boring parts of writing REST
              servers, we can also generate:
            </p>
            <ul>
              <li>Typescript functions that fetch the generated endpoints</li>
              <li>SQL files that hold placeholder tables and queries for the module endpoints</li>
            </ul>

            <br>

            <h3 id="include_fetch" class="doc-subheader-1">include_fetch</h3>

            <p>
              If set to true,
              <code>gomarvin.gen.ts</code>
              will be created in the <code>/public</code> dir and
              populated with fetch functions for the endpoint.

              <br />
              <br />
              As everything is generated from a single point of reference ( config file ), the fetch functions come with
              type checked body and url params. This means that keeping the server and frontend client in sync with each
              other is 10x easier.
              This also means that if the backend optionally serves the generated fetch functions file, frontend people
              can import a valid API client, without talking to the backend team.

            <div class="border-1-2 italic opacity-70 p-[18px] mt-[10px] border-rad-3">
              One problem with this may be the authentication part. As there are multiple ways of doing it, it's a bit
              harder to implement it in the fetch functions. One possible way of dealing with it, is indicating which
              routes need authentication by adding <code>"withAuth"</code> at the end of the controller name to signal
              that more actions need to be taken to make a valid fetch request.
            </div>


            <br />
            To stay agnostic about frontend frameworks, the generated functions return only
            the promise of the response.
            That way, you can implement custom loading / error states in the framework of your choice.

            <br>
            <br>

            The name of the generated typescript fetch function is the same as the defined controller
            name.
            The same applies to the body ( <code>ControllerName + "Body"</code> ).
            <br>
            <br>

            The generated values are documented with JSdoc. Interfaces for the Endpoint body include the validate
            fields.
            <br>
            <br>

            All values from the file are exported. Additionally, the module endpoints are grouped in a object that has
            a name of
            <code>ModuleName + "Endpoints"</code>.
            <br>
            <br>
            </p>

            <div class="fs-8 fw-700">fetch-only</div>
            If you only need to generate the typescript file, run

            <div class="docs-quote">
              gomarvin -fetch-only="true" generate
            </div>

            <br>

            <h3 id="include_fetch-example" class="doc-subheader-1">Examples using generated fetch
              functions</h3>


              <div class="grid grid-cols-1 overflow-auto">
<pre>
                <code class="!border-none">
<span class="docs-comment">// import the generated file</span>
import * as F from "../../../gomarvin.gen";
<span class="docs-comment">// or import only the Comment module endpoints</span>
import { CommentEndpoints } from "../../../gomarvin.gen";

<span class="docs-comment">// fetch a user by id</span>
async function FetchGetUserByIdEndpoint() {
  let res = await F.GetUserById(1);
  let users = await res.json();
  console.log(users);
}

<span class="docs-comment">// create a new user</span>
async function FetchCreateUserEndpoint() {
  let res = await F.CreateUser({
    username: "qweqwe",
    email: "qwe@qwe.com",
    age: 20,
    password: "very-long-and-good-password",
  });

  let user = await res.json();
  console.log(user);
}

<span class="docs-comment">// append optional string to the existing endpoint url</span>
async function FetchEndpointWithAppendedUrl() {
  const res = await F.GetUserById(10, { append_url: "?name=jim" });
  console.log(res);
}

<span class="docs-comment">// define custom options for the fetch request</span>
async function FetchEndpointWithCustomOptions() {
  const res = await F.GetUserById(10, { options: { method: "POST" } });
  console.log(res);
}

<span class="docs-comment">// Use both optional values
// - append a string to the fetch url
// - define a new options object used in the fetch request</span>
async function FetchWithAppendedUrlAndCustomOptions() {
  const res = await F.GetUserById(10, {
    options: { method: "DELETE" },
    append_url: "?name=jim",
    });
  console.log(res);
}

<span class="docs-comment">// Fetch a single endpoint from the Comment module</span>
async function FetchCommentById() {
  const res = await CommentEndpoints.GetComment(20);
  console.log(res);
}</code>
            </pre>
              </div>

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

            </ul>
            <p>
              As sqlc uses sql files for codegen, we create placeholder
              <code>.gen.txt</code> files in
              the same dir. So copy and rename the files to preserve changes to them
            </p>

            <div class="mt-[30px]"></div>

            <div class="mb-2">
              <h1 id="notes">Notes</h1>
            </div>
            <ul>
              <li>
                <p>
                  The generated variables and functions in
                  <code>controllers.gen.go</code> have a
                  <code>__</code> prefix. This is done for 3 reasons:
                </p>
                <ul>
                  <li>easier to identify what code is regenerated on each run</li>
                  <li>
                    as these values will be regenerated, the prefix removes the option of
                    exporting them from the package
                  </li>
                  <li>
                    If you wish to copy and edit all of the generated code in one go, just rename the file and remove
                    the prefix.
                  </li>
                </ul>
              </li>
              <li>
                Check for a newer version of the used backend framework. The current ones may not be up to date.
              </li>
              <li>
                Routers for the modules will be automatically imported and available only on the
                first run
              </li>
              <li>
                Codegen is not tested on the older go versions shown under options. So picking them may
                not work.
              </li>
              <li>
                Go has some great benefits for writing backends. On of them is that switching
                framewoks is relativley easy. So this project supports Gin, Fiber, Echo and Chi.
              </li>
              <li>
                The current frontend editor
                does all of the validation for the config file.
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
