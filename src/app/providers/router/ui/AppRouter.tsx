import {Route, Routes} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop";
import {Suspense} from "react";
import {routeConfig} from "shared/config/routeConfig/routeConfig";

export function AppRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ScrollToTop />
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        key={path}
                        path={path}
                        element={element}
                    />
                ))}
            </Routes>
        </Suspense>
    );
}