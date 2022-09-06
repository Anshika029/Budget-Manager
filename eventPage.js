var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
        if(isFinite(clickData.selectionText)){
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal},function(){
                    if(newTotal >= budget.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached',
                        message: "UH oh! Looks like you reached the Limit"
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                }
                });
            })
        }
    }
})

