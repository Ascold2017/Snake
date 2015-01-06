function handler(t){var e={LEFT:37,UP:38,RIGHT:39,DOWN:40};switch(t.keyCode){case e.LEFT:s.move("left");break;case e.UP:s.move("up");break;case e.RIGHT:s.move("right");break;case e.DOWN:s.move("down")}}var scores=document.getElementById("scores"),speed=document.getElementById("speed"),gameOver=document.getElementById("gameOver"),gameOverMes=document.getElementById("gameOverMes");window.addEventListener("keydown",handler,!1),window.addEventListener("keypress",handler,!1),window.addEventListener("keyup",handler,!1);var game={points:0,levelPoints:0,level:1,levelUp:function(){5===this.levelPoints&&(this.level+=1,this.levelPoints=0,clearInterval(world.timerS),world.snakeSpeed=.8*world.snakeSpeed,world.tikS())},gameOver:function(){clearInterval(world.timerS),clearInterval(world.timerP),gameOver.style.display="block",gameOverMes.innerHTML="<h2>Вы проиграли</h2> <h2>Набрано очков: "+game.points+"</h2> <h2>Уровень: "+game.level+"</h2>"}},world={canvas:document.getElementById("canvas"),ctx:canvas.getContext("2d"),slot:20,snakeSpeed:300,width:500,height:600,clear:function(){this.ctx.clearRect(0,0,500,600)},tikS:function(){this.timerS=setInterval(this.stepS,this.snakeSpeed)},stepS:function(){s.generation(),s.crash(),s.collisions(),game.levelUp(),scores.innerHTML="<h2>Очки: "+game.points,0/0,speed.innerHTML="<h2>Уровень: "+game.level,0/0,s.changeStatus()},tikP:function(){this.timerP=setInterval(this.stepP,2e3)},stepP:function(){p.generation()}},sumVec=function(t,e){var s=t[0]+e[0],o=t[1]+e[1],l=[s,o];return l},minusVec=function(t,e){var s=t[0]+e[0],o=t[1]+e[1],l=[s,o];return l},random=function(t,e){var s=Math.floor(Math.random()*(e-t+1))+t;return 20*Math.floor(s/20)},randomVec=function(){var t=random(20,world.width-20),e=random(20,world.height-20),s=[t,e];return s},Points=function(){this.slots=[[-20,20]],this.length=this.slots.length,this.interval=2e3};Points.prototype.draw=function(){for(var t=0;t<=this.slots.length-1;t++)if(this.slots[t]){var e=this.slots[t];world.ctx.fillRect(e[0],e[1],world.slot,world.slot)}},Points.prototype.generation=function(){this.slots&&this.slots.length>5&&this.slots.pop();var t=randomVec();this.slots.unshift(t)};var headLeft=function(t,e,s,o){world.ctx.beginPath(),world.ctx.arc(t+o,e+o,o,1*Math.PI,1.5*Math.PI,!1),world.ctx.lineTo(t+s,e),world.ctx.lineTo(t+s,e+s),world.ctx.arc(t+o,e+s-o,o,.5*Math.PI,1*Math.PI,!1),world.ctx.closePath(),world.ctx.fillStyle="red",world.ctx.fill()},headRight=function(t,e,s,o){world.ctx.beginPath(),world.ctx.moveTo(t,e),world.ctx.lineTo(t+s-o,e),world.ctx.arc(t+s-o,e+o,o,1.5*Math.PI,2*Math.PI,!1),world.ctx.arc(t+s-o,e+s-o,o,2*Math.PI,.5*Math.PI,!1),world.ctx.lineTo(t,e+s),world.ctx.closePath(),world.ctx.fillStyle="red",world.ctx.fill()},headUp=function(t,e,s,o){world.ctx.beginPath(),world.ctx.arc(t+o,e+o,o,1*Math.PI,1.5*Math.PI,!1),world.ctx.arc(t+s-o,e+o,o,1.5*Math.PI,2*Math.PI,!1),world.ctx.lineTo(t+s,e+s),world.ctx.lineTo(t,e+s),world.ctx.closePath(),world.ctx.fillStyle="red",world.ctx.fill()},headDown=function(t,e,s,o){world.ctx.beginPath(),world.ctx.lineTo(t,e),world.ctx.lineTo(t+s,e),world.ctx.arc(t+s-o,e+s-o,o,2*Math.PI,.5*Math.PI,!1),world.ctx.arc(t+o,e+s-o,o,.5*Math.PI,1*Math.PI,!1),world.ctx.closePath(),world.ctx.fillStyle="red",world.ctx.fill()},box=function(t,e,s,o){world.ctx.beginPath(),world.ctx.arc(t+o,e+o,o,1*Math.PI,1.5*Math.PI,!1),world.ctx.arc(t+s-o,e+o,o,1.5*Math.PI,2*Math.PI,!1),world.ctx.arc(t+s-o,e+s-o,o,2*Math.PI,.5*Math.PI,!1),world.ctx.arc(t+o,e+s-o,o,.5*Math.PI,1*Math.PI,!1),world.ctx.closePath(),world.ctx.fillStyle="black",world.ctx.fill()},Snake=function(){this.slots=[[60,200],[40,200],[20,200]],this.length=this.slots.length,this.vec=[20,0],this.status="right"};Snake.prototype.generation=function(){this.slots.pop();var t=sumVec(this.slots[0],this.vec);this.slots.unshift(t)},Snake.prototype.draw=function(){for(var t=1;t<=this.slots.length-1;t++){var e=this.slots[t];box(e[0]+1,e[1]+1,18,5)}var s=this.slots[0];"left"===this.status&&headLeft(s[0]+1,s[1]+1,18,5),"right"===this.status&&headRight(s[0]+1,s[1]+1,18,5),"up"===this.status&&headUp(s[0]+1,s[1]+1,18,5),"down"===this.status&&headDown(s[0]+1,s[1]+1,18,5)},Snake.prototype.move=function(t){"left"===t&&"right"!=this.status&&(this.vec=[-20,0],this.nextStatus="left"),"right"===t&&"left"!=this.status&&(this.vec=[20,0],this.nextStatus="right"),"up"===t&&"down"!=this.status&&(this.vec=[0,-20],this.nextStatus="up"),"down"===t&&"up"!=this.status&&(this.vec=[0,20],this.nextStatus="down")},Snake.prototype.changeStatus=function(){"left"===this.nextStatus&&(this.status="left"),"right"===this.nextStatus&&(this.status="right"),"up"===this.nextStatus&&(this.status="up"),"down"===this.nextStatus&&(this.status="down")},Snake.prototype.collisions=function(){for(var t=0;t<=p.slots.length-1;t++){var e=this.slots[0];if(p.slots[t]){var s=p.slots[t];e[0]===s[0]&&e[1]===s[1]&&(p.slots.splice(t,1),this.omnomnom())}}},Snake.prototype.crash=function(){for(var t=1;t<=this.slots.length-1;t++){var e=this.slots[0],s=this.slots[t];e[0]===s[0]&&e[1]===s[1]&&game.gameOver()}},Snake.prototype.omnomnom=function(){var t=this.slots[this.slots.length-1];newSlot=minusVec(t,this.vec),this.slots.push(newSlot),game.points+=1,game.levelPoints+=1},Snake.prototype.teleport=function(){var t=this.slots[0];t[0]<0&&(t[0]=world.width),t[0]>world.width&&(t[0]=0),t[1]<0&&(t[1]=world.height),t[1]>world.height&&(t[1]=0)};var s=new Snake,p=new Points;world.tikS(),world.tikP();var render=function(){requestAnimationFrame(render),world.clear(),s.draw(),p.draw(),s.teleport()};render();