jQuery(function($) {
    $('#reservation').on('click', function() {
      var $el = $(this),
        textNode = this.lastChild;
      $el.find('svg').toggleClass('bi bi-cart-plus bi-cart-x-fill');
      $el.toggleClass('active');
    });
  });

  