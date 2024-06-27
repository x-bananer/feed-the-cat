(function(){"use strict";var e={3140:function(e,t,i){var a=i(5130),s=i(9005),n=i(6768);const o={id:"app"};function r(e,t,i,a,s,r){const c=(0,n.g2)("GameScreen");return(0,n.uX)(),(0,n.CE)("div",o,[(0,n.bF)(c)])}const c={id:"app"};function d(e,t,i,a,s,o){const r=(0,n.g2)("GameStart"),d=(0,n.g2)("GameCity"),l=(0,n.g2)("GameField"),h=(0,n.g2)("GameRules");return(0,n.uX)(),(0,n.CE)("div",c,[e.screens.start?((0,n.uX)(),(0,n.Wv)(r,{key:0})):(0,n.Q3)("",!0),e.screens.city?((0,n.uX)(),(0,n.Wv)(d,{key:1})):(0,n.Q3)("",!0),e.screens.game?((0,n.uX)(),(0,n.Wv)(l,{key:2})):(0,n.Q3)("",!0),e.screens.rules?((0,n.uX)(),(0,n.Wv)(h,{key:3})):(0,n.Q3)("",!0)])}i(4114);var l=i(794);const h=(0,s.nY)("game",{state:()=>({birdPosition:{x:100,y:300},birdSize:{width:60,height:60},birdVelocity:0,gravity:.5,isGameOver:!1,isFinalNotice:!1,isGameRunning:!1,pipes:[],pipeSize:{width:80,gap:200},rewards:[],rewardSize:{width:60,height:60},score:0,moveSpeed:4,gameInterval:null,currentCityName:"",screens:{start:!0,game:!1,city:!1,rules:!1}}),actions:{setScreen(e){Object.keys(this.screens).forEach((e=>{this.screens[e]=!1})),this.screens[e]=!0},setPipeWidth(){const e=window.innerHeight,t=100/844;this.pipeSize.width=e*t},fly(){this.isGameRunning||(this.isGameRunning=!0),this.birdVelocity=-8},fall(){if(this.isGameOver||!this.isGameRunning)return;this.birdVelocity+=this.gravity,this.birdPosition.y+=this.birdVelocity;const e=window.innerHeight;if(this.birdPosition.y>e-this.birdSize.height||this.birdPosition.y<0)return this.playSound("./audio/hit.wav"),void this.endGame();const t=this.birdPosition.x+this.birdSize.width,i=this.birdPosition.y+this.birdSize.height;for(const a of this.pipes){const e=a.x+this.pipeSize.width,s=a.height,n=a.height+this.pipeSize.gap,o=this.birdPosition.x<e&&t>a.x,r=this.birdPosition.y>s&&i<n;if(o&&!r)return this.playSound("./audio/hit.wav"),void this.endGame()}this.rewards=this.rewards.filter((e=>{const t=this.birdPosition.x+this.birdSize.width,i=this.birdPosition.y+this.birdSize.height,a=e.x+this.rewardSize.width,s=e.y+this.rewardSize.height,n=this.birdPosition.x<a&&t>e.x,o=this.birdPosition.y<s&&i>e.y;return!n||!o||(this.playSound("./audio/point.wav"),this.score+=1,!1)})),this.moveElements()},moveElements(){this.pipes.forEach((e=>{e.x-=this.moveSpeed})),this.pipes.length&&this.pipes[0].x+this.pipeSize.width<0&&this.pipes.shift(),(!this.pipes.length||this.pipes[this.pipes.length-1].x<window.innerWidth-400)&&this.spawnPipe(),(0===this.rewards.length||this.rewards[this.rewards.length-1].x<window.innerWidth-500)&&this.spawnReward(),this.rewards.forEach((e=>{e.x-=this.moveSpeed})),this.rewards=this.rewards.filter((e=>e.x+this.rewardSize.width>0))},spawnPipe(){const e=Math.floor(Math.random()*(window.innerHeight-this.pipeSize.gap-100))+50;this.pipes.push({x:window.innerWidth,height:e})},spawnReward(){const e=200;let t,i,a,s=0;do{if(s>=e)return;t=window.innerWidth,i=Math.floor(Math.random()*(window.innerHeight-this.rewardSize.height)),a=!1;for(const e of this.pipes){const s=e.height,n=e.height+this.pipeSize.gap,o=i+this.rewardSize.height;if(t<e.x+this.pipeSize.width&&t+this.rewardSize.width>e.x&&(i<s||o>n)){a=!0;break}}if(!a)for(const e of this.rewards){const s=e.y+this.rewardSize.height,n=i+this.rewardSize.height;if(t<e.x+this.rewardSize.width&&t+this.rewardSize.width>e.x&&i<s&&n>e.y){a=!0;break}}s++}while(a);a||this.rewards.push({id:(0,l.A)(),x:t,y:i})},playSound(e){const t=new Audio(e);t.play().catch((e=>{console.error("Error playing sound:",e)}))},endGame(){this.isGameOver=!0,this.isGameRunning=!1,this.birdVelocity=0,clearInterval(this.gameInterval),setTimeout((()=>{this.playSound("./audio/die.wav")}),100),this.animateFall()},animateFall(){const e=8,t=this.birdPosition.y-40,i=5,a=setInterval((()=>{this.birdPosition.y>t?this.birdPosition.y-=i:(clearInterval(a),setTimeout((()=>{const t=setInterval((()=>{this.birdPosition.y+=e,this.birdPosition.y>window.innerHeight+50&&(clearInterval(t),this.isFinalNotice=!0)}),20)}),0))}),20)},resetGame(){this.playSound("./audio/swoosh.wav"),this.birdPosition={x:100,y:300},this.birdVelocity=0,this.isGameOver=!1,this.isFinalNotice=!1,this.isGameRunning=!1,this.pipes=[],this.rewards=[],this.score=0,this.gravity=.5,this.spawnPipe(),clearInterval(this.gameInterval)},startGame(){this.resetGame(),this.gameInterval=setInterval((()=>{this.isGameRunning&&this.fall()}),20)},setCity(e){this.currentCityName=e},resetState(){this.screens={start:!0,game:!1,city:!1},clearInterval(this.gameInterval)}},getters:{getPipeWidth:e=>e.pipeSize.width}});var p=i(4232),u=i.p+"img/rule.8af39a5a.png";const g=e=>((0,n.Qi)("data-v-d0913160"),e=e(),(0,n.jt)(),e),m={class:"page page--loader"},v=g((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),f=[v],k={class:"page__outline"},_={class:"page__reminder"},y=g((()=>(0,n.Lk)("img",{class:"page__reminder-img",src:u,alt:""},null,-1))),b=[y],w={class:"notice"},L={class:"notice__container"},C={class:"notice__title"},S={class:"notice__description",style:{"text-align":"center"}},G=g((()=>(0,n.Lk)("br",null,null,-1))),x=g((()=>(0,n.Lk)("br",null,null,-1)));function I(e,t,i,s,o,r){const c=(0,n.g2)("GameBird"),d=(0,n.g2)("GamePipe"),l=(0,n.g2)("GameReward");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)((0,n.Lk)("div",m,f,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",{class:"page",onMousedown:t[4]||(t[4]=(...e)=>r.handleInteraction&&r.handleInteraction(...e)),onTouchstart:t[5]||(t[5]=(...e)=>r.handleInteraction&&r.handleInteraction(...e)),onTouchmove:t[6]||(t[6]=(0,a.D$)((()=>{}),["prevent"])),onTouchend:t[7]||(t[7]=(0,a.D$)((()=>{}),["prevent"]))},[(0,n.bo)((0,n.Lk)("div",k,null,512),[[a.aG,!e.isGameRunning&&!e.isGameOver]]),(0,n.Lk)("div",{class:"page__background",style:(0,p.Tr)(r.backgroundStyle)},null,4),(0,n.bF)(c),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e.pipes,((e,t)=>((0,n.uX)(),(0,n.Wv)(d,{key:t,x:e.x,y:e.y,height:e.height},null,8,["x","y","height"])))),128)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e.rewards,(e=>((0,n.uX)(),(0,n.Wv)(l,{key:e.id,x:e.x,y:e.y},null,8,["x","y"])))),128)),(0,n.bo)((0,n.Lk)("div",_,b,512),[[a.aG,!e.isGameRunning&&!e.isGameOver]]),(0,n.bo)((0,n.Lk)("div",{class:"page__caption"}," Собрано: "+(0,p.v_)(e.score),513),[[a.aG,!e.isFinalNotice]]),(0,n.bo)((0,n.Lk)("div",w,[(0,n.Lk)("div",L,[(0,n.Lk)("p",C,(0,p.v_)(e.score?r.finalMessage.title:"Коту под хвост"),1),(0,n.bo)((0,n.Lk)("p",{class:"notice__description"},(0,p.v_)(r.finalMessage.description),513),[[a.aG,e.score]]),(0,n.bo)((0,n.Lk)("p",S,[(0,n.eW)(" Вы не успели ничего собрать. "),G,x,(0,n.eW)(" Не страшно! Попробуйте ещё раз ")],512),[[a.aG,!e.score]]),(0,n.Lk)("div",{class:"button yellow",onMousedown:t[0]||(t[0]=(...e)=>r.startGame&&r.startGame(...e)),onTouchstart:t[1]||(t[1]=(...e)=>r.startGame&&r.startGame(...e))}," Ещё раз ",32),(0,n.Lk)("div",{class:"button red",onMousedown:t[2]||(t[2]=(...e)=>r.onClickToMenu&&r.onClickToMenu(...e)),onTouchstart:t[3]||(t[3]=(...e)=>r.onClickToMenu&&r.onClickToMenu(...e))}," Уйти ",32)])],512),[[a.aG,e.isFinalNotice]])],544),[[a.aG,!o.loading]])],64)}const O=e=>((0,n.Qi)("data-v-188b5769"),e=e(),(0,n.jt)(),e),E=O((()=>(0,n.Lk)("div",{class:"moving__border"},[(0,n.Lk)("div",{class:"moving__image"})],-1))),P=[E];function $(e,t,i,a,s,o){return(0,n.uX)(),(0,n.CE)("div",{class:"moving",style:(0,p.Tr)(o.birdStyle)},P,4)}var M={computed:{...(0,s.aH)(h,["birdPosition"]),birdStyle(){return{left:`${this.birdPosition.x}px`,top:`${this.birdPosition.y}px`,position:"absolute"}}}},T=i(1241);const z=(0,T.A)(M,[["render",$],["__scopeId","data-v-188b5769"]]);var N=z;function F(e,t,i,a,s,o){return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("div",{class:(0,p.C4)(["pipe-top",o.pipeColorClass]),style:(0,p.Tr)(o.pipeTopStyle)},null,6),(0,n.Lk)("div",{class:(0,p.C4)(["pipe-bottom",o.pipeColorClass]),style:(0,p.Tr)(o.pipeBottomStyle)},null,6)])}var R={props:["x","height"],computed:{...(0,s.aH)(h,["currentCityName"]),pipeWidth(){const e=h();return e.getPipeWidth},pipeTopStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`${this.height}px`,top:0}},pipeBottomStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`calc((var(--vh, 1vh)*100) - ${this.height+200}px)`,top:`${this.height+200}px`}},pipeColorClass(){const e={Minsk:"pipe-green",Moscow:"pipe-red",Istanbul:"pipe-red"};return e[this.currentCityName]||"pipe-green"}}};const W=(0,T.A)(R,[["render",F],["__scopeId","data-v-5ae0d2e8"]]);var A=W;function X(e,t,i,a,s,o){return(0,n.uX)(),(0,n.CE)("div",{class:(0,p.C4)(["reward","reward-"+s.selectedImage]),style:(0,p.Tr)(o.rewardStyle)},null,6)}const j=[1,2,3];var B={props:["x","y"],data(){return{selectedImage:null}},created(){this.selectedImage=j[Math.floor(Math.random()*j.length)]},computed:{rewardStyle(){return{left:`${this.x}px`,top:`${this.y}px`,width:"60px",height:"60px",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}}};const H=(0,T.A)(B,[["render",X],["__scopeId","data-v-bff8a9fa"]]);var Q=H,D={components:{GameBird:N,GamePipe:A,GameReward:Q},data(){return{backgroundOpacity:1,backgroundContrast:.8,touchStartTime:null,lastInteractionTime:0,interactionDelay:100,loading:!0}},computed:{finalMessages(){return[{title:"Только у кошек девять жизней",description:`Ваш парашют не раскрылся, и вы упали на старушку. Хорошая новость – неравнодушные прохожие отдали собранную еду ${this.score} ${this.declOfNum(this.score,["коту","котам","котам"])}. Плохая – у старушки не было завещания.`},{title:"Путь к сердцу кота лежит через желудок",description:`Вам удалось перезапустить реактивный ранец у самой земли и успешно сесть. Результат: ${this.declOfNum(this.score,["накормлен","накормлены","накормлено"])} ${this.score} ${this.declOfNum(this.score,["кот","кота","котов"])}`},{title:"Держись, котик, я иду",description:`Падая, вы успели заметить кота на крыше и бросили ему корм. ${this.declOfNum(this.score-1,["Оставшийся","Оставшиеся","Оставшиеся"])} ${this.score-1} ${this.declOfNum(this.score-1,["припас","припаса","припасов"])} ${this.declOfNum(this.score-1,["канул","канули","канули"])} в Лету вместе с вами. К сожалению, вы не умели плавать. `},{title:"Я кота (не) накормлю",description:`Приземлившись на городскую площадь, вы были атакованы всеядными голубями. Ну а что, ${this.score} ${this.declOfNum(this.score,["сытая птица","сытые птицы","сытых птиц"])} – тоже рекорд. `},{title:"Котопокалипсис сегодня",description:`Шутка! Не случилось ровным счётом ничего плохого. Вы удачно приземляетесь и получаете ${this.score} «мяу» от ${this.score} ${this.declOfNum(this.score,["сытого кота","сытых котов","сытых котов"])}.`},{title:"В кототерии что-то перепутали",description:`Кое-как добравшись до земли, вы были рады выставить ${this.score} ${this.declOfNum(this.score,["полную миску","полных миски","полных мисок"])} отборного корма перед довольными котами. Правда, надев очки, вы поняли, что кормите опоссумов. `},{title:"Поймай, если сможешь",description:"Из-за неисправного ранца вы крутились в воздухе так, что собранный корм разлетелся по всему городу. Интересно, достанется ли он котам? Количество накормленных: неизвестно."},{title:"Ты не пройдешь",description:`…мимо голодного кота. На земле вас встречает ${this.score} ${this.declOfNum(this.score,["пушистик","пушистика","пушистиков"])} – и ${this.score>1?"каждый":""} получает своё угощение. «Мур» еще никогда не был таким приятным.`}]},finalMessage(){return this.finalMessages[Math.floor(Math.random()*this.finalMessages.length)]},...(0,s.aH)(h,["pipes","rewards","score","isGameOver","isGameRunning","level","currentCityName","isFinalNotice"]),backgroundImages(){return{Moscow:i(802),Istanbul:i(6344),Minsk:i(3946)}},backgroundStyle(){if(this.currentCityName){const e=this.backgroundImages[this.currentCityName]||this.backgroundImages.Moscow;return{"--background-opacity":this.backgroundOpacity,"--background-contrast":this.backgroundContrast,"background-image":`url(${e})`}}return{background:"#f0c040"}}},methods:{handleInteraction(e){if(this.isGameOver)return;e.preventDefault();const t=Date.now();t-this.lastInteractionTime<this.interactionDelay||(this.lastInteractionTime=t,this.fly())},fly(){const e=h();this.isGameOver||e.fly()},startGame(){const e=h();e.setPipeWidth(),e.startGame()},startNextLevel(){this.startGame()},declOfNum(e,t){return t[e%10===1&&e%100!==11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2]},onClickToMenu(){const e=h();e.resetState()}},mounted(){this.startGame(),setTimeout((()=>{this.loading=!1}),500)},beforeUnmount(){const e=h();clearInterval(e.gameInterval)},watch:{isGameOver(e){const t=h();e&&clearInterval(t.gameInterval)},isGameRunning(e){const t=h();e||clearInterval(t.gameInterval)}}};const V=(0,T.A)(D,[["render",I],["__scopeId","data-v-d0913160"]]);var q=V,K=i.p+"img/logo-2.77525470.png",U=i.p+"img/Food-1.42c11a09.png",Y=i.p+"img/Food-2.e8ea151e.png",J=i.p+"img/Food-3.64d2adc6.png",Z=i.p+"img/hero-2.a872a9af.png";const ee=e=>((0,n.Qi)("data-v-e80091e8"),e=e(),(0,n.jt)(),e),te={class:"page-loading"},ie=ee((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),ae=[ie],se={class:"page"},ne={class:"page__container"},oe=(0,n.Fv)('<div class="page__logo" data-v-e80091e8><img class="image page__logo-img" src="'+K+'" alt="Корми котов" data-v-e80091e8></div><img class="image page__img-1" src="'+U+'" data-v-e80091e8><img class="image page__img-2" src="'+Y+'" data-v-e80091e8><img class="image page__img-3" src="'+J+'" data-v-e80091e8><img class="image page__img-4" src="'+Z+'" data-v-e80091e8>',5),re={class:"page__button"};function ce(e,t,i,s,o,r){return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)((0,n.Lk)("div",te,ae,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",se,[(0,n.Lk)("div",ne,[oe,(0,n.Lk)("div",re,[(0,n.Lk)("div",{class:"button green",onClick:t[0]||(t[0]=(...e)=>r.onClickStart&&r.onClickStart(...e))},"Кормить котов"),(0,n.Lk)("div",{class:"button blue",onClick:t[1]||(t[1]=(...e)=>r.onClickToRules&&r.onClickToRules(...e))},"Правила игры")])])],512),[[a.aG,!o.loading]])],64)}var de={data(){return{imagesLoaded:0,totalImages:5,loading:!0}},computed:{},methods:{onClickStart(){const e=i(66);console.log("");const t=new Audio(e);t.play().catch((e=>{console.error("Error playing sound:",e)}));const a=h();a.setScreen("city")},onClickToRules(){const e=h();e.setScreen("rules")},imageLoaded(){this.imagesLoaded+=1,this.imagesLoaded>=this.totalImages&&setTimeout((()=>{this.loading=!1}),1e3)},checkImages(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.complete?this.imageLoaded():(e.addEventListener("load",this.imageLoaded),e.addEventListener("error",this.imageLoaded))}))}},mounted(){this.checkImages()},beforeUnmount(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.removeEventListener("load",this.imageLoaded),e.removeEventListener("error",this.imageLoaded)}))}};const le=(0,T.A)(de,[["render",ce],["__scopeId","data-v-e80091e8"]]);var he=le,pe=i(802),ue=i(6344),ge=i(3946);const me=e=>((0,n.Qi)("data-v-9b1368e2"),e=e(),(0,n.jt)(),e),ve={class:"page"},fe={class:"page__container page__container--loading"},ke=me((()=>(0,n.Lk)("span",{class:"loader"},null,-1))),_e=[ke],ye={class:"page__container"},be=me((()=>(0,n.Lk)("div",{class:"page__header"},[(0,n.Lk)("h1",{class:"page__title"},"Выберите город")],-1))),we={class:"page__content"},Le={class:"page__grid"},Ce={class:"page__card-wrap"},Se=me((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Москва",-1))),Ge={class:"page__card-wrap"},xe=me((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Стамбул",-1))),Ie={class:"page__card-wrap"},Oe=me((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Минск",-1))),Ee={class:"page__card-wrap"},Pe=me((()=>(0,n.Lk)("p",{class:"page__card-caption"},"Минимализм",-1))),$e={class:"page__button"};function Me(e,t,i,s,o,r){return(0,n.uX)(),(0,n.CE)("div",ve,[(0,n.bo)((0,n.Lk)("div",fe,_e,512),[[a.aG,o.loading]]),(0,n.bo)((0,n.Lk)("div",ye,[be,(0,n.Lk)("div",we,[(0,n.Lk)("div",Le,[(0,n.Lk)("div",Ce,[(0,n.Lk)("div",{class:"page__card",onClick:t[1]||(t[1]=e=>r.onClickCity("Moscow"))},[(0,n.Lk)("img",{class:"image page__card-img",src:pe,alt:"",onLoad:t[0]||(t[0]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),Se]),(0,n.Lk)("div",Ge,[(0,n.Lk)("div",{class:"page__card",onClick:t[3]||(t[3]=e=>r.onClickCity("Istanbul"))},[(0,n.Lk)("img",{class:"image page__card-img",src:ue,alt:"",onLoad:t[2]||(t[2]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),xe]),(0,n.Lk)("div",Ie,[(0,n.Lk)("div",{class:"page__card",onClick:t[5]||(t[5]=e=>r.onClickCity("Minsk"))},[(0,n.Lk)("img",{class:"image page__card-img",src:ge,alt:"",onLoad:t[4]||(t[4]=(...e)=>r.imageLoaded&&r.imageLoaded(...e))},null,32)]),Oe]),(0,n.Lk)("div",Ee,[(0,n.Lk)("div",{class:"page__card",onClick:t[6]||(t[6]=e=>r.onClickCity(null))}),Pe])])]),(0,n.Lk)("div",$e,[(0,n.Lk)("button",{class:"button red",onClick:t[7]||(t[7]=(...e)=>r.onClickBack&&r.onClickBack(...e))},"Назад")])],512),[[a.aG,!o.loading]])])}var Te={data(){return{imagesLoaded:0,totalImages:3,loading:!0}},computed:{},methods:{onClickCity(e){const t=h();t.setCity(e),t.setScreen("game")},onClickBack(){const e=h();e.setScreen("start")},imageLoaded(){this.imagesLoaded+=1,this.imagesLoaded>=this.totalImages&&setTimeout((()=>{this.loading=!1}),1e3)},checkImages(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.complete?this.imageLoaded():(e.addEventListener("load",this.imageLoaded),e.addEventListener("error",this.imageLoaded))}))}},mounted(){this.checkImages()},beforeUnmount(){const e=document.querySelectorAll(".image");e.forEach((e=>{e.removeEventListener("load",this.imageLoaded),e.removeEventListener("error",this.imageLoaded)}))},watch:{}};const ze=(0,T.A)(Te,[["render",Me],["__scopeId","data-v-9b1368e2"]]);var Ne=ze;const Fe={class:"page"},Re={class:"page__container"},We=(0,n.Fv)('<h1 class="page_title" data-v-ece3afdc>Правила игры</h1><ol class="page__list" data-v-ece3afdc><li class="page__item" data-v-ece3afdc>1. «Тап», чтобы лететь. Остальное сделает гравитация.</li><li class="page__item" data-v-ece3afdc>2. Собирайте кошачий корм во время полета.</li><li class="page__item" data-v-ece3afdc>3. Спускайтесь на землю и кормите бездомных котиков</li></ol>',2),Ae={class:"page__button"};function Xe(e,t,i,a,s,o){return(0,n.uX)(),(0,n.CE)("div",Fe,[(0,n.Lk)("div",Re,[We,(0,n.Lk)("div",Ae,[(0,n.Lk)("button",{class:"button yellow",onClick:t[0]||(t[0]=(...e)=>o.onClickBack&&o.onClickBack(...e))}," Назад ")])])])}var je={data(){return{}},computed:{},methods:{onClickBack(){const e=h();e.setScreen("start")}},mounted(){},beforeUnmount(){},watch:{}};const Be=(0,T.A)(je,[["render",Xe],["__scopeId","data-v-ece3afdc"]]);var He=Be,Qe={name:"App",components:{GameField:q,GameStart:he,GameCity:Ne,GameRules:He},computed:{...(0,s.aH)(h,["screens"])},methods:{}};const De=(0,T.A)(Qe,[["render",d]]);var Ve=De,qe={name:"App",components:{GameScreen:Ve}};const Ke=(0,T.A)(qe,[["render",r]]);var Ue=Ke;const Ye=(0,a.Ef)(Ue),Je=(0,s.Ey)();Ye.use(Je),Ye.mount("#app"),setTimeout((()=>{let e=.01*window.innerHeight-.01;document.documentElement.style.setProperty("--vh",`${e}px`)}),100)},66:function(e,t,i){e.exports=i.p+"media/meow.7ba9b74b.wav"},6344:function(e,t,i){e.exports=i.p+"img/Istanbul.32ec375c.png"},3946:function(e,t,i){e.exports=i.p+"img/Minsk.338426cc.png"},802:function(e,t,i){e.exports=i.p+"img/Moscow.8faef8a0.png"}},t={};function i(a){var s=t[a];if(void 0!==s)return s.exports;var n=t[a]={exports:{}};return e[a].call(n.exports,n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,a,s,n){if(!a){var o=1/0;for(l=0;l<e.length;l++){a=e[l][0],s=e[l][1],n=e[l][2];for(var r=!0,c=0;c<a.length;c++)(!1&n||o>=n)&&Object.keys(i.O).every((function(e){return i.O[e](a[c])}))?a.splice(c--,1):(r=!1,n<o&&(o=n));if(r){e.splice(l--,1);var d=s();void 0!==d&&(t=d)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[a,s,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.p="/feed-the-cat/"}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,n,o=a[0],r=a[1],c=a[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(s in r)i.o(r,s)&&(i.m[s]=r[s]);if(c)var l=c(i)}for(t&&t(a);d<o.length;d++)n=o[d],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(l)},a=self["webpackChunkfeed_the_cat"]=self["webpackChunkfeed_the_cat"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=i.O(void 0,[504],(function(){return i(3140)}));a=i.O(a)})();
//# sourceMappingURL=app.b08103e3.js.map