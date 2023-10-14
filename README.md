
## @App Decorator
You can use a custom middleware with the app decorator, set the server's port, or use a specific controlle, also you can define a custom provider

```typescript
import { App , Controller, useGlobalMiddlewares, customProdivers} from 'bitter-press';

@App({
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

    //GET
    @GET(':id')
    public async getSpecificUser() {
        return 'CANMERTINYO!'
    }

    //POST
    @POST('/register')
    public async register() {
        return "registered!"
    }

    //DELETE
    @DELETE()
    public deleteUser() {
        return "success"
    }
}

```

## Custom Providers
In addition to registering services, BitterPress allows you to define custom providers that can be injected into your application. These custom providers can be associated with string tokens or redefine what is injected, replacing class instances by using class tokens.

To define custom providers, you should specify them within the **@App** decorator at the root level of your application. The customProviders property in the **@App** decorator's properties object is used to hold an array of these providers.

For each custom provider, two main aspects need to be defined:

**Token**: This specifies the identifier for the provider and can be either a string or a constructible type (class reference).

**Instance**: This is the actual object that will be injected when the token is used.
```typescript
import { App , Controller, useGlobalMiddlewares, customProdivers} from 'bitter-press';

@App({
  port: 3000,
  controller : [],
  useGlobalMiddlewares: [],
  customProdivers : [{token : ExampleService, instance : new ExampleService()}]
})
export class ExampleAppModule {}
```
