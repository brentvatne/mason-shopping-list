//Get the value from the inputs
function getValues() {
  name = $("input[name='product_name']").val();
  amount = $("input[name='amount']").val();
  return {
    purchased_item: function() {
      return name;
    },
    product_amount: function() {
      return amount;
    }
  };
}

// Create list element
function createListElement(category) {
  var parent, item_list, parent, newList;

  parent = $("." + category);
  name = getValues().purchased_item();
  amount = getValues().product_amount();

  newList = {
    'item': name,
    'amount': amount,
    'category': category
  };

  // Input validation: name and amount required
  if(!name && !amount) {
    $("<span></span>", {
      "text": "Please add name and amount of the product."
    }).appendTo("form").fadeIn(9000).fadeOut(3000, function() {
      $(this).remove();
    });
    return;
  }

  // Input validation: amount is numeric
  if(!$.isNumeric(amount) || !amount) {
    $("<span></span>", {
      "text": "Please add amount."
    }).appendTo("form").fadeIn(2000).fadeOut(2000, function() {
      $(this).remove();
    });
    return;
  }

  // Input validation: name is given
  if(!name) {
    $("<span></span>", {
      "text": "Please add name of the product."
    }).appendTo("form").fadeIn(2000).fadeOut(2000, function() {
      $(this).remove();
    });
    return;
  }

  // A list of product name and amount
  itemList = $("<div/>", {
    "class": "item-list clearfix"
  }).appendTo(parent);

  // Name of the product
  $("<div/>", {
    "class": "item-name col-md-7 pull-left",
    "text": name
  }).appendTo(itemList);

  // Name of the price
  $("<div/>", {
    "class": "item-price col-md-3 pull-left",
    "text": "$" + amount.toString()
  }).appendTo(itemList);

  // Remove button
  $("<div/>", {
    "class": "remove-item pull-right",
    "text": "remove",
    click: function() {
      // amount to be removed
      var price_value = $(this).siblings(".item-price").html();
      var price = parseFloat(price_value.replace("$", ""));
      total = total - price * 1.10;
      $(".price-summary").html("Total: $" + total.toFixed(2));
      // remove this item list
      $(this).parent().remove();
    }
  }).appendTo(itemList);


  var request = $.ajax({
    type:'POST',
    data: newList,
    url: ApiEndpoints.update,
    dataType: 'JSON',
    crossDomain: true,
    success: function(data, status) {
      console.log(data);
    }
  });

  request.done(function(msg) {
    // Reset the form
    name = $("input[name='product_name']").val("");
    amount = $("input[name='amount']").val("");
    alert("Successfully posted the data.");
  });

  request.fail(function(msg) {
    alert("The request has failed.");
  });

  // Append total value to the price summary area
  total = total + parseFloat(amount) * 1.10;
  $(".price-summary").html("Total: $" + total.toFixed(2));

  // Draggable
  itemList.draggable({
    revert: "invalid",
    revertDuration: 200
  });
}
