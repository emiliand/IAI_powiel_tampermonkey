// ==UserScript==
// @name         Powiel we wszystkich jezykach
// @namespace    demus.pl
// @version      0.1
// @description  Powiel teksty w tabach jezykow
// @author       You
// @match        https://www.demus-zegarki.pl/panel/product-edit.php?idt=*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

function tamperCopyToOther() {
    // setup fields
    var subMenu = '#subTabsId_0TrId';
    var $tabList = $('#subTabsId_0UlId');
    var $tabContent = $(subMenu).find('.tab-content');
    var productName = "input[id*='[productname]']";
    var productDescriptionShort = "textarea[id*='[description]']";
    var productDescriptionLong = "input[id*='tableRowTextEditTabs_container_']";

    // active tab values
    var nazwa = $tabContent.find('.tab-pane.active').find(productName).val();
    var opisK = $tabContent.find('.tab-pane.active').find(productDescriptionShort).val();
    var opisD = $tabContent.find('.tab-pane.active').find(productDescriptionLong).val();

    // clone values into all tab-panes
    $tabContent.find('.tab-pane').each(function(i, item){
        var $item = $(item);
        $item.find(productName).val(nazwa);
        $item.find(productDescriptionShort).val(opisK);
        $item.find(productDescriptionLong).val(opisD);
    });
}


var button = '<li><a href="#" id="tamperCopyToOther" style="background-color: yellowgreen; color: black; font-weight: bold">Powiel we wszystkich jezykach</a></li>';

$(button).appendTo('#mainTabsIdUlId');

$('#tamperCopyToOther').click(function(){
   tamperCopyToOther();

   return false;
});
