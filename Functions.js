//this is the conway object
function conwayCheck(tab){
    this.old = copy(tab);
    this.current = copy(tab);
    this.x = 0;
    this.y = 0;
}

//this will set the conway array to the n 
conwayCheck.prototype.restart = function(n){
    isRunning = false;
    this.old = copy(n);
    this.current = copy(n);
}

conwayCheck.prototype.clear = function(){
    for(let t = 0; t < this.current.length; t++){
        this.current[t][2] = false;
        this.old[t][2] = false;
    }
    isRunning = false;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

conwayCheck.prototype.random = function(){
        for(i = 0; i < this.current.length; i++){
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            let r = Math.ceil(Math.random() * 2) == 1 ? true : false;
            this.current[i][2] = r;
            this.old[i][2] = r;
            if(Conway.old[i][2]){
                ctx.fillStyle = blockColor;
                ctx.fillRect(this.old[i][0], this.old[i][1], dimensions, dimensions);
            }
        }
}

conwayCheck.prototype.mouse = function(x, y, c, d, e, m){
    this.x = x;
    this.y = y;
    if(!isRunning){
        if(mouse){
            for(b = 0; b < this.current.length; b++){
                if(square){
                    if(x > this.current[b][0] - m && x < this.current[b][0] + dimensions + m && y > this.current[b][1] - m && y < this.current[b][1] + dimensions + m)
                    {
                        this.current[b][2] = e;
                    }
                }else{
                    if(Math.sqrt(Math.pow((this.current[b][0] - x), 2) + Math.pow((this.current[b][1] - y), 2)) < m
                    || Math.sqrt(Math.pow((this.current[b][0] + dimensions - x), 2) + Math.pow((this.current[b][1] - y), 2)) < m 
                    || Math.sqrt(Math.pow((this.current[b][0] - x), 2) + Math.pow((this.current[b][1] + dimensions - y), 2)) < m
                    || Math.sqrt(Math.pow((this.current[b][0] + dimensions - x), 2) + Math.pow((this.current[b][1] + dimensions - y), 2)) < m)
                    {
                        this.current[b][2] = e;
                    }
                }
            }
            this.old = copy(this.current);
        }
    }
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if(grid){
        ctx.fillStyle = gridColor;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    for(b = 0; b < this.current.length; b++){
        if(this.current[b][2]){
            c.fillStyle = blockColor;
            c.fillRect(this.current[b][0], this.current[b][1], d, d);
        }else{
            if(grid){
                ctx.clearRect(this.current[b][0], this.current[b][1], d, d);
            }
        }
    }
    if(!isRunning){
        ctx.fillStyle = mouseColor;
        if(square){
            ctx.fillRect(Conway.x - outerMousePosition, Conway.y - outerMousePosition, outerMousePosition * 2, outerMousePosition * 2)
        }else{
            ctx.beginPath();
            ctx.arc(Conway.x,Conway.y,outerMousePosition,0,2*Math.PI);
            ctx.fill();
        }
    }
}

conwayCheck.prototype.update = function (w, h){
    let updateTime = Date.now();
    for(k = 0; k < this.current.length; k++){
        let squr = [];
        let count = 0;
        let left = false;
        let top = false;
        let right = false;
        let bottom = false;
        

        if(this.old[k][0] == 0){
            left = true;
        }
        else if(this.old[k][0] == this.old[w - 1][0]){
            right = true;
        }

        if(this.old[k][1] == 0){
            top = true;
        }
        else if(this.old[k][1] == this.old[h * w - 1][1]){
            bottom = true;
        }

        if(!top && !left)squr.push(this.old[k - w - 1][2]);
        if(!top)squr.push(this.old[k - w][2]);
        if(!top && !right)squr.push(this.old[k - w + 1][2]);
        if(!left)squr.push(this.old[k - 1][2]);
        if(!right)squr.push(this.old[k + 1][2]);
        if(!bottom && !left)squr.push(this.old[k + w - 1][2]);
        if(!bottom)squr.push(this.old[k + w][2]);
        if(!bottom && !right)squr.push(this.old[k + w + 1][2]);

        for(let j = 0; j < squr.length; j++){
            if(!squr[j])  squr[j] = false;
            if(squr[j])  count++;
        }

        let res = false;
        if(this.old[k][2] == true){
            switch(count){
                case 2:
                case 3:
                    res = true;
                break;
                default:
                    res = false;
            }
        }else{
            if(count == 3){
                res = true;
            }
        }
        this.current[k][2] = res;
    }
    this.old = copy(this.current);
    console.log("Updating took " + (Date.now() - updateTime) + " Milleseconds")
}

function copy(arr){
    return JSON.parse(JSON.stringify(arr));
}