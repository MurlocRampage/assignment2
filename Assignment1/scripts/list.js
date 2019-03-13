fetch('/getListdata').then(function(res){
    return res.json();
}).then(function(entries){
    entries.entries.forEach(function(entry){
        document.getElementById("favoriteList").innerHTML += entry.Like + "<br>" + entry.Why + "<br>" + entry.Creator + "<br>";
    });
});