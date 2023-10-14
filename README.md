
# BitterPress





### Short Brief
It seems like you're encountering some challenges when trying to use TypeScript with Express, and you're looking for a solution that provides more structure and takes advantage of TypeScript decorators. One solution that fits this description is BitterPress.

BitterPress is a framework for building efficient, scalable, and maintainable server-side applications. It is built on top of Express and uses TypeScript as its primary language. BitterPress provides a structured, object-oriented approach to building applications, making it a great fit for developers who prefer a more organized and modular codebase.


### Features
BitterPress focuses on providing decorators for Express.js API logic abstraction with the added benefit of a simple built-in dependency injection container for a lightweight and minimalistic approach to TypeScript development.


  
- Controllers
- Route, Query, Body, Params
- Request
- Response
- Change Response Status Code
- Set Headers
- Middleware Support
- Services 
- Dependency Injection based
- Lifecycle hooks
- Instance of express

  
## Installation 

To install the package:

```bash 
  npm install bitter-press
```
    
 Next, generate the tsconfig.json file at the root level of your project by running tsc --init, and within the compilerOptions object, include the following options:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Now you are ready to go.
