
function resrveButton(event){
    console.log("entered");
    $('#reservation').on('click', function() {
      var $el = $(this),
        textNode = this.lastChild;
      $el.find('svg').toggleClass('bi-cart-plus bi-cart-x-fill');
      $el.toggleClass('active');
    });
}

  