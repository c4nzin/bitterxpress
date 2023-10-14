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
}