$(function() {
  var departments = ["produce", "grocery", "dairy", "meat", "other"];
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
  };

  var renderItem = function(item) {
    var name = item.name,
        amount = item.amount,
        $department = $departments[item.category];

    // A list of product name and amount
    var $itemList = $("<div/>", {
      "class": "item-list clearfix"
    }).appendTo($department);

    // Name of the product
    $("<div/>", {
      "class": "item-name col-md-7 pull-left",
      "text": name
    }).appendTo($itemList);

    // Name of the price
    $("<div/>", {
      "class": "item-price col-md-3 pull-left",
      "text": "$" + amount.toString()
    }).appendTo($itemList);

    // Remove button
    $("<div/>", {
      "class": "remove-item pull-right",
      "text": "remove",
      click: function() {
        $itemList.fadeOut('fast', function() { $itemList.remove() });
        deleteItemById(item.id);
      }
    }).appendTo($itemList);

    $itemList.draggable({
      revert: "invalid",
      revertDuration: 200,
      start: function() {
        $itemList.addClass('dragging');
        console.log('started dragging');
      },
      stop: function() {
        $itemList.removeClass('dragging');
        var newCategory = $itemList.parents('.shopping-container').first().data('category')
        updateItemById(item.id, {category: newCategory});
      }
    });

    updateTotal();
  };

  var updateTotal = function() {
    // Find all the amounts on the page, add them together, set the amount
  };

  var updateItemById = function(id, newOptions) {
    $.ajax({
      url: '/items/' + id,
      type: 'PUT',
      data: newOptions,
      success: function(result) {
        console.log(result)
      }
    });
  };

  var deleteItemById = function(id) {
    $.ajax({
      url: '/items/' + id,
      type: 'delete',
      success: function(result) {
        console.log(result)
      }
    });
  };

  var deleteAllItems = function() {
    $.ajax({
      url: '/items/destroy_all',
      type: 'delete',
      success: function(result) {
        console.log(result)
      }
    });
  };

  var createNewItem = function(item) {
    $.post('/items', item, function(savedItem) {
      renderItem(savedItem);
    });
  };

  var getAllItems = function() {
    $.get('/items', function(items) {
      renderItems(items);
    });
  };

  var getNewItemValues = function() {
    name = $("input[name='product_name']").val();
    amount = $("input[name='amount']").val();
    category = $(".department-name-select").val();

    return {
      name: name,
      amount: amount,
      category: category
    };
  };

  // Attach events
  $('.action-form').submit(function(e) {
    e.preventDefault();
    newItem = getNewItemValues();
    createNewItem(newItem);
  });

  $('.remove-all').click(function(e) {
    e.preventDefault();
    $('.item-list').fadeOut(function() { $(this).remove() });
    deleteAllItems();
  });

  $(".shopping-container").droppable({
    drop: function(event, ui) {
      // Snap dropped element
      $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
    },
    revert: "valid",
    revertDuration:200
  });

  // Initialize the app
  getAllItems();
});
