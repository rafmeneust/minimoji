const cache = new Set();

const loaders = {
  "/concept": () => import("@/pages/Concept"),
  "/galerie": () => import("@/pages/GaleriePage"),
  "/tarifs": () => import("@/pages/Tarifs"),
  "/ecole": () => import("@/pages/Ecole"),
  "/atelier": () => import("@/pages/Atelier"),
  "/mentions-legales": () => import("@/pages/mentions-legales"),
  "/cgu-cgv": () => import("@/pages/cgu-cgv"),
  "/confirmation": () => import("@/pages/Confirmation"),
  "/creer": () => import("@/pages/Form"),
};

export function prefetchRoute(path) {
  const loader = loaders[path];
  if (!loader || cache.has(loader)) return;
  const promise = loader();
  cache.add(loader);
  return promise;
}

export function prefetchRoutes(paths = []) {
  paths.forEach(prefetchRoute);
}
