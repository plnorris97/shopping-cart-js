// javascript DOM manipulation/traversing project
// using immediately invoked function expressions to be called when the page loads.

// show cart event
(function(){
	// we're grabbing the two ids cart-info and cart from the index.html
	const cartInfo = document.getElementById('cart-info');
	const cart = document.getElementById('cart');
	// we then add a click event listener with a callback function to show/toggle the cart.
	// from the classList, we know that the cart at its original state is at 0rem width and hidden.
	// then the class of show-cart expands to 18rem and flips in on its Y axis at -360degrees
	cartInfo.addEventListener('click', function(){
		cart.classList.toggle('show-cart');
	});
})();

// add items to the cart
(function(){
	// we assign a variable name to the icon button called cartBtn. then because we are returning
	// all of the icons with the querySelectorAll, we need to do a forEach loop and in the function,
	// place an event listener on each icon button then an if statement to grab the image and place it
	// in the cart 
	const cartBtn = document.querySelectorAll('.store-item-icon');
	cartBtn.forEach(function(btn){
		btn.addEventListener('click', function(event){
			if(event.target.parentElement.classList.contains('store-item-icon')){
			let fullPath = event.target.parentElement.previousElementSibling.src;
			let pos = fullPath.indexOf('img') + 3;
			let partPath = fullPath.slice(pos);

			const item = {};
			item.img = `img-cart${partPath}`;
			let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
			item.name = name;

			let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
			let finalPrice = price.slice(1).trim();
			item.price = finalPrice;

			// console.log(finalPrice);
			// console.log(price);
			//console.log(name);
			// console.log(item);
			

			//Now we want to create a cart item div to hold the items we add to our cart. 
			// so we take the classes of the cart item from the html and recreate them in our new div
			// that will be created. Using the string literal, we define the innerHTML to be placed in the cart
			// as was defined in the html and use template literal expressions to define variables
			const cartItem = document.createElement('div');
			cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
			cartItem.innerHTML = `<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
	            <div class="cart-item-text">

	              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
	              <span>$</span>
	              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
	            </div>
	            <a href="#" id='cart-item-remove' class="cart-item-remove">
	              <i class="fas fa-trash"></i>
	            </a>
	          </div>
	     `;

			// select cart
			// here we are grabbing the cart itself and the cart total container and inserting the 
			// cartItem we created above BEFORE the cart total (so below the list of items in the cart)
			// once the item has been added to the cart you receive an alert saying this was successful.
			const cart = document.getElementById('cart');
			const total = document.querySelector('.cart-total-container');
			cart.insertBefore(cartItem, total);
			alert("Your selection has been added to your cart.");
			showTotals();
			}
		});
	});


	// show totals function
	// we create an empty array for the total because we won't know what that is, then we grab 
	// the item prices by querying the classes of cart-item-price. Then we loop through with forEach each of the 
	// items we get back and push them and their text/numbers into the empty array.
	// using parseFloat, we convert the strings into a number so the string of "10.00" becomes 10.00.
	function showTotals(){
		const total = [];
		const items = document.querySelectorAll('.cart-item-price');

		items.forEach(function(item){
			total.push(parseFloat(item.textContent));
		});

		// using the reduce method, we generate one number, the total money and incrementing the total
		// each time an item is added to the total array. Final money is the final total display which 
		// we set to fixed at 2 decimal places.
		const totalMoney = total.reduce(function(total, item) {
			total += item;
			return total;
		}, 0);
		const finalMoney = totalMoney.toFixed(2);
		
		// here we affect the cart total, item total and item count on the shopping cart as items
		// are added and money is added to the total.
		document.getElementById('cart-total').textContent = finalMoney;
		document.querySelector('.item-total').textContent = finalMoney;
		document.getElementById('item-count').textContent = total.length;
	}

})();


// remove item from cart
// name all cart-item-remove class items trashBtn. then loop through each and add the click event
// 
(function(){
	const trashBtn = document.querySelectorAll('.cart-item-remove');
	const cart = document.getElementById('cart');
	trashBtn.forEach(function(btn) {
		btn.addEventListener('click', function(event) {
		// the click should trigger an alert asking if you really want to remove the item
		// if the cart-item contains the trash can icon, remove the item from the cart array
		// or am I trying to remove a class?
		alert("Do you want to remove this item?");
		
		if(event.target.parentElement.classList.contains('cart-item-remove')) {
		console.log("remove me");
		cart.classList.remove('cart-item');
		console.log(cart);
			
// I think I need to create some template literals

			// const item = {};
			// item.img = `img-cart${}`;
			// let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
			// item.name = name;
			// let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
			// let finalPrice = price.slice(1).trim();
			// 	item.price = finalPrice;
		}
			
		}
	)});
})();