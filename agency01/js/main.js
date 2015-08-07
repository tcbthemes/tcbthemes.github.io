 $('document').ready(function () {
     $('.filter').on('click', function (e) {
         e.preventDefault();
     });
     $('#Container').mixItUp();

     $('.work-slider').magnificPopup({
         delegate: 'a.pop-img', // child items selector, by clicking on it popup will open
         type: 'image',
         gallery: {
             enabled: true
         }
         // other options
     });

     $('.nav-btn').on('click',function(){
        $('.nav-list').toggleClass('open');
     });
     
     /* Navigation menu sticky after certain scrolling*/
     var stickyNavTop = $('nav.main-menu').offset().top;
     var stickyNav = function () {
         var scrollTop = $(window).scrollTop();
         console.log(scrollTop);
         if (scrollTop - 100 > stickyNavTop) {
             $('nav.main-menu').addClass('sticky');
         } else {
             $('nav.main-menu').removeClass('sticky');
         }
     };
     stickyNav();
     $(window).scroll(function () {
         stickyNav();
     });

     // Simple elevator usage.
     var elementButton = document.querySelector('.elevator');
     var elevator = new Elevator({
         element: elementButton
     });


     //down arrow animation
     $('.arrow-down').click(function (e) {
         var href = $(this).attr("href"),
             offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
         $('html, body').stop().animate({
             scrollTop: offsetTop
         }, 300);
         e.preventDefault();
     });

     var lastId,
         topMenu = $(".spy-nav"),
         topMenuHeight = topMenu.outerHeight() + 15,
         // All list items
         menuItems = topMenu.find("a"),
         // Anchors corresponding to menu items
         scrollItems = menuItems.map(function () {
             var item = $($(this).attr("href"));
             if (item.length) {
                 return item;
             }
         });

     // Bind click handler to menu items
     // so we can get a fancy scroll animation
     menuItems.click(function (e) {
         var href = $(this).attr("href"),
             offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
         $('html, body').stop().animate({
             scrollTop: offsetTop
         }, 300);
         e.preventDefault();
     });

     // Bind to scroll
     $(window).scroll(function () {
         // Get container scroll position
         var fromTop = $(this).scrollTop() + topMenuHeight;

         // Get id of current scroll item
         var cur = scrollItems.map(function () {
             if ($(this).offset().top < fromTop)
                 return this;
         });
         // Get the id of the current element
         cur = cur[cur.length - 1];
         var id = cur && cur.length ? cur[0].id : "";

         if (lastId !== id) {
             lastId = id;
             // Set/remove active class
             menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#" + id + "]").parent().addClass("active");
         }
     });

 });
