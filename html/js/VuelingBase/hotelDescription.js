window.onload = function ()
{
    var html = document.getElementById('content').innerHTML;
    html = html.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    document.write(html);
}

