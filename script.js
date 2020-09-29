// ==UserScript==
// @name         List Github Repository Projects
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://github.com/orgs/*/dashboard
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function (){
    var url = window.location.href.match(/https:\/\/github.com\/orgs\/(.*)\/dashboard/)[1]
    fetch(`https://github.com/orgs/${url}/projects`).then(function(resp){return resp.text()}).then(function (text){return new DOMParser().parseFromString(text, 'text/html')})
        .then(function(doc){
        var boardElements = doc.getElementsByClassName('col-12 col-md-6 col-lg-4 pr-2 float-left');
        var div = document.createElement('div');
        div.setAttribute('class', 'mb-3');
        div.innerHTML = "<h2 class=\"f4 hide-sm hide-md f5 mb-1 d-flex flex-justify-between flex-items-center\" style=\"padding-bottom:15px\">Projects</h2>";
        for(var element of [...boardElements]){
            element.style = 'width: 100%; display:block; margin-bottom:30px';
            div.append(element);
        }
        document.getElementById('org_your_repos').append(div);

    });
})();