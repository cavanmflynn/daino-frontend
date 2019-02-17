# Dainosaur Frontend

Cheap, near-instant, tipping on your favorite websites.

## Getting Started

### Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run your unit tests
```
yarn test:unit
```

## Folder Structure

    src/
    ├── api/           # Various API clients, which simplify communication with multiple backends
    ├── components/    # Vue components, including everything from a simple button to the home page
    ├── filters/       # Filters used for text formatting and other transformations
    ├── fonts/         # The applications's font files
    ├── localization/  # Temporary home of language keys and values, which will be used for multi-language support (should auto-pull from airtable once adding another language) 
    ├── scss/          # SCSS used to style the entire application
    ├── store/         # The Vuex store, which is used to hold the application's shared state
    ├── types/         # Typescript types and declaration files
    ├── main           # The entry point to the Vue application
    └── router         # The Vue Router, which enables multi-page navigation in the application
