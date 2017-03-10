/*
Author: Chris Humboldt
*/

// Extend Rocket
Rocket.defaults.menu = {
   closeText: 'close',
   reveal: 'left',
   type: 'slide'
};

// Module
module RockMod_Menu {
   // Variables
   const _RD = Rocket.defaults.menu;
   const reveals = ['_r-left', '_r-right'];
   const types = ['_t-mini', '_t-slide'];

   // Functions
   const menu = {
      close: (callback = null) => {
         let openMenu = Rocket.dom.element('.rocket-menu._reveal');

         Rocket.classes.remove(Rocket.dom.html, 'rme-reveal');
         if (Rocket.exists(openMenu) && Rocket.is.element(openMenu)) {
            Rocket.overlay.hide();
            Rocket.classes.remove(openMenu, '_reveal');
         }
         if (Rocket.is.function(callback)) { return callback(); }
      },
      globalSetup: () => {
         Rocket.event.add(Rocket.dom.element('#rocket-overlay'), 'click', menu.close);
      },
      setup: options => {
         const thisMenu = Rocket.dom.element(options.target);
         const triggers = Rocket.dom.select(options.triggers);

         // Catch
         if (!Rocket.is.element(thisMenu) || triggers.length < 1 || types.indexOf(`_t-${options.type}`) < 0) { return false; }

         // Continue
         function menuShow(event = null) {
            if (event) { event.preventDefault(); }

            menu.close(() => {
               Rocket.overlay.show();
               Rocket.classes.add(Rocket.dom.html, 'rme-reveal');
               Rocket.classes.add(thisMenu, '_reveal');
            });
         }

         Rocket.classes.remove(thisMenu, reveals.concat(types));
         switch(options.type) {
            case 'mini':
               Rocket.classes.add(thisMenu, `rocket-menu _t-${options.type}`);

               // Close link
               if (!Rocket.exists(thisMenu.querySelector('a.rme-close-link'))) {
                  let closeUL = document.createElement('ul');
                  let closeLI = document.createElement('li');
                  let closeLink = document.createElement('a');

                  Rocket.classes.add(closeUL, 'close-list');

                  Rocket.classes.add(closeLink, 'rme-close-link');
                  closeLink.href = '';
                  closeLink.innerHTML = options.closeText;

                  closeLI.appendChild(closeLink);
                  closeUL.appendChild(closeLI);
                  thisMenu.appendChild(closeUL);
               }
               break;

            case 'slide':
               Rocket.classes.add(thisMenu, `rocket-menu _t-${options.type} _r-${options.reveal}`);

               // Close link
               if (!Rocket.exists(thisMenu.querySelector('a.rme-close-link'))) {
                  let closeLink = document.createElement('a');
                  Rocket.classes.add(closeLink, 'rme-close-link');
                  closeLink.href = '';
                  closeLink.innerHTML = options.closeText;
                  thisMenu.appendChild(closeLink);
               }
               break;
         }

         // Menu links
         const menuLinks = thisMenu.querySelectorAll('a');
         for (let menuLink of menuLinks) {
            Rocket.event.add(menuLink, 'click', event => {
               if (Rocket.has.class(event.currentTarget, 'rme-close-link')) { event.preventDefault(); }
               menu.close();
            });
         }

         for (let trigger of triggers) {
            Rocket.event.add(trigger, 'click', menuShow);
         }

         return {
            close: menu.close,
            menu: thisMenu,
            show: menuShow
         }
      }
   };

   // Initialiser
   export function init(uOptions) {
      // Options
      if (!Rocket.is.object(uOptions)) { uOptions = {}; }
      const options = {
         closeText: Rocket.helper.setDefault(uOptions.closeText, _RD.closeText),
         reveal: Rocket.helper.setDefault(uOptions.reveal, _RD.reveal),
         triggers: Rocket.helper.setDefault(uOptions.triggers, ''),
         target: Rocket.helper.setDefault(uOptions.target, ''),
         type: Rocket.helper.setDefault(uOptions.type, _RD.type)
      };

      return menu.setup(options);
   }

   // Menu setup
   menu.globalSetup();
}

// Bind to Rocket
Rocket.menu = RockMod_Menu.init;
