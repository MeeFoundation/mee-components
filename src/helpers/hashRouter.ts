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
    let foundRoute = false;
    routes.forEach((page) => {
      if (page instanceof HTMLTemplateElement) {
        const route = page?.dataset.route;
        const params = page?.dataset.params?.split("|");
        const withoutDarkTheme = page?.dataset.without_dark_theme;
        const regexRoute = page?.dataset.regex_route;

        if (route !== undefined) {
          const found = getFound(cleanHash, route, regexRoute);

          if (found) {
            document.documentElement.setAttribute("data-page_id", page.id);
            foundRoute = true;
            const clone = page.content.cloneNode(true);
            routeContent.appendChild(clone);

            if (params && Array.isArray(found)) {
              params.map((param, index) => {
                if (found[Number(index + 1)] !== undefined) {
                  document.documentElement.setAttribute(
                    "data-" + param,
                    found[Number(index + 1)],
                  );
                }
              });
            }
            const event = new CustomEvent("change-route");
            window.scrollTo(0, 0);
            setTimeout(() => document.dispatchEvent(event), 150);

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
    if (!foundRoute) {
      routes.forEach((page) => {
        if (page instanceof HTMLTemplateElement) {
          const route = page?.dataset.route;
          if (route === "404") {
            document.documentElement.setAttribute("data-page_id", page.id);
            const clone = page.content.cloneNode(true);
            routeContent.appendChild(clone);
            const event = new CustomEvent("change-route");
            window.scrollTo(0, 0);
            setTimeout(() => document.dispatchEvent(event), 150);
          }
        }
      });
    }
  };
  checkHash();

  window.addEventListener("hashchange", () => {
    checkHash();
  });
};

const checkIsCurrentPage = (
  id: string,
  listener: () => void,
  title?: string,
) => {
  const pageId = document.documentElement.dataset.page_id;

  if (pageId === id && title) {
    document.title = title;
    listener();
  }
};

export const initPageListeners = (
  id: string,
  listener: () => void,
  title?: string,
) => {
  document.addEventListener("change-route", () => {
    checkIsCurrentPage(id, listener, title);
  });
  checkIsCurrentPage(id, listener, title);
};

export default { initRouter, initPageListeners };
