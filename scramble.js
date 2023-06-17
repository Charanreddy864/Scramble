
var yes = new Audio("Audio/yes.mp3");
var index2=8;
var umai=new Audio("Audio/umai.mp3");
var box=document.getElementsByClassName("board")[0];
// Making intial State
for(var i=1;i<9;i++)
{
  var imgElement=document.createElement("img");
  var source="Images/img"+i+".jpg";
  imgElement.src=source;
  imgElement.classList.add("piece");
  box.appendChild(imgElement);
}
var empty=document.createElement("img");
empty.classList.add("piece");
empty.src="Images/empty.jpg";
box.appendChild(empty);
// Creating array of correct positions
var pieces = document.querySelectorAll(".piece");
var array1=[];
for(var i=0;i<9;i++)
{
  array1.push((pieces[i].src).substring(pieces[i].src.length - 8));
}
var array2=array1.slice();
// Shuffling the pieces
for(var i=0;i<100;i++)
{
  var size=Math.sqrt(pieces.length);
  var row=Math.floor(index2/size);
  var col=index2%size;
  var options=[];
  if(col !== 0)
  {
    options.push("left");
  }
  if(col !== 2)
  {
    options.push("right");
  }
  if(row !== 0)
  {
    options.push("up");
  }
  if(row !== 2)
  {
    options.push("down");
  }
  var move=options[Math.floor(Math.random() * options.length)];
  if(move == "right")
  {
    var index1=index2 + 1;
    var temp=pieces[index1].src;
    pieces[index1].src=pieces[index2].src;
    pieces[index2].src=temp;
  }
  else if(move == "left")
  {
    var index1=index2 - 1;
    var temp=pieces[index1].src;
    pieces[index1].src=pieces[index2].src;
    pieces[index2].src=temp;
  }
  else if(move == "up")
  {
    var index1=index2 - 3;
    var temp=pieces[index1].src;
    pieces[index1].src=pieces[index2].src;
    pieces[index2].src=temp;
  }
  else
  {
    var index1=index2 + 3;
    var temp=pieces[index1].src;
    pieces[index1].src=pieces[index2].src;
    pieces[index2].src=temp;
  }
  var temp=array2[index1];
  array2[index1]=array2[index2];
  array2[index2]=temp;
  index2=index1;
}

// Buttons
var but=document.getElementById('restart');
but.addEventListener("click",function()
{
  for(var i=0;i<100;i++)
  {
    var size=Math.sqrt(pieces.length);
    var row=Math.floor(index2/size);
    var col=index2%size;
    var options=[];
    if(col !== 0)
    {
      options.push("left");
    }
    if(col !== 2)
    {
      options.push("right");
    }
    if(row !== 0)
    {
      options.push("up");
    }
    if(row !== 2)
    {
      options.push("down");
    }
    var move=options[Math.floor(Math.random() * options.length)];
    if(move == "right")
    {
      var index1=index2 + 1;
      var temp=pieces[index1].src;
      pieces[index1].src=pieces[index2].src;
      pieces[index2].src=temp;
    }
    else if(move == "left")
    {
      var index1=index2 - 1;
      var temp=pieces[index1].src;
      pieces[index1].src=pieces[index2].src;
      pieces[index2].src=temp;
    }
    else if(move == "up")
    {
      var index1=index2 - 3;
      var temp=pieces[index1].src;
      pieces[index1].src=pieces[index2].src;
      pieces[index2].src=temp;
    }
    else
    {
      var index1=index2 + 3;
      var temp=pieces[index1].src;
      pieces[index1].src=pieces[index2].src;
      pieces[index2].src=temp;
    }
    var temp=array2[index1];
    array2[index1]=array2[index2];
    array2[index2]=temp;
    index2=index1;
  }
  score=0;
  document.getElementById('score').innerHTML=score;
})

// Adding eventlisteners
for(var i=0;i<pieces.length;i++)
{
  pieces[i].addEventListener("click",function()
{
  if(JSON.stringify(array1) === JSON.stringify(array2))
  {
    return;
  }
  var index1=Array.from(pieces).indexOf(this);
  if(canmove(index1,index2))
  {
    var temp1=array2[index1];
    array2[index1]=array2[index2];
    array2[index2]=temp1;
    index2=swap(index1,index2);
    var element=document.getElementById('score');
    var score=element.innerHTML;
    ++score;
    document.getElementById('score').innerHTML=score;
    if(JSON.stringify(array1) === JSON.stringify(array2))
    {
      gameover(score);
    }
  }
});
}
function canmove(index1,index2)
{
  var size=Math.sqrt(pieces.length);
  var row1=Math.floor(index1/size);
  var col1=index1%size;
  var row2=Math.floor(index2/size);
  var col2=index2%size;
  return(
  (Math.abs(row1-row2) === 1 && Math.abs(col1-col2) === 0) ||
  (Math.abs(row1-row2) === 0 && Math.abs(col1-col2) === 1) );
}
function swap(index1,index2)
{
   var temp=pieces[index1].src;
   pieces[index1].src=pieces[index2].src;
   pieces[index2].src=temp;
   return index1;
}
function gameover(score)
{
   umai.play();
   var popup=document.getElementsByClassName("popup");
   var score1=document.getElementById("score1");
   score1.innerHTML=score;
   popup[0].classList.add("popped");
}
function closepopup()
{
  var popup=document.getElementsByClassName("popup");
  popup[0].classList.remove("popped");
}
function quit()
{
  var quit=new Audio("Audio/Quit.mp3");
  quit.play();
  window.close();
}
