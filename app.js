const canvas = document.querySelector("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const c = canvas.getContext('2d')

// var x = Math.random()*innerWidth
// var y = Math.random()*innerHeight
// var radius = 30;
// var dx =( Math.random()-0.5)*5
// var dy = ( Math.random()-0.5)*5

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize',function(){
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

function Circle(){
    this.colorArray = [
"#393E41",
"#D3D0CB",
"#E7E5DF",
"#44BBA4",
"#E7BB41"
    ]
    this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)]
    this.maxRadius = 20;
    // this.minRadius = Math.random()*10 +1;
    this.minRadius = 0;
    this.radius = this.minRadius;
    this.x = Math.random()*(innerWidth - this.radius*2)+this.radius;
    this.y = Math.random()*(innerHeight - this.radius*2)+this.radius;
    this.dx = ( Math.random()-0.5)*3
    this.dy = ( Math.random()-0.5)*3
     

    this.draw = function(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        c.stroke()
        c.fill()
        c.fillStyle = this.color
    }
    this.update = function(){
        if(this.x + this.radius>window.innerWidth || this.x-this.radius<0){
            this.dx = -this.dx
        }
        if(this.y+ this.radius>window.innerHeight || this.y- this.radius<0){
            this.dy = -this.dy
        }

        this.x+=this.dx
        this.y+=this.dy
        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < this.maxRadius){
            this.radius += 1
        }else if(this.radius > this.minRadius){
            this.radius -=1
        }

        this.draw()
    }
}

var circleArray = []

for(let i = 0; i<1000; i++){
    circleArray.push(new Circle())
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)

    
    // circle.update()
    for(let i of circleArray){
        i.update()
    }

}



animate()