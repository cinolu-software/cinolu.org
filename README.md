# App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Server-Side Rendering (SSR)

This project is configured for Angular SSR using the new `@angular/ssr` APIs (Angular v20).

### Development

Build (including the server bundle):

```bash
pnpm build
```

Run the built SSR server:

```bash
pnpm ssr
```

The server listens on `http://localhost:4000` (override with `PORT=xxxx`).

### Avoiding duplicate server provider registration

Angular will throw this error if server providers are registered more than once:

> Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.

Cause: Mixing legacy module-based SSR (e.g. `ServerModule`) with the standalone provider API (`provideServerRendering(...)`).

Current setup uses only the provider style in `src/app/app.config.server.ts`:

```ts
providers: [provideServerRendering(withRoutes(serverRoutes))];
```

Do **not** also import `ServerModule` or call other deprecated SSR bootstrapping utilities, otherwise duplicate serialization occurs.

If you ever migrate to a purely runtime-driven engine (providing bootstrap inside the Node engine), remove the inline `provideServerRendering(...)` provider and ensure the engine supplies it exactly once.

### Route render modes

`src/app/app.routes.server.ts` defines `ServerRoute[]` with `RenderMode.Client` or `RenderMode.Prerender`. Adjust these to control which routes are prerendered at build time vs. rendered on demand or delegated to the client.

---
