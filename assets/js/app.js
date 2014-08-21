// var name, amount = 0, total = 0;
// 
// window.renderShoppingList = function(shoppingList) {
//   // empty out wrapper
// 
//   // For each item in our JSON, add a list item
//   // $.each(window.shoppingList.category, function(department) {
//     // Re-draw each of the lists with the new data
//     // create a column, set the name to the department name
// 
// 
//   //   var $parent = $("." + category);
//   //   console.log(category);
// 
//   // });
// 
//     var $parent = $("." + shoppingList.category);
//     // window.shoppingList = shoppingList;
//     var name = shoppingList.name,
//         amount = shoppingList.amount;
// 
//     // A list of product name and amount
//     itemList = $("<div/>", {
//       "class": "item-list clearfix"
//     }).appendTo($parent);
// 
//     // Name of the product
//     $("<div/>", {
//       "class": "item-name col-md-7 pull-left",
//       "text": name
//     }).appendTo(itemList);
// 
//     // Name of the price
//     $("<div/>", {
//       "class": "item-price col-md-3 pull-left",
//       "text": "$" + amount
//     }).appendTo(itemList);
// 
//     // Remove button
//     $("<div/>", {
//       "class": "remove-item pull-right",
//       "text": "remove",
//       click: function() {
//         // amount to be removed
//         var price_value = $(this).siblings(".item-price").html();
//         var price = parseFloat(price_value.replace("$", ""));
//         total = total - price * 1.10;
//         $(".price-summary").html("Total: $" + total.toFixed(2));
//         // remove this item list
//         $(this).parent().remove();
//       }
//     }).appendTo(itemList);
// 
// 
//     // Draggable
//     itemList.draggable({
//       revert: "invalid",
//       revertDuration: 200
//     });
// }
// 
// window.renderDepartmentOptions = function(category) {
//   // var $departmentSelector = $('.' + category);
//   // $departmentSelector.empty()
//   // $.each(window.shoppingList.departments, function(department) {
//   //   var $option = $('<option value="' + department.name + '">' + department.name + '</option>')
//   //   $departmentSelector.append($option);
//   // });
// };
// 
// window.addToShoppingList = function(category, name, amount) {
//   // Add the item to window.shoppingList
//   // Submit post request
// 
// }
// 
// window.deleteShoppingList = function(category, name, amount) {
// 
// }
// 
// 
// // jQuery Ajax call for JSON
// $.getJSON(ApiEndpoints.index, function(shoppingList) {
//   window.shoppingList = shoppingList;
// 
//   for(var i = 0; i < shoppingList.length; i++) {
//     renderShoppingList(shoppingList[i]);
//   }
// 
//   // renderDepartmentOptions();
//   // renderShoppingList();
// });
// 
// $(function() {
//   $(".shopping-container").droppable({
//     drop: function(event, ui) {
//       // Snap dropped element
//       $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
//     },
//     revert: "valid",
//     revertDuration:200
//   });
// 
//   // Add item to category
//   $(".action-form").submit(function(e) {
//     e.preventDefault();
// 
//     // Get the selected product category
//     var category = $("select[name='item-type'] option:selected").val();
// 
//     // Create list
//     createListElement(category);
//   });
// 
//   // Clear all items from the list
//   $(".remove").click(function() {
//     $(".item-list").remove();
//     total = 0;
//     $(".price-summary").html("Total: $" + total.toFixed(2));
//   });
// });
