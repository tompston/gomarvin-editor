<template>
  <div id="intro">
    One of the main tasks of backend REST APIs is really simple in theory:
    <div class="docs-quote">> "Run this SQL query and return the data"</div>

    <div class="mt-[16px]"></div>
    But the process of creating endpoints is boring and slow. A lot of boilerplate needs
    to be written to do that one simple thing correctly. So how can you fix this? How can
    you generate the boilerplate parts for the backend while allowing full customization?
    <div class="mt-[20px]"></div>
    <p>One answer I could think of is generate parts that don&#39;t change, like:</p>
    <ul>
      <li>Router for controllers</li>
      <li>
        controllers that include URL param and sent JSON object validation
      </li>
    </ul>
    <p>and then add your custom logic afterwards (middleware, SQL Query execution etc etc)</p>

    <div class="mt-[20px]"></div>

    <p>
      If these values can be generated, then we can write valid REST endpoints a lot
      faster.
    </p>

    <div class="mt-[20px]"></div>
    <h2 id="-install-steps-can-be-found-here-https-github-com-tompston-gomarvin-install-">
      <div class="flex-center gap-[6px] mt-[100px] mb-[60px] flex-col">
        Install steps can be found
        <a href="https://github.com/tompston/gomarvin#install" target="_blank" rel="noopener noreferrer"
          class="link__1">here</a>
      </div>
    </h2>
    <p>
      <br />
    </p>
  </div>
</template>
