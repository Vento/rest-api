export class RouteModel{


    constructor(public routes: any[] ) {
    }

    addRoute(route) {
        this.routes.push({
            route: route
        })
    }

    removeRoute(route) {
        for (let i = 0; i < this.routes.length; i++){
            if (this.routes[i] == route) {
                this.routes.splice(i, 1);
            }
        }
    }
}