import {RouteProps} from "react-router-dom";
import {ProductsPage} from "pages/ProductsPage";
import {ProductPage} from "pages/ProductPage";

export enum AppRoutes {
    PRODUCTS = 'products',
    PRODUCT = 'product',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PRODUCTS]: '/',
    [AppRoutes.PRODUCT]: '/product/:id'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <ProductsPage/>
    },
    [AppRoutes.PRODUCT]: {
        path: RoutePath.product,
        element: <ProductPage/>
    },

}