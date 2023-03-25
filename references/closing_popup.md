When you open the pop up, create an invisible div of height width 100%, which lies at the back of your pop-up div.

Attach an onclick function to the div:

```js
document.getElementById('invisibleDiv').onclick = function()
{
    document.getElementById('popup').style.display = 'none'; 
}
```