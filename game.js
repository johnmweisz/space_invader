var gameover = 0
var gameCounter = 0
var score = 0

var player = 
{
    left: 600, 
    top: 700
}

var enemies = []	

var missiles = []

function drawPlayer()
{
    position = "";
    position = "<div class='player' style='left: " + player.left + "px; top: " + player.top + "px'></div>";
    document.getElementById("players").innerHTML = position;
}

function drawEnemies()
{
    position = "";
    for(var i = 0; i < enemies.length; i++)
    {
        position += "<div class='enemy' style='left: " + enemies[i].left + "px; top: " + enemies[i].top + "px'></div>";
    }
document.getElementById("enemies").innerHTML = position;
}

function addEnemy()
{
    if(gameCounter % 20 == 0)
    {
        enemies.push({left: (Math.floor(Math.random() * 10) + 1) * 100, top: 25, vleft: -10 + (Math.floor(Math.random() * 9) + 1) * 2, vtop: (Math.floor(Math.random() * 4) + 1)})				
    }
}

function destroyEnemy()
{	
    var mdelete = []
    var edelete = []
    for(var i = 0; i < missiles.length; i++)
    {
        if(missiles[i].top < 50)
        {
            mdelete.push(i);
        }
        else
        {
            for(var x = 0; x < enemies.length; x++)
            {
                if((missiles[i].left < enemies[x].left + 50 && missiles[i].left + 4 > enemies[x].left) && (missiles[i].top < enemies[x].top + 50 && missiles[i].top + 4 > enemies[x].top))
                {
                    edelete.push(x);
                    mdelete.push(i);
                }
            }
        }
    }

    for(var i = 0; i < mdelete.length; i++)
    {
        missiles.splice(mdelete[i],1);
        score -= 5;
    }
    for(var x = 0; x < edelete.length; x++)
    {
        enemies.splice(edelete[x],1);
        score += 10;
    }
    document.getElementById("score").innerHTML = "<b1>SCORE: " +score+ "</b1>";
}


function destroyPlayer()
{
    for(var x = 0; x < enemies.length; x++)
    {
        if((player.left < enemies[x].left + 50 && player.left + 50 > enemies[x].left) && (player.top < enemies[x].top + 50 && player.top + 50 > enemies[x].top))
        {
            gameover = 1;
        }
    }			
}

function drawMissile()
{
    position = "";
    for(var i = 0; i < missiles.length; i++)
    {
        position += "<div class='missile' style='left: " + missiles[i].left + "px; top: " + missiles[i].top + "px'></div>";
    }
document.getElementById("missiles").innerHTML = position;
}

function moveEnemies()
{
    for(var i = 0; i < enemies.length; i++)
    {
        if(enemies[i].top > 750 - 50){
            enemies[i].top = 100;
        }
        if(enemies[i].left > 1200 - 50)
        {
            enemies[i].vleft *= -1;
        }
        if(enemies[i].left < 25)
        {
            enemies[i].vleft *= -1;
        }
        enemies[i].top += enemies[i].vtop;
        enemies[i].left += enemies[i].vleft;
    }
}

function moveMissiles()
{
    for(var i = 0; i < missiles.length; i++)
    {
        missiles[i].top -= 10;
    }
}


document.onkeydown = function(e)
{
    if(e.keyCode == 37 && player.left > 0 + 25)
    {
        player.left -= 20;
    }
    if(e.keyCode == 38 && player.top > 500 + 50)
    {
        player.top -= 20;
    }
    if(e.keyCode == 39 && player.left < 1200 - 50)
    {
        player.left += 20;
    }
    if(e.keyCode == 40 && player.top < 750 - 50)
    {
        player.top += 20;
    }
    if(e.keyCode == 32)
    {
        missiles.push({left: player.left + 23, top: player.top})
        drawMissile()
    }
if(gameover == 0)
{
    drawPlayer()
}
}

function gameRefresh()
{
    if(gameover == 0)
    {
        drawPlayer()
        moveEnemies()
        moveMissiles()
        drawEnemies()
        drawMissile()
        destroyEnemy()
        destroyPlayer()
        addEnemy()
        gameCounter++;
        setTimeout(gameRefresh, 50)
    }
    else
    {
        document.getElementById("world").innerHTML = "<div class='gameover'><h3>Game Over</h3></div>";
    }
}
gameRefresh()
