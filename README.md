
![Logo](https://github.com/canmertinyo/bitter-press/assets/38213551/dfc04ebe-b9f9-43aa-997c-f4c765016015)

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
## @App Decorator
You can use a custom middleware with the app decorator, set the server's port, or use a specific controlle, also you can define a custom provider

```typescript
import { SetupApp , Controller, useGlobalMiddlewares, customProdivers} from 'bitter-press';

@SetupApp({
  port: 3000,
  controller : [],
  useGlobalMiddlewares: [],
  customProdivers : []
})
export class ExampleAppModule {}
```

## Http Methods
This framework supports classic HTTP methods and provides decorator-based support as well.


```typescript
import { App , Controller} from 'bitter-press';

@Controller('/auth')
export class ExampleController {

    @Get(':id')
    public async getSpecificUser() {
        return 'CANMERTINYO!'
    }

    @Post('/register')
    public async register() {
        return "registered!"
    }

    @Delete()
    public deleteUser() {
        return "success"
    }
}

```
And you can use other methods like: patch, update, put ...etc

## Custom Providers
In addition to registering services, BitterPress allows you to define custom providers that can be injected into your application. These custom providers can be associated with string tokens or redefine what is injected, replacing class instances by using class tokens.

To define custom providers, you should specify them within the **@App** decorator at the root level of your application. The customProviders property in the **@App** decorator's properties object is used to hold an array of these providers.

For each custom provider, two main aspects need to be defined:

**Token**: This specifies the identifier for the provider and can be either a string or a constructible type (class reference).

**Instance**: This is the actual object that will be injected when the token is used.
```typescript
import { SetupApp , Controller, useGlobalMiddlewares, customProdivers} from 'bitter-press';

@SetupApp({
  port: 3000,
  controller : [],
  useGlobalMiddlewares: [],
  customProdivers : [{token : ExampleService, instance : new ExampleService()}]
})
export class ExampleAppModule {}
```

## Life Cycle Hooks

I was heavily inspired by the Vue.js framework while creating these hooks, and I integrated them into this framework.

Current available hooks:
- BeforeGlobalMiddlewaresBound
- AfterGlobalMiddlewaresBound
- BeforeRoutesBound
- AfterRoutesBound
- BeforeListenStarted
- AfterListenStarted


I want to explain my hooks without going into too much detail,

### @BeforeGlobalMiddlewaresBound

the hook represents the portion that will be executed before middleware is defined in the application. If you have such operations, this hook can be beneficial for you.

### @AfterGlobalMiddlewaresBound

The hook represents the code that will be executed after middlewares have been applied in the application.

### @BeforeRoutesBound

The hook represents the operations that will be executed before routes are defined. If you want to run your code before defining routes, you should use this hook.

### @AfterRoutesBound

The hook represents the operations that will be executed after routes have been defined.

### @BeforeListenStarted

The hook represents the operations that will be executed before your server is started.

### @AfterListenStarted

The  hook represents the operations that will be executed after your server has started running.

Some Examples About Life Cycle Feature

```typescript

  @BeforeGlobalMiddlewaresBound()
  private beforeGlobalMiddlewaresBound() {
      console.info('I am executed just before middlewares are bound');
  }

  @AfterGlobalMiddlewaresBound()
  private afterGlobalMiddlewaresBound() {
      console.info('I am executed just after middlewares are bound');
      this.expressApp.use(express.urlencoded());
  }

  @BeforeListenStarted() 
  private beforeListenStarted() {
    console.log('I am executed just before server are bound')
  }

  @AfterListenStarted() 
  private afterListenStarted() {
    console.log('I am executed just after server are bound')
  }

 @BeforeRoutesBound()
  private beforeRoutesBound() {
    console.log('I am executed just before routes are bound');
  }

  @AfterRoutesBound()
  private afterRoutesBound() {
    console.log('I am executed just after routes are bound');
  }

 
```
## Cloning The Repo

Clone the repo

```bash
  git clone https://github.com/canmertinyo/bitter-press
```

Locate the root directory

```bash
  cd bitter-press
```

Install required dependencies with:

```bash
  npm install
```


  

  
  
