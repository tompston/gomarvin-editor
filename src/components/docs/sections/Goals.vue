
<template>
    <h1 class="doc-section-header" id="goals">Goals</h1>

    <h3 id="agnostic-about-orms" class="doc-subheader-1">Agnostic about ORMs</h3>
    <p>
        It seems like the chosen ORM of the project defines it to the same degree as the backend framework. So picking
        the ORM tool should be left to the user.
        <br />
        <br />The generated controllers include everything that is commonly written before executing the
        actual query. So you can use any ORM / no-ORM tool you want ( like SQLC, Ent, SQLBoiler,
        GORM, etc etc), as that is the part that will change based on the project. Once the project
        is generated the first time, only the
        <code>controllers.gen.go</code> and <code>body.gen.go</code> will be updated on the
        next runs. (+ more on options later)
    </p>
    <p>
        <br />
    </p>
    <h3 id="flexible-by-design" class="doc-subheader-1">Flexible by design</h3>
    <p>
        Flexibility is one of the main concerns, when it comes to codegen tools. So we fix it in the
        following way:
    </p>
    <ul>
        <li>
            While we rely on the codegen to generate the
            boilerpate, we are not dependent on it if we want to edit it.
            To customize the generated code, rename <code>controllers.gen.go</code> files to
            <code>controllers.go</code> (or any other name, doesn't really matter) and remove the <code>__</code> prefix
            in the new file. That way there won't be any overlap between the generated code and editable code.
            <ul>
                <li>
                    Need a custom field for the generated endpoint Body struct? Either
                    <ul>
                        <li>Copy the struct from <code>body.gen.go</code>, edit it and use it in the controller</li>
                        <li>Or rename the <code>body.gen.go</code> file and edit it there</li>
                    </ul>
                </li>
                <li>
                    Need to validate a custom type url param?
                    <ul>
                        <li>write a new function that does that and use it in the controller</li>
                    </ul>
                </li>
                <li>
                    Want to use a different db driver?
                    <ul>
                        <li>install it and change it</li>
                    </ul>
                </li>
                <li>
                    Want to use methods for the generated controllers?
                    <ul>
                        <li>Write them and add them, as needed</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            The generated server won't be touched on the next runs. This means that you can
            customize most of it to your needs + add more functionality as you go
        </li>
        <li>
            The sent payload ( Body ) is an automatically generated struct that is passed to the controller function. As
            we use the
            <a href="https://pkg.go.dev/github.com/go-playground/validator/v10" target="_blank"
                rel="noopener noreferrer">go validator</a> package for validating that payload, during the codegen we
            can inject custom validate fields into the struct. So the third column of the Body input is a string that
            will be passed to the
            <code>validate</code> field in the go struct.
        </li>
    </ul>

    <p>
        <br />
    </p>

    <h3 id="no-dependencies" class="doc-subheader-1">No Dependencies</h3>
    <p>As this is a codegen tool that is responsible for generating boilerplate, you can stop using it at any time. If
        this project gets yoinked out of existence, the previously generated servers would still be valid.</p>
    <p>
        <br />
    </p>

    <h3 id="no-magic" class="doc-subheader-1">No Magic</h3>
    <p>Don't hide away anything that is generated. Everything can be inspected and understood, so that it would be
        easier to tweak the functions for personal needs later. The project is as minimal as possible, so that
        refactoring most of it for your needs would be easily doable.</p>
    <p>
        <br />
    </p>
</template>
