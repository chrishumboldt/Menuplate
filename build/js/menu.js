/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.menu = {
   closeText: 'close',
   reveal: 'left',
   type: 'slide'
};

// Module
const RockMod_Menu = (() => {
   const reveals = ['_mod-reveal-left', '_mod-reveal-right'];
   const menuStore = {};
   const types = ['_mod-type-mini', '_mod-type-slide'];

   // Methods
   function globalSetup() {
      if (Rocket.has.class(Rocket.dom.html, 'mod-menu-listener')) {
         return;
      } else {
         Rocket.classes.add(Rocket.dom.html, 'mod-menu-listener');
      }

      // Click listener
      Rocket.event.add(Rocket.dom.element('.mod-menu-listener'), 'click', (event) => {
         const target = event.target;
         const classNames = (event.target.getAttribute('class')) ? event.target.getAttribute('class').split(' ') : [];
         const id = (event.target.getAttribute('id')) ? event.target.getAttribute('id') : '';

         if (classNames.indexOf('mod-menu-close-link') > -1) {
            event.preventDefault();
            menuClose();
         } else if (classNames.indexOf('mod-menu-link') > -1 || id === 'rocket-overlay') {
            menuClose();
         } else if (menuStore[`#${id}`]) {
            event.preventDefault();
            menuOpen(menuStore[`#${id}`]);
         } else {
            for (let i = 0, len = classNames.length; i < len; i++) {
               if (menuStore[`.${classNames[i]}`]) {
                  event.preventDefault();
                  menuOpen(`.${classNames[i]}`);
                  break;
               }
            }
         }
      });
   };

   function menuClose({ callback = undefined, overlayHide = true } = {}) {
      const openMenu = Rocket.dom.element('.mod-menu.is-active');

      Rocket.classes.remove(Rocket.dom.html, 'mod-menu-is-active');
      if (Rocket.is.element(openMenu)) {
         if (overlayHide) { Rocket.overlay.hide(); }
         Rocket.state.clear(openMenu);
      }

      if (Rocket.is.function(callback)) { return callback(); }
   }

   function menuOpen(menuRef) {
      const menu = Rocket.dom.element(menuRef);
      const openMenu = Rocket.dom.element('.mod-menu.is-active');

      if (menu !== openMenu) {
         menuClose({callback: () => {
            Rocket.overlay.show();
            Rocket.classes.add(Rocket.dom.html, 'mod-menu-is-active');
            Rocket.state.add(menu, 'active');
         }});
      } else {
         menuClose();
      }
   }

   function init({
      closeText = Rocket.defaults.menu.closeText,
      reveal = Rocket.defaults.menu.reveal,
      target = undefined,
      trigger = undefined,
      type = Rocket.defaults.menu.type
   }) {
      const menu = Rocket.dom.element(target);

      // Catch
      if (!menu || !trigger) { return; }

      // Continue
      menuStore[trigger] = target;
      Rocket.classes.remove(menu, reveals.concat(types));
      Rocket.classes.add(menu.querySelectorAll('a'), 'mod-menu-link');

      switch (type) {
         case 'mini':
            Rocket.classes.add(menu, `mod-menu _mod-type-${type}`);

            if (!Rocket.exists(menu.querySelector('.mod-menu-close-link'))) {
               let closeUL = document.createElement('ul');
               let closeLI = document.createElement('li');
               let closeLink = document.createElement('a');

               Rocket.classes.add(closeUL, 'mod-menu-close-list');

               Rocket.classes.add(closeLink, 'mod-menu-close-link');
               closeLink.href = '';
               closeLink.innerHTML = closeText;

               closeLI.appendChild(closeLink);
               closeUL.appendChild(closeLI);
               menu.appendChild(closeUL);
            }
            break;

         default:
            Rocket.classes.add(menu, `mod-menu _mod-type-${type} _mod-reveal-${reveal}`);

            if (!Rocket.exists(menu.querySelector('.mod-menu-close-link'))) {
               let closeLink = document.createElement('a');

               Rocket.classes.add(closeLink, 'mod-menu-close-link');
               closeLink.href = '';
               closeLink.innerHTML = closeText;
               menu.appendChild(closeLink);
            }
      }

      return {
         menu,
         close: menuClose,
         open: () => {
            menuOpen(target);
         }
      };
   }

   // Execute
   globalSetup();
   return {init};
})();

// Module execution
Rocket.menu = RockMod_Menu.init;
