<template>
  <div id="intro">
    One of the main tasks of backend REST APIs is really simple in theory:
    <div class="docs-quote">> "Run this SQL query and return the data"</div>

    <div class="mt-[16px]"></div>
    But the process of creating endpoints is boring and slow. A lot of boilerplate needs
    to be written to do that one simple thing correctly. So how can you fix this? How can
    you generate the boilerplate parts for the backend while allowing full customization?
    <div class="mt-[20px]"></div>
    <p>One answer i could think of is generate parts that don&#39;t change, like:</p>
    <ul>
      <li>endpoint URLS</li>
      <li>
        controllers that include:
        <ul>
          <li>URL param and sent JSON object validation</li>
          <li>db connection creation</li>
        </ul>
      </li>
    </ul>
    <p>and then copy them to a new file and modify them.</p>

    <div class="mt-[20px]"></div>

    <p>
      If these values can be generated, then we can write valid REST endpoints a lot
      faster.
    </p>

    <div class="mt-[20px]"></div>
    <h2 id="-install-steps-can-be-found-here-https-github-com-tompston-gomarvin-install-">
      <div class="flex-center gap-[6px] mt-[100px] mb-[60px]">
        Install steps can be found
        <a
          href="https://github.com/tompston/gomarvin#install"
          target="_blank"
          rel="noopener noreferrer"
          class="link__1"
          >here</a
        >
      </div>
    </h2>
    <p>
      <br />
    </p>
  </div>
</template>
