const clientId = 'ph7kfg58fkitm88sogja5xzqm4tlyp'
const url = 'https://api.twitch.tv/kraken'
const accept = 'application/vnd.twitchtv.v5+json'
const videoIn = `<img src="$perview" />
                <div class="video__wrap">
                    <div class="video__avatar">
                        <img src="$logo" />
                    </div>
                    <div class="video__intro">
                        <div class="intro__title">
                            $title
                            <div class="intro__channel">
                                $name
                            </div>

                        </div>
                    </div>
                </div>`

getGames(games => { //只有遊戲資料
    for (let game of games) {
        let element = document.createElement("a")
        element.innerHTML = game.game.name
        document.querySelector(".nav__wrap").appendChild(element)
    }
    changeGame(games[0].game.name) //顯示第一個遊戲的實況
})

document.querySelector(".nav__wrap").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        const gameName = e.target.innerText
        changeGame(gameName)
    }
})

function changeGame(gameName) {
    document.querySelector(".banner__title").innerText = gameName
    document.querySelector(".videos").innerHTML = ""
    getStream(gameName, streams => { //抓取遊戲的實況內容
        for (let stream of streams) {
            let str = document.createElement("div")
            str.classList.add("video")
            str.innerHTML =
                videoIn
                .replace("$perview", stream.preview.large)
                .replace("$logo", stream.channel.logo)
                .replace("$title", stream.channel.status)
                .replace("$name", stream.channel.name)
            document.querySelector(".videos").appendChild(str)
        }
        addEmptyBlock()
        addEmptyBlock()
    })
}

// function getGames(callback) {
//     const req = new XMLHttpRequest()
//     req.open('GET', `${url}/games/top?limit=5`, true)
//     req.setRequestHeader('Accept', accept)
//     req.setRequestHeader('Client-ID', clientId)
//     req.onload = () => {
//         if (req.status >= 200 && req.status < 400) {
//             const games = JSON.parse(req.response).top
//             callback(games)
//         }
//     }
//     req.send()
// }

function getGames(callback) {
    return fetch(`${url}/games/top?limit=5`, {
        method: "GET",
        headers: new Headers({
            "Accept": accept,
            "Client-ID": clientId
        }),
    }).then(res => res.json()).then(result => {
        callback(result.top)
    }).catch(err => err)
}

function getStream(gameName, callback) {
    return fetch(`${url}/streams?game=` + encodeURIComponent(gameName), {
        methos: "GET",
        headers: new Headers({
            "Accept": accept,
            "Client-ID": clientId
        }),
    }).then(res => res.json()).then(result => {
        callback(result.streams)
    }).catch(err => err)
}

// function getStream(gameName, callback) {
//     const req = new XMLHttpRequest()
//     req.open('GET', `${url}/streams?game=` + encodeURIComponent(gameName), true)
//     req.setRequestHeader('Accept', accept)
//     req.setRequestHeader('Client-ID', clientId)
//     req.onload = () => {
//         if (req.status >= 200 && req.status < 400) {
//             const data = JSON.parse(req.response).streams
//             console.log(data)
//             callback(data)
//         }
//     }
//     req.send()
// }

function addEmptyBlock() {
    let div = document.createElement("div")
    div.classList.add("video__empty")
    document.querySelector(".videos").appendChild(div)
}