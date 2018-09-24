function expandCollapse(){
  let detail = document.getElementsByClassName('detail-label');
  let arrow = document.getElementsByClassName('arrow');

  for(let i =0; i < detail.length; i++ ){
    let arrows = arrow[i];
    
    detail[i].addEventListener('click',function(e){
      var target = e.target;
      var panelInfo = this.nextElementSibling;
      var openEl = document.getElementsByClassName('open')[0];

      if(openEl !== undefined){
        openEl.classList.remove("open");
      }

      if(panelInfo.style.display === "block"){
        openEl.classList.remove("open");
        panelInfo.style.display = "none";
        arrows.src = 'assets/arrow-collapsed.png'
      }else{
        panelInfo.classList.add('open')
        arrows.src = 'assets/arrow-expanded.png'
      }
    });
  }
}

function colorSwatchSwap(){
  let colorSwatch = document.getElementsByClassName('color'),
      heroImage = document.getElementById('main-image').children[0],
      imageMap = {
        'first':'assets/product-large-a.jpg',
        'second':'assets/product-large-b.jpg',
        'third':'assets/product-large-c.jpg',
        'fourth':'assets/product-large-d.jpg',
      }

  let productName = document.getElementById('product-name');

  for(let i =0; i < colorSwatch.length; i++ ){
    colorSwatch[i].addEventListener('click',function(e){
      let target = e.target;
      let selected = document.getElementsByClassName("selected")[0];
      if(selected){
        selected.classList.remove("selected");
      }
      target.classList.add("selected");

      if(target.classList.contains('first')){
        heroImage.src = imageMap['first'];
        productName.innerHTML = "Williams-Sanoma Classic Apron, French Blue";
      } else if(target.classList.contains('second')){
        heroImage.src = imageMap['second'];
        productName.innerHTML = "Williams-Sanoma Classic Apron, Black Stripes";
      }else if(target.classList.contains('third')){
        heroImage.src = imageMap['third'];
        productName.innerHTML = "Williams-Sanoma Classic Apron, Green Stripes";
      } else if(target.classList.contains('fourth')){
        heroImage.src = imageMap['fourth'];
        productName.innerHTML = "Williams-Sanoma Classic Apron, Red Stripes";
      }
    });
  }
}

function addToCart(){
  let ATC = document.getElementById('add-to-cart'),
      modal = document.getElementsByClassName('modal-overlay')[0],
      productPrice = document.getElementById('product-price').children[0],
      subtotalDiv = document.getElementsByClassName('subtotal')[0],
      itemQty = document.getElementById('product-qty').children[0],
      selected = document.getElementsByClassName("selected")[0],
      itemPrice = document.getElementsByClassName("item-price")[0],
      qty = document.getElementsByClassName("qty")[0],
      cartQtyEle = document.getElementById("cartQty"),
      cartQty,
      cart;

  ATC.addEventListener('click',function(){
    modal.classList.add('show-modal');
    cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : 0;
    carQty = (JSON.parse(localStorage.getItem('cartQty')) != null) ? JSON.parse(localStorage.getItem('cartQty')) : 0;

    //update cart quantity
    window.localStorage.setItem('cartQty', parseInt(document.getElementById('product-qty').children[0].value)  + carQty);
    carQtyUpdated = JSON.parse(localStorage.getItem('cartQty'));

    //populate cart elements in modal
    cartQtyEle.innerHTML = 'You have ' + carQtyUpdated  + ' item(s) in cart.';
    subtotalDiv.innerHTML = '$' + parseFloat((productPrice.innerHTML.replace('$','') * itemQty.value) + cart).toFixed(2);
    itemPrice.innerHTML = productPrice.innerHTML.replace('$','');
    qty.innerHTML = itemQty.value;

    //update cart
    window.localStorage.setItem('cart', parseFloat((productPrice.innerHTML.replace('$','') * itemQty.value) + cart));

    //show chosen item in cart
    if(selected){
      document.getElementsByClassName('cart-item-img')[0].src = document.getElementById('main-image').children[0].src;
    }
  });

  modal.addEventListener('click',function(){
    modal.classList.remove('show-modal');
  });
}

function domReady () {
  document.body.className += " javascript";
  expandCollapse();
  colorSwatchSwap();
  addToCart();
}

// Mozilla, Opera, Webkit
if ( document.addEventListener ) {
  document.addEventListener( "DOMContentLoaded", function(){
    document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
    domReady();
  }, false );

// If IE event model is used
} else if ( document.attachEvent ) {
  // ensure firing before onload
  document.attachEvent("onreadystatechange", function(){
    if ( document.readyState === "complete" ) {
      document.detachEvent( "onreadystatechange", arguments.callee );
      domReady();
    }
  });
}
