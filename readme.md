# Sharesies API
Npm package for sharesies API

### Installation
- `npm i sharesies`

### Usage
```
const sharesies = require('sharesies');

const credentials = {
    email: $YOUR_EMAIL,
    password: $YOUR_PASSWORD
};

await sharesies.authenticate(credentials);

const portfolio = await sharesies.getPortfolio();
```

### Requirements
- Node v8+


Original npm package by JavaT
https://www.npmjs.com/package/sharesies-api
https://github.com/JavaGT/sharesies-api
