export const initRouter = () => {
  const routeContent = document.getElementById("route-content") as HTMLElement;

  const getFound = (
    hash: string,
    route: string,
    regexRoute: string | undefined,
  ) => {
    if (regexRoute === "1") {
      const re = new RegExp(route);
      return hash.match(re);
    } else {
      return route === hash;
    }
  };
  const checkHash = () => {
    const hash = window.location.hash.replace("#", "");
    const cleanHash = hash[hash.length - 1] === "/" ? hash.slice(0, -1) : hash;
    const routes = document.querySelectorAll(".route-item");
    routeContent.innerHTML = "";
    routes.forEach((page) => {
      if (page instanceof HTMLTemplateElement) {
        const route = page?.dataset.route;

        const paramsKey = page?.dataset.params_key;
        const paramsIndex = page?.dataset.params_index;
        const withoutDarkTheme = page?.dataset.without_dark_theme;
        const regexRoute = page?.dataset.regex_route;

        if (route !== undefined) {
          const found = getFound(cleanHash, route, regexRoute);

          if (found) {
            const clone = page.content.cloneNode(true);
            routeContent.appendChild(clone);
            document.documentElement.setAttribute("data-page_id", page.id);
            if (paramsKey && paramsIndex && Array.isArray(found)) {
              document.documentElement.setAttribute(
                "data-" + paramsKey,
                found[Number(paramsIndex)],
              );
            }
            const event = new CustomEvent("change-route");
            setTimeout(() => document.dispatchEvent(event), 100);

            if (withoutDarkTheme) {
              setInterval(() => {
                document.documentElement.dataset.theme = "light";
                document.documentElement.classList.remove("dark");
              }, 100);
            }
          }
        }
      }
    });
  };
  checkHash();

  window.addEventListener("hashchange", () => {
    checkHash();
  });
};

const checkIsCurrentPage = (
  id: string,
  listener: () => void,
  title: string,
) => {
  const pageId = document.documentElement.dataset.page_id;

  if (pageId === id) {
    document.title = title;
    listener();
  }
};

export const initPageListeners = (
  id: string,
  listener: () => void,
  title: string,
) => {
  document.addEventListener("change-route", () => {
    checkIsCurrentPage(id, listener, title);
  });
};

export default { initRouter, initPageListeners };
