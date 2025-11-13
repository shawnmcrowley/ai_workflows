(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/components/ServiceWorkerRegistration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceWorkerRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function ServiceWorkerRegistration() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceWorkerRegistration.useEffect": ()=>{
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
            }
        }
    }["ServiceWorkerRegistration.useEffect"], []);
    return null;
}
_s(ServiceWorkerRegistration, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ServiceWorkerRegistration;
var _c;
__turbopack_context__.k.register(_c, "ServiceWorkerRegistration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_components_ServiceWorkerRegistration_d3c88d79.js.map