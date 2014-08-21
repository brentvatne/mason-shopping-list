$(function() {
  var departments = [ "produce", "grocery", "dairy", "meat", "other" ]

  var $list = $('.list-wrapper');

  // Save a reference to all of the department elements, indexed by
  // the department name
  //
  var $departments = {};
  $.each(departments, function(key, departmentName) {
    var $department = $("[data-category='" + departmentName + "']");
    $departments[departmentName] = $department;
  });

  var renderItems = function(items) {
    $.each(items, function(i, item) {
      renderItem(item);
    });
  }

  var renderItem = function(item) {
    var name = item.name,
        amount = item.amount,
        $department = $departments[item.category];

    // A list of product name and amount
    var itemList = $("<div/>", {
      "class": "item-list clearfix"
    }).appendTo($department);

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
  }

  var createNewItem = function(item) {
    $.post('/items', item, function(savedItem) {
      renderItem(savedItem);
    });
  }

  var getAllItems = function() {
    $.get('/items', function(items) {
      renderItems(items);
    });
  }

  var getNewItemValues = function() {
    name = $("input[name='product_name']").val();
    amount = $("input[name='amount']").val();
    category = $(".department-name-select").val();

    return {
      name: name,
      amount: amount,
      category: category
    };
  }

  // Attach events
  $('.action-form').submit(function(e) {
    e.preventDefault();
    newItem = getNewItemValues();
    createNewItem(newItem);
  });

  // Initialize the app
  getAllItems();
});
