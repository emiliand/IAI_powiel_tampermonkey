// ==UserScript==
// @name         Powiel we wszystkich jezykach
// @namespace    demus.pl
// @version      0.3
// @description  Powiel teksty w tabach jezykow
// @author       You
// @match        https://www.demus-zegarki.pl/panel/product-edit.php?idt=*
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
    var $panes = $tabContent.find('.tab-pane');
    var panesCount = $panes.length;

    // setup status fields
    var tamperStatusBox = '#tamperStatusBox';
    var tamperProductName = '#tamperProductcName';
    var tamperProductShortD = '#tamperProductcShortD';
    var tamperProductLongD = '#tamperProductcLongD';
    var tamperNumberOfTabs = '#tamperNumberOfTabs';

    // active tab values
    var nazwa = $tabContent.find('.tab-pane.active').find(productName).val();
    var opisK = $tabContent.find('.tab-pane.active').find(productDescriptionShort).val();
    var opisD = $tabContent.find('.tab-pane.active').find(productDescriptionLong).val();

    // update statusBox
    $(tamperProductName).text(nazwa);
    $(tamperProductShortD).text(opisK);
    $(tamperProductLongD).text(opisD);
    if (opisD.length > 80) {
        $(tamperProductLongD).text(opisD.substring(0, 80) + ' [...]');
    }
    $(tamperNumberOfTabs).text('0/' + panesCount);
    $(tamperStatusBox).show();


    // clone values into all tab-panes
    var tamperUpdatedTabs = 0;
    $panes.each(function(i, item){
        var $item = $(item);
        var success = true;
        var $elName = $item.find(productName);
        var $elDescShort = $item.find(productDescriptionShort);
        var $elDescLong = $item.find(productDescriptionLong);

        if ($elName.length && $elDescShort.length && $elDescLong.length) {
            $elName.val(nazwa);
            $elDescShort.val(opisK);
            $elDescLong.val(opisD);
            tamperUpdatedTabs += 1;
        }
    });

    // updated number of tabs
    $(tamperNumberOfTabs).text(tamperUpdatedTabs + '/' + panesCount);
    if (panesCount != tamperUpdatedTabs) {
        $(tamperNumberOfTabs).text('!!!!!' + tamperUpdatedTabs + '/' + panesCount + '!!!!!');
    }
}


var button = '<li><a href="#" id="tamperCopyToOther" style="background-color: yellowgreen; color: black; font-weight: bold">Powiel we wszystkich jezykach</a></li>';
var statusBox = '<div id="tamperStatusBox" class="msgWrapper" style="width: 90%; max-width: auto; padding: 15px 0 0 0; display: none">' +
    '<div class="alert alert-block alert-info">' +
    '<div style="display: table;">' +
    '<div class="message">' +
    '<strong>Skopiowane dane:</strong><br/>' +
    '<strong>Nazwa: </strong><span id="tamperProductcName"></span><br/>' +
    '<strong>Opis krótki: </strong><span id="tamperProductcShortD"></span><br/>' +
    '<strong>Opis długi: </strong><span id="tamperProductcLongD"></span><br/>' +
    '<strong>Zaktualizowano tabów: </strong><span id="tamperNumberOfTabs">0/0</span>' +
    '</div></div></div></div>';
var mainTabsId = '#mainTabsIdUlId';


$(button).appendTo(mainTabsId);
$(mainTabsId).after(statusBox);

$('#tamperCopyToOther').click(function(){
    tamperCopyToOther();

   return false;
});
