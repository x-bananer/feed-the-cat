(function(){"use strict";var e={8310:function(e,i,t){var a=t(5130),s=t(9005),n=t(6768);const o={id:"app"};function r(e,i,t,a,s,r){const d=(0,n.g2)("GameScreen");return(0,n.uX)(),(0,n.CE)("div",o,[(0,n.bF)(d)])}var d=t.p+"img/unmute.9517a111.svg",c=t.p+"img/mute.0bf5f864.svg";const l={id:"app"},g={key:0,class:"app__icon-img",src:d},h={key:1,class:"app__icon-img",src:c};function m(e,i,t,a,s,o){const r=(0,n.g2)("GameStart"),d=(0,n.g2)("GameCity"),c=(0,n.g2)("GameField"),m=(0,n.g2)("GameRules");return(0,n.uX)(),(0,n.CE)("div",l,[(0,n.Lk)("div",{class:"app__icon",onClick:i[0]||(i[0]=(...e)=>o.onClickSoundState&&o.onClickSoundState(...e))},[e.isSoundOn?((0,n.uX)(),(0,n.CE)("img",g)):((0,n.uX)(),(0,n.CE)("img",h))]),e.screens.start?((0,n.uX)(),(0,n.Wv)(r,{key:0})):(0,n.Q3)("",!0),e.screens.city?((0,n.uX)(),(0,n.Wv)(d,{key:1})):(0,n.Q3)("",!0),e.screens.game?((0,n.uX)(),(0,n.Wv)(c,{key:2})):(0,n.Q3)("",!0),e.screens.rules?((0,n.uX)(),(0,n.Wv)(m,{key:3})):(0,n.Q3)("",!0)])}t(4114);var p=t(794);const u=(0,s.nY)("game",{state:()=>({birdPosition:{x:100,y:300},birdSize:{width:60,height:60},birdVelocity:0,gravity:.5,isGameOver:!1,isFinalNotice:!1,isGameRunning:!1,pipes:[],pipeSize:{width:80,gap:200},rewards:[],rewardSize:{width:60,height:60},score:0,moveSpeed:5,gameInterval:null,currentCityName:"",screens:{start:!0,game:!1,city:!1,rules:!1},isSoundOn:!1}),actions:{setSoundState(e){this.isSoundOn=e},setScreen(e){Object.keys(this.screens).forEach((e=>{this.screens[e]=!1})),this.screens[e]=!0},setPipeWidth(){const e=window.innerHeight,i=100/844;this.pipeSize.width=e*i},fly(){this.isGameRunning||(this.isGameRunning=!0),this.birdVelocity=-8},fall(){if(this.isGameOver||!this.isGameRunning)return;this.birdVelocity+=this.gravity,this.birdPosition.y+=this.birdVelocity;const e=window.innerHeight;if(this.birdPosition.y>e-this.birdSize.height||this.birdPosition.y<0)return this.playSound("./audio/hit.wav"),void this.endGame();const i=this.birdPosition.x+this.birdSize.width,t=this.birdPosition.y+this.birdSize.height;for(const a of this.pipes){const e=a.x+this.pipeSize.width,s=a.height,n=a.height+this.pipeSize.gap,o=this.birdPosition.x<e&&i>a.x,r=this.birdPosition.y>s&&t<n;if(o&&!r)return this.playSound("./audio/hit.wav"),void this.endGame()}this.rewards=this.rewards.filter((e=>{const i=this.birdPosition.x+this.birdSize.width,t=this.birdPosition.y+this.birdSize.height,a=e.x+this.rewardSize.width,s=e.y+this.rewardSize.height,n=this.birdPosition.x<a&&i>e.x,o=this.birdPosition.y<s&&t>e.y;return!n||!o||(this.playSound("./audio/point.wav"),this.score+=1,!1)})),this.moveElements()},moveElements(){this.pipes.forEach((e=>{e.x-=this.moveSpeed})),this.pipes.length&&this.pipes[0].x+this.pipeSize.width<0&&this.pipes.shift(),(!this.pipes.length||this.pipes[this.pipes.length-1].x<window.innerWidth-400)&&this.spawnPipe(),(0===this.rewards.length||this.rewards[this.rewards.length-1].x<window.innerWidth-500)&&this.spawnReward(),this.rewards.forEach((e=>{e.x-=this.moveSpeed})),this.rewards=this.rewards.filter((e=>e.x+this.rewardSize.width>0))},spawnPipe(){const e=Math.floor(Math.random()*(window.innerHeight-this.pipeSize.gap-100))+50;this.pipes.push({x:window.innerWidth,height:e})},spawnReward(){let e,i,t;e=window.innerWidth,i=Math.floor(Math.random()*(window.innerHeight-this.rewardSize.height)),t=!1;for(const a of this.pipes){const s=a.height,n=a.height+this.pipeSize.gap,o=i+this.rewardSize.height;if(e<a.x+this.pipeSize.width&&e+this.rewardSize.width>a.x&&(i<s||o>n)){t=!0;break}}if(!t)for(const a of this.rewards){const s=a.y+this.rewardSize.height,n=i+this.rewardSize.height;if(e<a.x+this.rewardSize.width&&e+this.rewardSize.width>a.x&&i<s&&n>a.y){t=!0;break}}t||this.rewards.push({id:(0,p.A)(),x:e,y:i})},playSound(e){if(!this.isSoundOn)return;const i=new Audio(e);i.play().catch((e=>{console.error("Error playing sound:",e)}))},endGame(){this.isGameOver=!0,this.isGameRunning=!1,this.birdVelocity=0,clearInterval(this.gameInterval),setTimeout((()=>{this.playSound("./audio/die.wav")}),100),this.animateFall()},animateFall(){const e=8,i=this.birdPosition.y-40,t=5,a=setInterval((()=>{this.birdPosition.y>i?this.birdPosition.y-=t:(clearInterval(a),setTimeout((()=>{const i=setInterval((()=>{this.birdPosition.y+=e,this.birdPosition.y>window.innerHeight+50&&(clearInterval(i),this.isFinalNotice=!0)}),20)}),0))}),20)},resetGame(){this.playSound("./audio/swoosh.wav"),this.birdPosition={x:100,y:300},this.birdVelocity=0,this.isGameOver=!1,this.isFinalNotice=!1,this.isGameRunning=!1,this.pipes=[],this.rewards=[],this.score=0,this.gravity=.5,this.spawnPipe(),clearInterval(this.gameInterval)},startGame(){this.resetGame(),this.gameInterval=setInterval((()=>{this.isGameRunning&&this.fall()}),20)},setCity(e){this.currentCityName=e},resetState(){this.screens={start:!0,game:!1,city:!1},clearInterval(this.gameInterval)}},getters:{getPipeWidth:e=>e.pipeSize.width}});var v=t(4232),k=t.p+"img/rule.8af39a5a.png";const L=e=>((0,n.Qi)("data-v-616a4274"),e=e(),(0,n.jt)(),e),_={class:"page page--loader"},b=L((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),f=[b],y={class:"page__outline"},w={class:"page__reminder"},S=L((()=>(0,n.Lk)("img",{class:"page__reminder-img",src:k,alt:""},null,-1))),C=[S],x={class:"notice"},G={class:"notice__container"},I={key:0,class:"notice__title"},E={class:"notice__description",style:{"text-align":"center"}},O=L((()=>(0,n.Lk)("br",null,null,-1))),M=L((()=>(0,n.Lk)("br",null,null,-1)));function P(e,i,t,s,o,r){const d=(0,n.g2)("GameBird"),c=(0,n.g2)("GamePipe"),l=(0,n.g2)("GameReward");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)((0,n.Lk)("div",_,f,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",{class:"page",onMousedown:i[4]||(i[4]=(...e)=>r.handleInteraction&&r.handleInteraction(...e)),onTouchstart:i[5]||(i[5]=(...e)=>r.handleInteraction&&r.handleInteraction(...e)),onTouchmove:i[6]||(i[6]=(0,a.D$)((()=>{}),["prevent"])),onTouchend:i[7]||(i[7]=(0,a.D$)((()=>{}),["prevent"]))},[(0,n.bo)((0,n.Lk)("div",y,null,512),[[a.aG,!e.isGameRunning&&!e.isGameOver]]),(0,n.Lk)("div",{class:"page__background",style:(0,v.Tr)(r.backgroundStyle)},null,4),(0,n.bF)(d),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e.pipes,((e,i)=>((0,n.uX)(),(0,n.Wv)(c,{key:i,x:e.x,y:e.y,height:e.height},null,8,["x","y","height"])))),128)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e.rewards,(e=>((0,n.uX)(),(0,n.Wv)(l,{key:e.id,x:e.x,y:e.y},null,8,["x","y"])))),128)),(0,n.bo)((0,n.Lk)("div",w,C,512),[[a.aG,!e.isGameRunning&&!e.isGameOver]]),(0,n.bo)((0,n.Lk)("div",{class:"page__caption"}," Собрано: "+(0,v.v_)(e.score),513),[[a.aG,!e.isFinalNotice]]),(0,n.bo)((0,n.Lk)("div",x,[(0,n.Lk)("div",G,[o.finalMessage?((0,n.uX)(),(0,n.CE)("p",I,(0,v.v_)(e.score?o.finalMessage.title:"Коту под хвост"),1)):(0,n.Q3)("",!0),o.finalMessage?(0,n.bo)(((0,n.uX)(),(0,n.CE)("p",{key:1,class:"notice__description"},(0,v.v_)(o.finalMessage.description),513)),[[a.aG,e.score]]):(0,n.Q3)("",!0),(0,n.bo)((0,n.Lk)("p",E,[(0,n.eW)(" Вы не успели ничего собрать. "),O,M,(0,n.eW)(" Не страшно! Попробуйте ещё раз ")],512),[[a.aG,!e.score]]),(0,n.Lk)("div",{class:"button yellow",onMousedown:i[0]||(i[0]=(...e)=>r.startGame&&r.startGame(...e)),onTouchstart:i[1]||(i[1]=(...e)=>r.startGame&&r.startGame(...e))}," Ещё раз ",32),(0,n.Lk)("div",{class:"button red",onMousedown:i[2]||(i[2]=(...e)=>r.onClickToMenu&&r.onClickToMenu(...e)),onTouchstart:i[3]||(i[3]=(...e)=>r.onClickToMenu&&r.onClickToMenu(...e))}," Уйти ",32)])],512),[[a.aG,e.isFinalNotice]])],544),[[a.aG,!o.loading]])],64)}const $=e=>((0,n.Qi)("data-v-e2c0ae60"),e=e(),(0,n.jt)(),e),T=$((()=>(0,n.Lk)("div",{class:"moving__border"},[(0,n.Lk)("div",{class:"moving__image"})],-1))),z=[T];function F(e,i,t,a,s,o){return(0,n.uX)(),(0,n.CE)("div",{class:"moving",style:(0,v.Tr)(o.birdStyle)},z,4)}var N={computed:{...(0,s.aH)(u,["birdPosition"]),birdStyle(){return{left:`${this.birdPosition.x}px`,top:`${this.birdPosition.y}px`,position:"absolute"}}}},R=t(1241);const W=(0,R.A)(N,[["render",F],["__scopeId","data-v-e2c0ae60"]]);var X=W;function A(e,i,t,a,s,o){return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("div",{class:(0,v.C4)(["pipe-top",o.pipeColorClass]),style:(0,v.Tr)(o.pipeTopStyle)},null,6),(0,n.Lk)("div",{class:(0,v.C4)(["pipe-bottom",o.pipeColorClass]),style:(0,v.Tr)(o.pipeBottomStyle)},null,6)])}var j={props:["x","height"],computed:{...(0,s.aH)(u,["currentCityName"]),pipeWidth(){const e=u();return e.getPipeWidth},pipeTopStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`${this.height}px`,top:0}},pipeBottomStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`calc((var(--vh, 1vh)*100) - ${this.height+200}px)`,top:`${this.height+200}px`}},pipeColorClass(){const e={Minsk:"pipe-green",Moscow:"pipe-red",Istanbul:"pipe-red"};return e[this.currentCityName]||"pipe-green"}}};const H=(0,R.A)(j,[["render",A],["__scopeId","data-v-460d954b"]]);var Q=H;function B(e,i,t,a,s,o){return(0,n.uX)(),(0,n.CE)("div",{class:(0,v.C4)(["reward","reward-"+s.selectedImage]),style:(0,v.Tr)(o.rewardStyle)},null,6)}const q=[1,2,3];var D={props:["x","y"],data(){return{selectedImage:null}},created(){this.selectedImage=q[Math.floor(Math.random()*q.length)]},computed:{rewardStyle(){return{left:`${this.x}px`,top:`${this.y}px`,width:"60px",height:"60px",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}}};const V=(0,R.A)(D,[["render",B],["__scopeId","data-v-6ad717e4"]]);var K=V,U={components:{GameBird:X,GamePipe:Q,GameReward:K},data(){return{backgroundOpacity:1,backgroundContrast:.8,touchStartTime:null,lastInteractionTime:0,interactionDelay:100,loading:!0,finalMessage:null}},computed:{...(0,s.aH)(u,["pipes","rewards","score","isGameOver","isGameRunning","level","currentCityName","isFinalNotice"]),backgroundImages(){return{Moscow:t(802),Istanbul:t(6344),Minsk:t(3946)}},backgroundStyle(){if(this.currentCityName){const e=this.backgroundImages[this.currentCityName]||this.backgroundImages.Moscow;return{"--background-opacity":this.backgroundOpacity,"--background-contrast":this.backgroundContrast,"background-image":`url(${e})`}}return{background:"#f0c040"}}},methods:{setFinalMessage(){const e=this.setFinalMessages(this.score);this.finalMessage=e[Math.floor(Math.random()*e.length)]},setFinalMessages(e){return[{title:"Только у кошек девять жизней",description:`Ваш парашют не раскрылся, и вы упали на старушку. Хорошая новость – неравнодушные прохожие отдали собранную еду ${e} ${this.declOfNum(e,["коту","котам","котам"])}. Плохая – у старушки не было завещания.`},{title:"Путь к сердцу кота лежит через желудок",description:`Вам удалось перезапустить реактивный ранец у самой земли и успешно сесть. Результат: ${this.declOfNum(e,["накормлен","накормлены","накормлено"])} ${e} ${this.declOfNum(e,["кот","кота","котов"])}`},{title:"Держись, котик, я иду",description:`Падая, вы успели заметить кота на крыше и бросили ему корм. ${this.declOfNum(e-1,["Оставшийся","Оставшиеся","Оставшиеся"])} ${e-1} ${this.declOfNum(e-1,["припас","припаса","припасов"])} ${this.declOfNum(e-1,["канул","канули","канули"])} в Лету вместе с вами. К сожалению, вы не умели плавать. `},{title:"Я кота (не) накормлю",description:`Приземлившись на городскую площадь, вы были атакованы всеядными голубями. Ну а что, ${e} ${this.declOfNum(e,["сытая птица","сытые птицы","сытых птиц"])} – тоже рекорд. `},{title:"Котопокалипсис сегодня",description:`Шутка! Не случилось ровным счётом ничего плохого. Вы удачно приземляетесь и получаете ${e} «мяу» от ${e} ${this.declOfNum(e,["сытого кота","сытых котов","сытых котов"])}.`},{title:"В кототерии что-то перепутали",description:`Кое-как добравшись до земли, вы были рады выставить ${e} ${this.declOfNum(e,["полную миску","полных миски","полных мисок"])} отборного корма перед довольными котами. Правда, надев очки, вы поняли, что кормите опоссумов. `},{title:"Поймай, если сможешь",description:"Из-за неисправного ранца вы крутились в воздухе так, что собранный корм разлетелся по всему городу. Интересно, достанется ли он котам? Количество накормленных: неизвестно."},{title:"Ты не пройдешь",description:`…мимо голодного кота. На земле вас встречает ${e} ${this.declOfNum(e,["пушистик","пушистика","пушистиков"])} – и ${e>1?"каждый":""} получает своё угощение. «Мур» еще никогда не был таким приятным.`}]},handleInteraction(e){if(this.isGameOver)return;e.preventDefault();const i=Date.now();i-this.lastInteractionTime<this.interactionDelay||(this.lastInteractionTime=i,this.fly())},fly(){const e=u();this.isGameOver||e.fly()},startGame(){const e=u();e.setPipeWidth(),e.startGame()},startNextLevel(){this.startGame()},declOfNum(e,i){return i[e%10===1&&e%100!==11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2]},onClickToMenu(){const e=u();e.resetState()}},mounted(){this.startGame(),setTimeout((()=>{this.loading=!1}),500)},beforeUnmount(){const e=u();clearInterval(e.gameInterval)},watch:{isGameOver(e){this.setFinalMessage();const i=u();e&&clearInterval(i.gameInterval)},isGameRunning(e){const i=u();e||clearInterval(i.gameInterval)}}};const Y=(0,R.A)(U,[["render",P],["__scopeId","data-v-616a4274"]]);var J=Y,Z=t.p+"img/logo-2.77525470.png",ee=t.p+"img/Food-1.42c11a09.png",ie=t.p+"img/Food-2.e8ea151e.png",te=t.p+"img/Food-3.64d2adc6.png",ae=t.p+"img/hero-2.a872a9af.png";const se=e=>((0,n.Qi)("data-v-160eaae0"),e=e(),(0,n.jt)(),e),ne={class:"page-loading"},oe=se((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),re=[oe],de={class:"page"},ce={class:"page__container"},le=(0,n.Fv)('<div class="page__logo" data-v-160eaae0><img class="image page__logo-img" src="'+Z+'" alt="Корми котов" data-v-160eaae0></div><img class="image page__img-1" src="'+ee+'" data-v-160eaae0><img class="image page__img-2" src="'+ie+'" data-v-160eaae0><img class="image page__img-3" src="'+te+'" data-v-160eaae0><img class="image page__img-4" src="'+ae+'" data-v-160eaae0>',5),ge={class:"page__button"};function he(e,i,t,s,o,r){return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)((0,n.Lk)("div",ne,re,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",de,[(0,n.Lk)("div",ce,[le,(0,n.Lk)("div",ge,[(0,n.Lk)("div",{class:"button green",onClick:i[0]||(i[0]=(...e)=>r.onClickStart&&r.onClickStart(...e))},"Кормить котов"),(0,n.Lk)("div",{class:"button blue",onClick:i[1]||(i[1]=(...e)=>r.onClickToRules&&r.onClickToRules(...e))},"Правила игры")])])],512),[[a.aG,!o.loading]])],64)}var me={data(){return{imagesLoaded:0,totalImages:5,loading:!0}},computed:{...(0,s.aH)(u,["isSoundOn"])},methods:{onClickStart(){if(this.isSoundOn){const e=t(66),i=new Audio(e);i.play().catch((e=>{console.error("Error playing sound:",e)}))}const e=u();e.setScreen("city")},onClickToRules(){const e=u();e.setScreen("rules")},imageLoaded(){this.imagesLoaded+=1,this.imagesLoaded>=this.totalImages&&setTimeout((()=>{this.loading=!1}),1e3)},checkImages(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.complete?this.imageLoaded():(e.addEventListener("load",this.imageLoaded),e.addEventListener("error",this.imageLoaded))}))}},mounted(){this.checkImages()},beforeUnmount(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.removeEventListener("load",this.imageLoaded),e.removeEventListener("error",this.imageLoaded)}))}};const pe=(0,R.A)(me,[["render",he],["__scopeId","data-v-160eaae0"]]);var ue=pe,ve=t(802),ke=t(6344),Le=t(3946);const _e=e=>((0,n.Qi)("data-v-6da94328"),e=e(),(0,n.jt)(),e),be={class:"page"},fe={class:"page__container page__container--loading"},ye=_e((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),we=[ye],Se={class:"page__container"},Ce=_e((()=>(0,n.Lk)("div",{class:"page__header"},[(0,n.Lk)("h1",{class:"page__title"},"Выберите город")],-1))),xe={class:"page__content"},Ge={class:"page__grid"},Ie={class:"page__card-wrap"},Ee=_e((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Москва",-1))),Oe={class:"page__card-wrap"},Me=_e((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Стамбул",-1))),Pe={class:"page__card-wrap"},$e=_e((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Минск",-1))),Te={class:"page__card-wrap"},ze=_e((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Минимализм",-1))),Fe={class:"page__button"};function Ne(e,i,t,s,o,r){return(0,n.uX)(),(0,n.CE)("div",be,[(0,n.bo)((0,n.Lk)("div",fe,we,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",Se,[Ce,(0,n.Lk)("div",xe,[(0,n.Lk)("div",Ge,[(0,n.Lk)("div",Ie,[(0,n.Lk)("div",{class:"page__card",onClick:i[1]||(i[1]=e=>r.onClickCity("Moscow"))},[(0,n.Lk)("img",{class:"image page__card-img",src:ve,alt:"",onLoad:i[0]||(i[0]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),Ee]),(0,n.Lk)("div",Oe,[(0,n.Lk)("div",{class:"page__card",onClick:i[3]||(i[3]=e=>r.onClickCity("Istanbul"))},[(0,n.Lk)("img",{class:"image page__card-img",src:ke,alt:"",onLoad:i[2]||(i[2]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),Me]),(0,n.Lk)("div",Pe,[(0,n.Lk)("div",{class:"page__card",onClick:i[5]||(i[5]=e=>r.onClickCity("Minsk"))},[(0,n.Lk)("img",{class:"image page__card-img",src:Le,alt:"",onLoad:i[4]||(i[4]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),$e]),(0,n.Lk)("div",Te,[(0,n.Lk)("div",{class:"page__card",onClick:i[6]||(i[6]=e=>r.onClickCity(null))}),ze])])]),(0,n.Lk)("div",Fe,[(0,n.Lk)("button",{class:"button red",onClick:i[7]||(i[7]=(...e)=>r.onClickBack&&r.onClickBack(...e))},"Назад")])],512),[[a.aG,!o.loading]])])}var Re={data(){return{imagesLoaded:0,totalImages:3,loading:!0}},computed:{},methods:{onClickCity(e){const i=u();i.setCity(e),i.setScreen("game")},onClickBack(){const e=u();e.setScreen("start")},imageLoaded(){this.imagesLoaded+=1,this.imagesLoaded>=this.totalImages&&setTimeout((()=>{this.loading=!1}),1e3)},checkImages(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.complete?this.imageLoaded():(e.addEventListener("load",this.imageLoaded),e.addEventListener("error",this.imageLoaded))}))}},mounted(){this.checkImages()},beforeUnmount(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.removeEventListener("load",this.imageLoaded),e.removeEventListener("error",this.imageLoaded)}))},watch:{}};const We=(0,R.A)(Re,[["render",Ne],["__scopeId","data-v-6da94328"]]);var Xe=We,Ae=t.p+"img/circle-1.4a8cb7cd.png",je=t.p+"img/arrow-left.acb2e095.png",He=t.p+"img/circle-2.4fd7be2b.png",Qe=t.p+"img/arrow-right.23c877cd.png",Be=t.p+"img/end.c5067b6b.png",qe=t.p+"img/end-2.67e1b4d6.png";const De=e=>((0,n.Qi)("data-v-ad03486e"),e=e(),(0,n.jt)(),e),Ve={class:"page"},Ke={class:"page__container page__container--loading"},Ue=De((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),Ye=[Ue],Je={class:"page__container"},Ze=De((()=>(0,n.Lk)("h1",{class:"page_title"},"Правила игры",-1))),ei={class:"page__list"},ii={class:"box box--1"},ti=De((()=>(0,n.Lk)("p",{class:"box__writing"},"это вы",-1))),ai=De((()=>(0,n.Lk)("p",{class:"page__item"}," «Тап», чтобы лететь. Остальное делает гравитация. ",-1))),si={class:"box box--2"},ni=De((()=>(0,n.Lk)("p",{class:"box__writing"},[(0,n.eW)(" это "),(0,n.Lk)("br"),(0,n.eW)(' "награды" ')],-1))),oi=De((()=>(0,n.Lk)("p",{class:"page__item"},"Вы можете собирать их во время полета.",-1))),ri={class:"box box--3"},di=De((()=>(0,n.Lk)("p",{class:"page__item"}," В конце игры вы отдадите всё собранное котикам. Если получится... ",-1))),ci={class:"page__button"};function li(e,i,t,s,o,r){return(0,n.uX)(),(0,n.CE)("div",Ve,[(0,n.bo)((0,n.Lk)("div",Ke,Ye,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",Je,[Ze,(0,n.Lk)("div",ei,[(0,n.Lk)("div",ii,[(0,n.Lk)("img",{src:Ae,class:"box__image-back image",onLoad:i[0]||(i[0]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:ae,class:"box__image-main image",onLoad:i[1]||(i[1]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:je,class:"box__image-arrow image",onLoad:i[2]||(i[2]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),ti]),ai,(0,n.Lk)("div",si,[(0,n.Lk)("img",{src:He,class:"box__image-back image",onLoad:i[3]||(i[3]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:ee,class:"box__image-main-1 image",onLoad:i[4]||(i[4]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:ie,class:"box__image-main-2 image",onLoad:i[5]||(i[5]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:te,class:"box__image-main-3 image",onLoad:i[6]||(i[6]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:Qe,class:"box__image-arrow image",onLoad:i[7]||(i[7]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),ni]),oi,(0,n.Lk)("div",ri,[(0,n.Lk)("img",{src:Be,class:"box__image-main image",onLoad:i[8]||(i[8]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32),(0,n.Lk)("img",{src:qe,class:"box__image-back image",onLoad:i[9]||(i[9]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),di]),(0,n.Lk)("div",ci,[(0,n.Lk)("button",{class:"button yellow",onClick:i[10]||(i[10]=(...e)=>r.onClickBack&&r.onClickBack(...e))}," Назад ")])],512),[[a.aG,!o.loading]])])}var gi={data(){return{imagesLoaded:0,totalImages:10,loading:!0}},computed:{},methods:{onClickBack(){const e=u();e.setScreen("start")},imageLoaded(){this.imagesLoaded+=1,this.imagesLoaded>=this.totalImages&&setTimeout((()=>{this.loading=!1}),500)},checkImages(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.complete?this.imageLoaded():(e.addEventListener("load",this.imageLoaded),e.addEventListener("error",this.imageLoaded))}))}},mounted(){this.checkImages()},beforeUnmount(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.removeEventListener("load",this.imageLoaded),e.removeEventListener("error",this.imageLoaded)}))},watch:{}};const hi=(0,R.A)(gi,[["render",li],["__scopeId","data-v-ad03486e"]]);var mi=hi,pi={name:"App",components:{GameField:J,GameStart:ue,GameCity:Xe,GameRules:mi},computed:{...(0,s.aH)(u,["screens","isSoundOn"])},methods:{onClickSoundState(){const e=u();e.setSoundState(!this.isSoundOn)}}};const ui=(0,R.A)(pi,[["render",m],["__scopeId","data-v-5ad58dee"]]);var vi=ui,ki={name:"App",components:{GameScreen:vi}};const Li=(0,R.A)(ki,[["render",r]]);var _i=Li;const bi=(0,a.Ef)(_i),fi=(0,s.Ey)();bi.use(fi),bi.mount("#app"),setTimeout((()=>{let e=.01*window.innerHeight-.01;document.documentElement.style.setProperty("--vh",`${e}px`)}),100)},66:function(e,i,t){e.exports=t.p+"media/meow.7ba9b74b.wav"},6344:function(e,i,t){e.exports=t.p+"img/Istanbul.32ec375c.png"},3946:function(e,i,t){e.exports=t.p+"img/Minsk.338426cc.png"},802:function(e,i,t){e.exports=t.p+"img/Moscow.8faef8a0.png"}},i={};function t(a){var s=i[a];if(void 0!==s)return s.exports;var n=i[a]={exports:{}};return e[a].call(n.exports,n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(i,a,s,n){if(!a){var o=1/0;for(l=0;l<e.length;l++){a=e[l][0],s=e[l][1],n=e[l][2];for(var r=!0,d=0;d<a.length;d++)(!1&n||o>=n)&&Object.keys(t.O).every((function(e){return t.O[e](a[d])}))?a.splice(d--,1):(r=!1,n<o&&(o=n));if(r){e.splice(l--,1);var c=s();void 0!==c&&(i=c)}}return i}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[a,s,n]}}(),function(){t.n=function(e){var i=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(i,{a:i}),i}}(),function(){t.d=function(e,i){for(var a in i)t.o(i,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:i[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)}}(),function(){t.p="/feed-the-cat/"}(),function(){var e={524:0};t.O.j=function(i){return 0===e[i]};var i=function(i,a){var s,n,o=a[0],r=a[1],d=a[2],c=0;if(o.some((function(i){return 0!==e[i]}))){for(s in r)t.o(r,s)&&(t.m[s]=r[s]);if(d)var l=d(t)}for(i&&i(a);c<o.length;c++)n=o[c],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(l)},a=self["webpackChunkfeed_the_cat"]=self["webpackChunkfeed_the_cat"]||[];a.forEach(i.bind(null,0)),a.push=i.bind(null,a.push.bind(a))}();var a=t.O(void 0,[504],(function(){return t(8310)}));a=t.O(a)})();
//# sourceMappingURL=app.93480a9c.js.map