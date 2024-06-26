(function(){"use strict";var e={208:function(e,t,i){var s=i(5130),n=i(9005),a=i(6768);const r={id:"app"};function o(e,t,i,s,n,o){const c=(0,a.g2)("GameScreen");return(0,a.uX)(),(0,a.CE)("div",r,[(0,a.bF)(c)])}const c={id:"app"};function l(e,t,i,s,n,r){const o=(0,a.g2)("GameStart"),l=(0,a.g2)("GameCity"),d=(0,a.g2)("GameField"),h=(0,a.g2)("GameRules");return(0,a.uX)(),(0,a.CE)("div",c,[e.screens.start?((0,a.uX)(),(0,a.Wv)(o,{key:0})):(0,a.Q3)("",!0),e.screens.city?((0,a.uX)(),(0,a.Wv)(l,{key:1})):(0,a.Q3)("",!0),e.screens.game?((0,a.uX)(),(0,a.Wv)(d,{key:2})):(0,a.Q3)("",!0),e.screens.rules?((0,a.uX)(),(0,a.Wv)(h,{key:3})):(0,a.Q3)("",!0)])}i(4114);var d=i(794);const h=(0,n.nY)("game",{state:()=>({birdPosition:{x:100,y:300},birdSize:{width:60,height:60},birdVelocity:0,gravity:.5,isGameOver:!1,isFinalNotice:!1,isGameRunning:!1,pipes:[],pipeSize:{width:80,gap:200},rewards:[],rewardSize:{width:60,height:60},score:0,moveSpeed:4,gameInterval:null,currentCityName:"",screens:{start:!0,game:!1,city:!1,rules:!1}}),actions:{setScreen(e){Object.keys(this.screens).forEach((e=>{this.screens[e]=!1})),this.screens[e]=!0},setPipeWidth(){const e=window.innerHeight,t=100/844;this.pipeSize.width=e*t},fly(){this.isGameRunning||(this.isGameRunning=!0),this.birdVelocity=-8},fall(){if(this.isGameOver||!this.isGameRunning)return;this.birdVelocity+=this.gravity,this.birdPosition.y+=this.birdVelocity;const e=window.innerHeight;if(this.birdPosition.y>e-this.birdSize.height||this.birdPosition.y<0)return this.playSound("./audio/hit.wav"),void this.endGame();const t=this.birdPosition.x+this.birdSize.width,i=this.birdPosition.y+this.birdSize.height;for(const s of this.pipes){const e=s.x+this.pipeSize.width,n=s.height,a=s.height+this.pipeSize.gap,r=this.birdPosition.x<e&&t>s.x,o=this.birdPosition.y>n&&i<a;if(r&&!o)return this.playSound("./audio/hit.wav"),void this.endGame()}this.rewards=this.rewards.filter((e=>{const t=this.birdPosition.x+this.birdSize.width,i=this.birdPosition.y+this.birdSize.height,s=e.x+this.rewardSize.width,n=e.y+this.rewardSize.height,a=this.birdPosition.x<s&&t>e.x,r=this.birdPosition.y<n&&i>e.y;return!a||!r||(this.playSound("./audio/point.wav"),this.score+=1,!1)})),this.moveElements()},moveElements(){this.pipes.forEach((e=>{e.x-=this.moveSpeed})),this.pipes.length&&this.pipes[0].x+this.pipeSize.width<0&&this.pipes.shift(),(!this.pipes.length||this.pipes[this.pipes.length-1].x<window.innerWidth-400)&&this.spawnPipe(),(0===this.rewards.length||this.rewards[this.rewards.length-1].x<window.innerWidth-500)&&this.spawnReward(),this.rewards.forEach((e=>{e.x-=this.moveSpeed})),this.rewards=this.rewards.filter((e=>e.x+this.rewardSize.width>0))},spawnPipe(){const e=Math.floor(Math.random()*(window.innerHeight-this.pipeSize.gap-100))+50;this.pipes.push({x:window.innerWidth,height:e})},spawnReward(){const e=200;let t,i,s,n=0;do{if(n>=e)return;t=window.innerWidth,i=Math.floor(Math.random()*(window.innerHeight-this.rewardSize.height)),s=!1;const a=t+this.rewardSize.width,r=i+this.rewardSize.height;console.log(`Attempt ${n}: Reward [${t}, ${i}] Size: [${this.rewardSize.width}, ${this.rewardSize.height}]`);for(const e of this.pipes){const n=e.x+this.pipeSize.width,o=e.height,c=e.height+this.pipeSize.gap;console.log(`Pipe: [${e.x}, ${e.height}] Width: ${this.pipeSize.width}`);const l=t<n&&a>e.x&&i<o,d=t<n&&a>e.x&&r>c;if(l||d){console.log(`Collision with pipe detected at [${e.x}, ${e.height}]`),s=!0;break}}if(!s)for(const e of this.rewards){const n=e.x+this.rewardSize.width,o=e.y+this.rewardSize.height;if(t<n&&a>e.x&&i<o&&r>e.y){console.log("Collision with another reward detected"),s=!0;break}}n++}while(s);s||this.rewards.push({id:(0,d.A)(),x:t,y:i})},playSound(e){const t=new Audio(e);t.play().catch((e=>{console.error("Error playing sound:",e)}))},endGame(){this.isGameOver=!0,this.isGameRunning=!1,this.birdVelocity=0,clearInterval(this.gameInterval),setTimeout((()=>{this.playSound("./audio/die.wav")}),100),this.animateFall()},animateFall(){const e=8,t=this.birdPosition.y-40,i=5,s=setInterval((()=>{this.birdPosition.y>t?this.birdPosition.y-=i:(clearInterval(s),setTimeout((()=>{const t=setInterval((()=>{this.birdPosition.y+=e,this.birdPosition.y>window.innerHeight+50&&(clearInterval(t),this.isFinalNotice=!0)}),20)}),0))}),20)},resetGame(){this.playSound("./audio/swoosh.wav"),this.birdPosition={x:100,y:300},this.birdVelocity=0,this.isGameOver=!1,this.isFinalNotice=!1,this.isGameRunning=!1,this.pipes=[],this.rewards=[],this.score=0,this.gravity=.5,this.spawnPipe(),clearInterval(this.gameInterval)},startGame(){this.resetGame(),this.gameInterval=setInterval((()=>{this.isGameRunning&&this.fall()}),20)},setCity(e){this.currentCityName=e},resetState(){this.screens={start:!0,game:!1,city:!1},clearInterval(this.gameInterval)}},getters:{getPipeWidth:e=>e.pipeSize.width}});var p=i(4232),u=i.p+"img/rule.8af39a5a.png";const g=e=>((0,a.Qi)("data-v-3a3a965e"),e=e(),(0,a.jt)(),e),m={class:"page__outline"},v={class:"page__reminder"},f=g((()=>(0,a.Lk)("img",{class:"page__reminder-img",src:u,alt:""},null,-1))),k=[f],w={class:"notice"},y={class:"notice__container"},_={class:"notice__title"},b={class:"notice__description",style:{"text-align":"center"}},C=g((()=>(0,a.Lk)("br",null,null,-1))),S=g((()=>(0,a.Lk)("br",null,null,-1)));function x(e,t,i,n,r,o){const c=(0,a.g2)("GameBird"),l=(0,a.g2)("GamePipe"),d=(0,a.g2)("GameReward");return(0,a.uX)(),(0,a.CE)("div",{class:"page",onMousedown:t[4]||(t[4]=(...e)=>o.handleInteraction&&o.handleInteraction(...e)),onTouchstart:t[5]||(t[5]=(...e)=>o.handleInteraction&&o.handleInteraction(...e)),onTouchmove:t[6]||(t[6]=(0,s.D$)((()=>{}),["prevent"])),onTouchend:t[7]||(t[7]=(0,s.D$)((()=>{}),["prevent"]))},[(0,a.bo)((0,a.Lk)("div",m,null,512),[[s.aG,!e.isGameRunning&&!e.isGameOver]]),(0,a.Lk)("div",{class:"page__background",style:(0,p.Tr)(o.backgroundStyle)},null,4),(0,a.bF)(c),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.pipes,((e,t)=>((0,a.uX)(),(0,a.Wv)(l,{key:t,x:e.x,y:e.y,height:e.height},null,8,["x","y","height"])))),128)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.rewards,(e=>((0,a.uX)(),(0,a.Wv)(d,{key:e.id,x:e.x,y:e.y},null,8,["x","y"])))),128)),(0,a.bo)((0,a.Lk)("div",v,k,512),[[s.aG,!e.isGameRunning&&!e.isGameOver]]),(0,a.bo)((0,a.Lk)("div",{class:"page__caption"}," Собрано: "+(0,p.v_)(e.score),513),[[s.aG,!e.isFinalNotice]]),(0,a.bo)((0,a.Lk)("div",w,[(0,a.Lk)("div",y,[(0,a.Lk)("p",_,(0,p.v_)(e.score?o.finalMessage.title:"Коту под хвост"),1),(0,a.bo)((0,a.Lk)("p",{class:"notice__description"},(0,p.v_)(o.finalMessage.description),513),[[s.aG,e.score]]),(0,a.bo)((0,a.Lk)("p",b,[(0,a.eW)(" Вы не успели ничего собрать. "),C,S,(0,a.eW)(" Не страшно! Попробуйте ещё раз ")],512),[[s.aG,!e.score]]),(0,a.Lk)("div",{class:"button yellow",onMousedown:t[0]||(t[0]=(...e)=>o.startGame&&o.startGame(...e)),onTouchstart:t[1]||(t[1]=(...e)=>o.startGame&&o.startGame(...e))}," Ещё раз ",32),(0,a.Lk)("div",{class:"button red",onMousedown:t[2]||(t[2]=(...e)=>o.onClickToMenu&&o.onClickToMenu(...e)),onTouchstart:t[3]||(t[3]=(...e)=>o.onClickToMenu&&o.onClickToMenu(...e))}," Уйти ",32)])],512),[[s.aG,e.isFinalNotice]])],32)}const G=e=>((0,a.Qi)("data-v-188b5769"),e=e(),(0,a.jt)(),e),L=G((()=>(0,a.Lk)("div",{class:"moving__border"},[(0,a.Lk)("div",{class:"moving__image"})],-1))),I=[L];function $(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",{class:"moving",style:(0,p.Tr)(r.birdStyle)},I,4)}var O={computed:{...(0,n.aH)(h,["birdPosition"]),birdStyle(){return{left:`${this.birdPosition.x}px`,top:`${this.birdPosition.y}px`,position:"absolute"}}}},P=i(1241);const M=(0,P.A)(O,[["render",$],["__scopeId","data-v-188b5769"]]);var z=M;function T(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("div",{class:(0,p.C4)(["pipe-top",r.pipeColorClass]),style:(0,p.Tr)(r.pipeTopStyle)},null,6),(0,a.Lk)("div",{class:(0,p.C4)(["pipe-bottom",r.pipeColorClass]),style:(0,p.Tr)(r.pipeBottomStyle)},null,6)])}var N={props:["x","height"],computed:{...(0,n.aH)(h,["currentCityName"]),pipeWidth(){const e=h();return e.getPipeWidth},pipeTopStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`${this.height}px`,top:0}},pipeBottomStyle(){return{width:`${this.pipeWidth}px`,left:`${this.x}px`,height:`calc((var(--vh, 1vh)*100) - ${this.height+200}px)`,top:`${this.height+200}px`}},pipeColorClass(){const e={Minsk:"pipe-green",Moscow:"pipe-red",Istanbul:"pipe-red"};return e[this.currentCityName]||"pipe-green"}}};const E=(0,P.A)(N,[["render",T],["__scopeId","data-v-5ae0d2e8"]]);var R=E;function W(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",{class:(0,p.C4)(["reward","reward-"+n.selectedImage]),style:(0,p.Tr)(r.rewardStyle)},null,6)}const X=[1,2,3];var F={props:["x","y"],data(){return{selectedImage:null}},created(){this.selectedImage=X[Math.floor(Math.random()*X.length)]},computed:{rewardStyle(){return{left:`${this.x}px`,top:`${this.y}px`,width:"60px",height:"60px",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}}};const A=(0,P.A)(F,[["render",W],["__scopeId","data-v-bff8a9fa"]]);var j=A,B={components:{GameBird:z,GamePipe:R,GameReward:j},data(){return{backgroundOpacity:1,backgroundContrast:.8,touchStartTime:null,lastInteractionTime:0,interactionDelay:100}},computed:{finalMessages(){return[{title:"Только у кошек девять жизней",description:`Ваш парашют не раскрылся, и вы упали на старушку. Хорошая новость – неравнодушные прохожие отдали собранную еду ${this.score} ${this.declOfNum(this.score,["коту","котам","котам"])}. Плохая – у старушки не было завещания.`},{title:"Путь к сердцу кота лежит через желудок",description:`Вам удалось перезапустить реактивный ранец у самой земли и успешно сесть. Результат: ${this.declOfNum(this.score,["накормлен","накормлены","накормлено"])} ${this.score} ${this.declOfNum(this.score,["кот","кота","котов"])}`},{title:"Держись, котик, я иду",description:`Падая, вы успели заметить кота на крыше и бросили ему корм. ${this.declOfNum(this.score-1,["Оставшийся","Оставшиеся","Оставшиеся"])} ${this.score-1} ${this.declOfNum(this.score-1,["припас","припаса","припасов"])} ${this.declOfNum(this.score-1,["канул","канули","канули"])} в Лету вместе с вами. К сожалению, вы не умели плавать. `},{title:"Я кота (не) накормлю",description:`Приземлившись на городскую площадь, вы были атакованы всеядными голубями. Ну а что, ${this.score} ${this.declOfNum(this.score,["сытая птица","сытые птицы","сытых птиц"])} – тоже рекорд. `},{title:"Котопокалипсис сегодня",description:`Шутка! Не случилось ровным счётом ничего плохого. Вы удачно приземляетесь и получаете ${this.score} «мяу» от ${this.score} ${this.declOfNum(this.score,["сытого кота","сытых котов","сытых котов"])}.`},{title:"В кототерии что-то перепутали",description:`Кое-как добравшись до земли, вы были рады выставить ${this.score} ${this.declOfNum(this.score,["полную миску","полных миски","полных мисок"])} отборного корма перед довольными котами. Правда, надев очки, вы поняли, что кормите опоссумов. `},{title:"Поймай, если сможешь",description:"Из-за неисправного ранца вы крутились в воздухе так, что собранный корм разлетелся по всему городу. Интересно, достанется ли он котам? Количество накормленных: неизвестно."},{title:"Ты не пройдешь",description:`…мимо голодного кота. На земле вас встречает ${this.score} ${this.declOfNum(this.score,["пушистик","пушистика","пушистиков"])} – и ${this.score>1?"каждый":""} получает своё угощение. «Мур» еще никогда не был таким приятным.`}]},finalMessage(){return this.finalMessages[Math.floor(Math.random()*this.finalMessages.length)]},...(0,n.aH)(h,["pipes","rewards","score","isGameOver","isGameRunning","level","currentCityName","isFinalNotice"]),backgroundImages(){return{Moscow:i(802),Istanbul:i(6344),Minsk:i(3946)}},backgroundStyle(){if(this.currentCityName){const e=this.backgroundImages[this.currentCityName]||this.backgroundImages.Moscow;return{"--background-opacity":this.backgroundOpacity,"--background-contrast":this.backgroundContrast,"background-image":`url(${e})`}}return{background:"#f0c040"}}},methods:{handleInteraction(e){if(this.isGameOver)return;e.preventDefault();const t=Date.now();t-this.lastInteractionTime<this.interactionDelay||(this.lastInteractionTime=t,this.fly())},fly(){const e=h();this.isGameOver||e.fly()},startGame(){const e=h();e.setPipeWidth(),e.startGame()},startNextLevel(){this.startGame()},declOfNum(e,t){return t[e%10===1&&e%100!==11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2]},onClickToMenu(){const e=h();e.resetState()}},mounted(){this.startGame()},beforeUnmount(){const e=h();clearInterval(e.gameInterval)},watch:{isGameOver(e){const t=h();e&&clearInterval(t.gameInterval)},isGameRunning(e){const t=h();e||clearInterval(t.gameInterval)}}};const H=(0,P.A)(B,[["render",x],["__scopeId","data-v-3a3a965e"]]);var Q=H,D=i.p+"img/logo-2.77525470.png";const V=e=>((0,a.Qi)("data-v-2a64d5d4"),e=e(),(0,a.jt)(),e),U={class:"page"},K={class:"page__container"},Y=V((()=>(0,a.Lk)("div",{class:"page__logo"},[(0,a.Lk)("img",{class:"page__logo-img",src:D,alt:"Корми котов"})],-1))),q={class:"page__button"};function J(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",U,[(0,a.Lk)("div",K,[Y,(0,a.Lk)("div",q,[(0,a.Lk)("div",{class:"button green",onClick:t[0]||(t[0]=(...e)=>r.onClickStart&&r.onClickStart(...e))},"Кормить котов"),(0,a.Lk)("div",{class:"button blue",onClick:t[1]||(t[1]=(...e)=>r.onClickToRules&&r.onClickToRules(...e))},"Правила игры")])])])}var Z={data(){return{}},computed:{},methods:{onClickStart(){const e=i(66);console.log("");const t=new Audio(e);t.play().catch((e=>{console.error("Error playing sound:",e)}));const s=h();s.setScreen("city")},onClickToRules(){const e=h();e.setScreen("rules")}}};const ee=(0,P.A)(Z,[["render",J],["__scopeId","data-v-2a64d5d4"]]);var te=ee,ie=i(802),se=i(6344),ne=i(3946);const ae=e=>((0,a.Qi)("data-v-36acc361"),e=e(),(0,a.jt)(),e),re={class:"page"},oe={class:"page__container"},ce=ae((()=>(0,a.Lk)("div",{class:"page__header"},[(0,a.Lk)("h1",{class:"page__title"},"Выберите город")],-1))),le={class:"page__content"},de={class:"page__grid"},he={class:"page__card-wrap"},pe=ae((()=>(0,a.Lk)("img",{class:"page__card-img",src:ie,alt:""},null,-1))),ue=[pe],ge=ae((()=>(0,a.Lk)("p",{class:"page__card-caption"},"Москва",-1))),me={class:"page__card-wrap"},ve=ae((()=>(0,a.Lk)("img",{class:"page__card-img",src:se,alt:""},null,-1))),fe=[ve],ke=ae((()=>(0,a.Lk)("p",{class:"page__card-caption"},"Стамбул",-1))),we={class:"page__card-wrap"},ye=ae((()=>(0,a.Lk)("img",{class:"page__card-img",src:ne,alt:""},null,-1))),_e=[ye],be=ae((()=>(0,a.Lk)("p",{class:"page__card-caption"},"Минск",-1))),Ce={class:"page__card-wrap"},Se=ae((()=>(0,a.Lk)("p",{class:"page__card-caption"},"Ничего",-1))),xe={class:"page__button"};function Ge(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",re,[(0,a.Lk)("div",oe,[ce,(0,a.Lk)("div",le,[(0,a.Lk)("div",de,[(0,a.Lk)("div",he,[(0,a.Lk)("div",{class:"page__card",onClick:t[0]||(t[0]=e=>r.onClickCity("Moscow"))},ue),ge]),(0,a.Lk)("div",me,[(0,a.Lk)("div",{class:"page__card",onClick:t[1]||(t[1]=e=>r.onClickCity("Istanbul"))},fe),ke]),(0,a.Lk)("div",we,[(0,a.Lk)("div",{class:"page__card",onClick:t[2]||(t[2]=e=>r.onClickCity("Minsk"))},_e),be]),(0,a.Lk)("div",Ce,[(0,a.Lk)("div",{class:"page__card",onClick:t[3]||(t[3]=e=>r.onClickCity(null))}),Se])])]),(0,a.Lk)("div",xe,[(0,a.Lk)("button",{class:"button red",onClick:t[4]||(t[4]=(...e)=>r.onClickBack&&r.onClickBack(...e))}," Назад ")])])])}var Le={data(){return{}},computed:{},methods:{onClickCity(e){const t=h();t.setCity(e),t.setScreen("game")},onClickBack(){const e=h();e.setScreen("start")}},mounted(){},beforeUnmount(){},watch:{}};const Ie=(0,P.A)(Le,[["render",Ge],["__scopeId","data-v-36acc361"]]);var $e=Ie;const Oe={class:"page"},Pe={class:"page__container"},Me=(0,a.Fv)('<h1 class="page_title" data-v-ece3afdc>Правила игры</h1><ol class="page__list" data-v-ece3afdc><li class="page__item" data-v-ece3afdc>1. «Тап», чтобы лететь. Остальное сделает гравитация.</li><li class="page__item" data-v-ece3afdc>2. Собирайте кошачий корм во время полета.</li><li class="page__item" data-v-ece3afdc>3. Спускайтесь на землю и кормите бездомных котиков</li></ol>',2),ze={class:"page__button"};function Te(e,t,i,s,n,r){return(0,a.uX)(),(0,a.CE)("div",Oe,[(0,a.Lk)("div",Pe,[Me,(0,a.Lk)("div",ze,[(0,a.Lk)("button",{class:"button yellow",onClick:t[0]||(t[0]=(...e)=>r.onClickBack&&r.onClickBack(...e))}," Назад ")])])])}var Ne={data(){return{}},computed:{},methods:{onClickBack(){const e=h();e.setScreen("start")}},mounted(){},beforeUnmount(){},watch:{}};const Ee=(0,P.A)(Ne,[["render",Te],["__scopeId","data-v-ece3afdc"]]);var Re=Ee,We={name:"App",components:{GameField:Q,GameStart:te,GameCity:$e,GameRules:Re},computed:{...(0,n.aH)(h,["screens"])},methods:{}};const Xe=(0,P.A)(We,[["render",l]]);var Fe=Xe,Ae={name:"App",components:{GameScreen:Fe}};const je=(0,P.A)(Ae,[["render",o]]);var Be=je;const He=(0,s.Ef)(Be),Qe=(0,n.Ey)();He.use(Qe),He.mount("#app"),setTimeout((()=>{let e=.01*window.innerHeight-.01;document.documentElement.style.setProperty("--vh",`${e}px`)}),100)},66:function(e,t,i){e.exports=i.p+"media/meow.7ba9b74b.wav"},6344:function(e,t,i){e.exports=i.p+"img/Istanbul.32ec375c.png"},3946:function(e,t,i){e.exports=i.p+"img/Minsk.338426cc.png"},802:function(e,t,i){e.exports=i.p+"img/Moscow.8faef8a0.png"}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,i),a.exports}i.m=e,function(){var e=[];i.O=function(t,s,n,a){if(!s){var r=1/0;for(d=0;d<e.length;d++){s=e[d][0],n=e[d][1],a=e[d][2];for(var o=!0,c=0;c<s.length;c++)(!1&a||r>=a)&&Object.keys(i.O).every((function(e){return i.O[e](s[c])}))?s.splice(c--,1):(o=!1,a<r&&(r=a));if(o){e.splice(d--,1);var l=n();void 0!==l&&(t=l)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[s,n,a]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.p="/feed-the-cat/"}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,a,r=s[0],o=s[1],c=s[2],l=0;if(r.some((function(t){return 0!==e[t]}))){for(n in o)i.o(o,n)&&(i.m[n]=o[n]);if(c)var d=c(i)}for(t&&t(s);l<r.length;l++)a=r[l],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(d)},s=self["webpackChunkfeed_the_cat"]=self["webpackChunkfeed_the_cat"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=i.O(void 0,[504],(function(){return i(208)}));s=i.O(s)})();
//# sourceMappingURL=app.3bb32e84.js.map