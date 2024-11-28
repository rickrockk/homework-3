import React from 'react';
import { RouteProps } from 'react-router-dom';
import { ProductsPage } from 'pages/ProductsPage';
import { ProductPage } from 'pages/ProductPage';
import { AboutUs } from 'pages/AboutUs';
import { NotFound } from 'pages/NotFound';
import { CartPage } from 'pages/CartPage';

export enum AppRoutes {
  PRODUCTS = 'products',
  PRODUCT = 'product',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  CART = 'cart',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.PRODUCTS]: '/',
  [AppRoutes.PRODUCT]: '/product/:id',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.CART]: '/cart',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.PRODUCTS]: {
    path: RoutePath.products,
    element: <ProductsPage />,
  },
  [AppRoutes.PRODUCT]: {
    path: RoutePath.product,
    element: <ProductPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutUs />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFound />,
  },
  [AppRoutes.CART]: {
    path: RoutePath.cart,
    element: <CartPage />,
  },
};
