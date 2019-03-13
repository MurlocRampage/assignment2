fetch('/getListData').then(function(res){
    return res.json();
}).then(function(entries){
    console.log(JSON.stringify(entries, null, 4));
    entries.entries.forEach(function(entry){
        document.getElementById("favoriteList").innerHTML += entry.Like + "<br>" + entry.Why + "<br>" + entry.Creator + "<br>";
    });
});