const string = `
.skin{
    position: fixed;
    background: #FFDB00;
    height: 60vh;
    bottom: 0;
    left: 0;
    width: 100%;
}
.nose{
    position: absolute;
    border: 10px solid #000;
    border-color: #000 transparent transparent;
    border-bottom: none;
    top: 155px;
    left: 50%;
    margin-left: -10px;
}
.nose .noseCircle{
    position: absolute;
    width: 20px;
    height: 8px;
    border: 1px solid #000;
    left: -10px;
    top: -17px;
    border-radius: 10px 10px 4px 4px;
    background: #000;
}
@keyframes wave {
    0%{
        transform: rotate(0);
    }
    25%{
        transform: rotate(15deg);
    }
    50%{
        transform: rotate(0deg);
    }
    75%{
        transform: rotate(-15deg);
    }
    100%{
        transform: rotate(0);
    }
}
.nose:hover{
    transform-origin: 50% 100%; /*调动画的轴*/
    animation: wave 100ms linear infinite;
}
.eye{
    position: absolute;
    width: 64px;
    height: 64px;
    border: 2px solid #000;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background:#2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
    left: 10px;
    top: 3px;
}
.eye.left{
    transform: translateX(-120px);
}
.eye.right{
    transform: translateX(120px);
}
.mouth .up{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 201px;
    margin-left: -50px;
   z-index: 1;
}
.mouth .up{

}
.mouth .up .lip.left{
    width: 100px;
    height: 20px;
    border: 3px solid #000;
    background: #FFDB00;
    border-radius: 0 0 50px 50px;
    border-top-style: none;
    position: absolute;
    transform: rotate(-13deg) translateX(8px);
    left: 50%;
    left: -50px;
}
.mouth .up .lip.left::after{
    content: '';
    width: 5px;
    height: 20px;
    background: #FFDB00;
    position: absolute;
    right: -3px;
    bottom: 4px;
    transform: rotate(15deg);
}
.mouth .up .lip.right{
    background: #FFDB00;
    width: 100px;
    height: 20px;
    border: 3px solid #000;
    border-radius: 0 0 50px 50px;
    border-top-style: none;
    position: absolute;
    transform: rotate(13deg) translateX(-8px);
    left: 50%;

}
.mouth .up .lip.right::after{
    content: '';
    width: 5px;
    height: 20px;
    background: #FFDB00;
    position: absolute;
    left: -3px;
    bottom: 4px;
    transform: rotate(-15deg);
}
.mouth .down{
    width: 150px;
    height: 150px;
    position: absolute;
    left: 50%;
    top: 206px;
    margin-left: -75px;
    overflow: hidden;
}
.mouth .down .bigCircle{
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 100px/250px;
    background: #A51109;
    overflow: hidden;
    border: 3px solid black;
}
.mouth .down .bigCircle .smallCircle{
    width: 200px;
    height: 200px;
    position: absolute;
    bottom: -80px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
    background: #FF5B5D;
}
.face {
    width: 88px;
    height: 88px;
    position: absolute;
    border: 3px solid black;
    left: 50%;
    top: 200px;
    margin-left: -44px;
    z-index: 4;
}
.face.left{
    transform: translateX(-180px);
    background: #FE1800;
    border-radius: 50%;
}
.face.right{
    transform: translateX(180px);
    background: #FE1800;
    border-radius: 50%;
}
`
const player = {
    id: undefined,
    time: 100,
    n: 1,
    ui: {
        html1: document.querySelector('#html1'),
        html2: document.querySelector('#html2')
    },
    events: {
        '#play': 'play',
        '#slowPlay': 'slow',
        '#pause': 'pause',
        '#fastPlay': 'fast',
        '#normalPlay': 'normal'
    },
    init: () => {
        player.ui.html1.innerHTML = string.substring(0, player.n)
        player.ui.html2.innerText = string.substring(0, player.n)
        player.eventFun()
        player.play()
    },
    eventFun: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key]  // 防御性编程
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: () => {
        if (player.n > string.length) {
            clearInterval(player.id)
            return
        }
        player.n += 1
        player.ui.html1.innerHTML = string.substring(0, player.n)
        player.ui.html2.innerText = string.substring(0, player.n)
        player.ui.html2.scrollTop = player.ui.html2.scrollHeight
    },
    play: () => {
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        return window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 300
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 100
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()


