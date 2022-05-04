/**
 * ----------------------------------
 * Custom Sidebar for Home Assistant
 * ----------------------------------
 * README: https://github.com/wwwescape/custom_sidebar/blob/main/README.md
 * ----------------------------------
 * by https://github.com/wwwescape
 */

 (() => {
  //------------------
  // CONFIG

  // window.$customSidebar.orderConfig = { order: [...] };

  //------------------

  !window.$customSidebar &&
    (window.$customSidebar = { tryCounter: 0, Loaded: false });

  const version = "1.0.0";

  let runInterval;

  const bottomOrder = 100,
    notProcessedOrder = 50;

  var isPreviousItemSpacer = false;

  function asArray(valOrArr) {
    return !valOrArr || Array.isArray(valOrArr) ? valOrArr : [valOrArr];
  }

  function cloneObj(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {}
    return obj;
  }

  function getListAsArray(list) {
    if (Array.isArray(list)) {
      return list;
    }
    if (typeof list === "string") {
      list = list.split(/\s*,\s*/);
    }
    return [].concat(list || []);
  }

  function log(how, what, ...stuff) {
    const style = {
      error: "background:#8b0000; color:white; padding:2px; border-radius:2px",
      warn: "background:#8b0000; color:white; padding:2px; border-radius:2px",
      log: "background:#222; color:#bada55; padding:2px; border-radius:2px;",
    };
    if (how !== "warn" && how !== "error") {
      how = "log";
    }
    console[how](
      "%cCustom Sidebar v" + version + ": " + what,
      style[how],
      ...(asArray(stuff) || [""]),
      window.$customSidebar
    );
  }

  function isMobileDevice() {
    var isMobileDevice = false; //initiate as false
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobileDevice = true;
    }
    return isMobileDevice;
  }

  function getHaobj() {
    return (
      window.$customSidebar.Haobj ||
      (() => {
        const haElement = document.querySelector("home-assistant");
        return (window.$customSidebar.Haobj = haElement && haElement.hass);
      })()
    );
  }

  function getCurrentUser() {
    const haObj = getHaobj();
    return (
      window.$customSidebar.currentUser ||
      (window.$customSidebar.currentUser =
        (haObj &&
          haObj.user &&
          haObj.user.name &&
          haObj.user.name.toLowerCase()) ||
        "")
    );
  }

  function getCurrentDevice() {
    return (
      window.$customSidebar.currentDevice ||
      (window.$customSidebar.currentDevice =
        navigator && navigator.userAgent
          ? navigator.userAgent.toLowerCase()
          : "")
    );
  }

  function getDrawerLayout() {
    if (window.$customSidebar.DrawerLayoutElement) {
      return window.$customSidebar.DrawerLayoutElement;
    }
    let root = document.querySelector("home-assistant");
    root = root && root.shadowRoot;
    root = root && root.querySelector("home-assistant-main");
    root = root && root.shadowRoot;
    const drawerLayout = root && root.querySelector("app-drawer-layout");
    !drawerLayout &&
      log(
        "warn",
        'Cannot find "home-assistant home-assistant-main app-drawer-layout" element'
      );

    return (window.$customSidebar.DrawerLayoutElement = drawerLayout);
  }

  function getSidebar() {
    if (window.$customSidebar.SideBarElement) {
      return window.$customSidebar.SideBarElement;
    }
    const drawerLayout = getDrawerLayout();
    let sidebar =
      drawerLayout && drawerLayout.querySelector("app-drawer ha-sidebar");
    sidebar = sidebar && sidebar.shadowRoot;
    window.$customSidebar.TitleElement =
      sidebar && sidebar.querySelector(".title");
    sidebar = sidebar && sidebar.querySelector("paper-listbox");

    !sidebar &&
      log("warn", 'Cannot find "app-drawer ha-sidebar paper-listbox" element');

    return (window.$customSidebar.SideBarElement = sidebar);
  }

  function getSidebarItem(root) {
    if (window.$customSidebar.SidebarItemElement) {
      return window.$customSidebar.SidebarItemElement;
    }
    if (!root || !root.children) {
      return;
    }
    return Array.from(root.children).find((element) => {
      return (
        element.tagName == "A" && element.getAttribute("data-panel") == "config"
      );
    });
  }

  function setTitle(title) {
    if (window.$customSidebar.TitleElement) {
      window.$customSidebar.TitleElement.innerHTML = title;
    }
  }

  function rearrange(order) {
    try {
      if (order && window.$customSidebar.SideBarElement) {
        window.$customSidebar.SideBarElement.style.display = "flex";
        window.$customSidebar.SideBarElement.style.flexDirection = "column";

        const spacerElement = Array.from(
          window.$customSidebar.SideBarElement.children
        ).find((element) => {
          return (
            element.tagName == "DIV" && element.classList.contains("spacer")
          );
        });
        spacerElement.remove();

        order.forEach((item, i) => {
          const shouldCreate = item.new_item && !item.created;
          const shouldMove = !item.new_item && !item.moved;
          const shouldCreateSpacer =
            item.new_item && !item.created && item.spacer;

          if (shouldCreate || shouldMove) {
            const existingItem = findItem(
              window.$customSidebar.SideBarElement,
              item
            );
            if (existingItem) {
              item.itemElement = existingItem;
              shouldCreate && (item.created = true);
              moveItem(window.$customSidebar.SideBarElement, item, i);
            } else {
              (shouldMove || shouldCreateSpacer) && (item.moved = true);
              (item.href || item.spacer) &&
                createItem(window.$customSidebar.SideBarElement, item, i);
            }
          }
        });

        Array.from(
          window.$customSidebar.SideBarElement.querySelectorAll(
            'a[aria-role="option"]:not([data-custom-sidebar-processed]'
          )
        ).forEach((element, index) => {
          element.style.order = notProcessedOrder + index;
          element.setAttribute("data-custom-sidebar-processed", "leftover");
        });
      }
    } catch (e) {
      log("warn", "Error rearranging order", e);
      return false;
    }
    return true;
  }

  function updateIcon(element, icon) {
    try {
      const icon_item = element.querySelector("paper-icon-item");
      let icn = icon_item.querySelector("ha-icon");
      const svgIcn = icon_item.querySelector("ha-svg-icon");

      if (icon_item && !icn) {
        if (svgIcn) {
          icon_item.removeChild(svgIcn);
        }
        icn = document.createElement("ha-icon");
        icn.setAttribute("slot", "item-icon");
        icn.setAttribute("data-custom-sidebar-processed", "create");
        icon_item.prepend(icn);
      }
      icn.setAttribute("icon", icon);
    } catch (e) {
      log("warn", "Error updating icon", e);
    }
  }

  function findNameElement(element) {
    let txtEl = element.querySelector("paper-icon-item");
    txtEl = (txtEl && txtEl.querySelector(".item-text")) || {};
    return txtEl;
  }

  function updateName(element, name) {
    try {
      findNameElement(element).innerHTML = name;
    } catch (e) {
      log("warn", "Error updating text", e);
    }
  }

  function findItem(elements, config_entry) {
    try {
      if (config_entry.spacer) {
        return null;
      }

      const item = Array.from(elements.children).find((element) => {
        if (element.tagName !== "A") {
          return false;
        }
        const currentName = findNameElement(element).innerText.trim();
        const currentPanel = element.getAttribute("data-panel");

        return config_entry.exact
          ? currentName == config_entry.item ||
              currentPanel == config_entry.item
          : currentName
              .toLowerCase()
              .includes(config_entry.item.toLowerCase()) ||
              currentPanel === config_entry.item.toLowerCase();
      });
      return item;
    } catch (e) {
      log("warn", "Error finding item", e);
      return null;
    }
  }

  function setOrder(element, config_entry, index) {
    config_entry.order &&
      (config_entry.order = parseInt(config_entry.order) || null);

    element &&
      (element.style.order = config_entry.bottom
        ? (config_entry.order || index + 1) + bottomOrder
        : config_entry.order || index + 1);
  }

  function createItem(elements, config_entry, index) {
    try {
      if (config_entry.spacer) {
        if (isPreviousItemSpacer) {
          return;
        }

        const cln = document.createElement("DIV");

        if (config_entry.divider) {
          cln.style.borderBottom = "1px solid #343434";
          cln.style.marginBottom = "1px";
        }
        cln.style.flexGrow = 5;
        setOrder(cln, config_entry, index);

        cln.setAttribute("disabled", "");
        cln.setAttribute("aria-selected", "false");
        cln.className = "spacer";

        if (!config_entry.spacerElement)
          elements.insertBefore(cln, elements.children[0]);

        config_entry.created = true;
        config_entry.itemElement = cln;

        isPreviousItemSpacer = true;
      } else {
        const cln =
          config_entry.itemElement || getSidebarItem(elements).cloneNode(true);
        if (cln) {
          //
          updateIcon(cln, config_entry.icon);
          updateName(cln, config_entry.name || config_entry.item);

          cln.href = config_entry.href;
          cln.target = config_entry.target || "";

          cln.setAttribute(
            "data-panel",
            config_entry.item.toLowerCase().replace(/\s/, "_")
          );

          if (config_entry.desktop_only && isMobileDevice()) {
            config_entry.hide = true;
          }

          if (config_entry.hide == true) {
            cln.style.display = "none";
            cln.setAttribute("data-custom-sidebar-processed", "hide");
            config_entry.hidden = true;
            //
          } else {
            //
            cln.style.display = "block";
            cln.setAttribute("data-custom-sidebar-processed", "create");
            setOrder(cln, config_entry, index);
          }

          cln.setAttribute("aria-selected", "false");
          cln.className = "";

          if (!config_entry.spacerElement)
            elements.insertBefore(cln, elements.children[0]);

          config_entry.created = true;
          config_entry.itemElement = cln;

          isPreviousItemSpacer = config_entry.hide
            ? isPreviousItemSpacer
            : false;
        }
      }
    } catch (e) {
      log("warn", "Error creating item", e);
    }
  }

  function moveItem(root, config_entry, index) {
    if (!root || !config_entry) {
      return;
    }
    try {
      const elementToMove =
        config_entry.itemElement || findItem(root, config_entry);

      if (elementToMove) {
        if (config_entry.href) {
          elementToMove.href = config_entry.href;
        }

        if (config_entry.target) {
          elementToMove.target = config_entry.target;
        }

        if (config_entry.name) {
          updateName(elementToMove, config_entry.name);
        }

        if (config_entry.icon) {
          updateIcon(elementToMove, config_entry.icon);
        }

        if (config_entry.desktop_only && isMobileDevice()) {
          config_entry.hide = true;
        }

        if (config_entry.hide == true) {
          elementToMove.style.display = "none";
          elementToMove.setAttribute("data-custom-sidebar-processed", "hide");
          config_entry.hidden = true;
          //
        } else {
          //
          elementToMove.style.display = "block";
          setOrder(elementToMove, config_entry, index);
          elementToMove.setAttribute("data-custom-sidebar-processed", "move");
        }

        if (
          !(
            elementToMove.getAttribute("aria-selected") == "true" &&
            elementToMove.classList.contains("iron-selected")
          )
        ) {
          elementToMove.setAttribute("aria-selected", "false");
          elementToMove.className = "";
        }

        config_entry.moved = true;
        config_entry.itemElement = elementToMove;

        isPreviousItemSpacer = config_entry.hide ? isPreviousItemSpacer : false;
      } else {
        log("warn", "Element to move not found", config_entry);
      }
    } catch (e) {
      log("warn", "Error moving item", e);
    }
  }

  function getOrderWithExceptions(order, exceptions) {
    try {
      if (Array.isArray(exceptions)) {
        const currentUser = getCurrentUser(),
          currentDevice = getCurrentDevice();

        exceptions = exceptions.filter((exc) => {
          exc.user = getListAsArray(exc.user).map((u) => u.toLowerCase());
          exc.not_user = getListAsArray(exc.not_user).map((u) =>
            u.toLowerCase()
          );

          return (
            exc &&
            Array.isArray(exc.order) &&
            (exc.user.includes(currentUser) ||
              exc.not_user.includes(currentUser) ||
              (exc.device &&
                getListAsArray(exc.device).some((d) =>
                  currentDevice.includes(d)
                )))
          );
        });
        if (exceptions.some((e) => e.base_order === false)) {
          order.length = 0;
        }
        exceptions.forEach((e) => order.push(...e.order));
      }
    } catch (e) {
      log("warn", "Error processing exceptions", e);
    }
    return order;
  }

  function process(config) {
    if (!config || !Array.isArray(config.order)) {
      finish(false, ['No config found or it does not have "order"', config]);
      return;
    }
    if (config.title) {
      setTitle(config.title);
    }
    if (Array.isArray(config.exceptions) && config.exceptions.length) {
      window.$customSidebar.orderConfig.base_order = cloneObj(config.order);
      config.order = getOrderWithExceptions(config.order, config.exceptions);
    }
    finish(rearrange(config.order));
  }

  function finish(success, error) {
    clearInterval(runInterval);
    if (!success || error || window.$customSidebar.tryCounter > 10) {
      window.$customSidebar.Loaded = "error";
      log("warn", "Failed", error || "");
    } else if (success) {
      window.$customSidebar.Loaded = "success";
      log("log", "Loaded successfully!");
    }
  }

  function run() {
    try {
      window.$customSidebar.DrawerLayoutElement = getDrawerLayout();
      window.$customSidebar.SideBarElement = getSidebar();
      window.$customSidebar.SidebarItemElement =
        window.$customSidebar.SideBarElement &&
        getSidebarItem(window.$customSidebar.SideBarElement);

      if (
        window.$customSidebar.SideBarElement &&
        window.$customSidebar.SidebarItemElement &&
        !window.$customSidebar.Loaded
      ) {
        window.$customSidebar.Loaded = true;

        if (window.$customSidebar.orderConfig) {
          process(window.$customSidebar.orderConfig);
        } else {
          fetch(
            "/local/custom_sidebar/sidebar_order.json" +
              "?" +
              Math.random().toString(16).substr(2, 5)
          ).then(
            (resp) => {
              if (!resp.ok || resp.status == 404) {
                finish(
                  false,
                  "JSON config file not found.\nMake sure you have valid config in /config/www/custom_sidebar/sidebar_order.json file."
                );
                return;
              }
              resp.json().then(
                (config) => {
                  if (config.id && config.id.includes("example_json")) {
                    log(
                      "log",
                      "You seem to be using example configuration.\nMake sure you have valid config in /config/www/custom_sidebar/sidebar_order.json file."
                    );
                  }
                  process((window.$customSidebar.orderConfig = config));
                },
                (err) => {
                  finish(false, ["Error loading JSON config", err]);
                }
              );
            },
            (err) => {
              finish(false, ["Error loading JSON config", err]);
            }
          );
        }
      } else {
        if (window.$customSidebar.Loaded) {
          finish("Custom Sidebar already loaded");
        }
        if (
          ++window.$customSidebar.tryCounter > 10 &&
          !window.$customSidebar.Loaded
        ) {
          finish(false, "Tried 10 times and gave up");
        }
      }
    } catch (e) {
      finish(false, e);
    }
  }

  if (!window.$customSidebar.Loaded) {
    runInterval = setInterval(run, 1000);
  } else {
    finish("Already loaded");
  }
})();
