import 'reflect-metadata'
import { DependencyInjectionMetadataKey } from '../core/enums/depedency-injection-keys.enum'
import { Constructible } from '../core/interfaces/constructible.interface'

export class DependencyContainer {
    private static readonly dependencies : Dependency[] = []

    static get<T = any>(token:Token<T>): T {
        let dependency: Dependency<T> | undefined = DependencyContainer.dependencies.find((dependency:Dependency) => dependency.token === token)

        if(!dependency) {
            const instance : T = DependencyContainer.resolve(token)
            dependency = {token,instance}
            DependencyContainer.dependencies.push(dependency)
        }
        

        if(dependency?.instance) return dependency.instance
        

        return DependencyContainer.resolve(token)
    }

    static resolve<T>(token:Token<T>):T {
        if(typeof token === 'string') throw 'Unknown token identifier'

        const constructorParamTypes:any[] = Reflect.getMetadata(DependencyInjectionMetadataKey.PARAMTYPES,token)

        const injectTokens:Token[] = Reflect.getMetadata(DependencyInjectionMetadataKey.INJECT_TOKENS, token)

        const constructorParamInstances:any[] = []

        for(const instance of constructorParamInstances) {
            let injectToken:Token = constructorParamTypes[instance]

            if(injectTokens) {
                injectToken = injectTokens[instance] || injectToken
            }

            if(!injectToken) {
                throw `Cannot resolve dependency of ${token} at index ${instance}`
            }

            constructorParamInstances.push(DependencyContainer.get(injectToken))
        }
        return new token(...constructorParamInstances)
    }

    static registerStringTokenDependency(token:string, instance:any) {
        DependencyContainer.registerDependency(token,instance)
    }
    static registerClassTokenDependency<T>(token:Constructible<T>, instance?:any) {
        DependencyContainer.registerDependency(token,instance)
    }

    static registerDependency<T = any>(token:Constructible<T>|string , instance?:any) {
        DependencyContainer.dependencies.push({token,instance})
    }
}