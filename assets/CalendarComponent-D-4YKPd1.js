import{S as M,P,A as z,d as w}from"./AuthorizationModal-4Ec12IYr.js";import{addNotification as u}from"./NotificationMessage-CwH6bAUn.js";import{_ as N,r as y,o as d,c,a as v,b as o,d as b,t as m,w as g,F as C,e as R,f as D,n as k}from"./index-1a4n7O1I.js";const _={name:"CalendarComponent",emits:["update-editing-mode"],components:{ShiftCountWindow:M,PeopleListWindow:P,AuthorizationModal:z},props:{isEditingMode:{type:Boolean,required:!0}},data(){return{selectedMonth:new Date().getMonth(),selectedYear:new Date().getFullYear(),monthDays:[],localData:{},syncedChanges:{},daysOfWeek:w,currentDate:new Date,people:[{id:1,name:"Milena",ratownik:!1},{id:2,name:"Mikołaj",ratownik:!1},{id:3,name:"Aleksandra",ratownik:!1},{id:4,name:"Łukasz",ratownik:!0},{id:5,name:"Joanna",ratownik:!1},{id:6,name:"Natalia",ratownik:!0},{id:7,name:"Marcin",ratownik:!0},{id:8,name:"Alina",ratownik:!1},{id:9,name:"Ewelina",ratownik:!1},{id:7,name:"Teresa",ratownik:!1}],madeChanges:!1,showPasswordModal:!1,password:"",locale:"pl",scrollContainer:null,currentDropTarget:{date:null,shiftType:null},showMobileWarning:!1,isMobileDevice:!1}},computed:{monthYear(){return new Date(this.selectedYear,this.selectedMonth).toLocaleString(this.locale,{month:"long",year:"numeric"})}},methods:{handleDrop(n,e){const a=JSON.parse(localStorage.getItem("draggedPerson"));if(!a)return;const s=this.monthDays.find(S=>S.date.toDateString()===n.toDateString()),r={...s,[e]:a.id};if(r.dayShift1!=null&&r.dayShift2!=null&&r.dayShift1===r.dayShift2||r.nightShift1!=null&&r.nightShift2!=null&&r.nightShift1===r.nightShift2){u("Ta sama osoba na obydwu zmianach.","red");return}const i=a.ratownik;let l=!1;switch(e){case"dayShift1":l=s.dayShift2Ratownik;break;case"dayShift2":l=s.dayShift1Ratownik;break;case"nightShift1":l=s.nightShift2Ratownik;break;case"nightShift2":l=s.nightShift1Ratownik;break}if(i&&l){u("Nie można przypisać dwóch ratowników na jedną zmianę.","red");return}s[e]=a.id,s[`${e}Name`]=a.name,s[`${e}Ratownik`]=a.ratownik,s[`${e}UserChanged`]=!0;const f={dayShift1:s.dayShift1,dayShift2:s.dayShift2,nightShift1:s.nightShift1,nightShift2:s.nightShift2};this.localData[n.toDateString()]=f,localStorage.setItem(n.toDateString(),JSON.stringify(f)),this.madeChanges=!0,localStorage.removeItem("draggedPerson")},handlePointerMove(n,e,a){this.currentDropTarget={date:e,shiftType:a},n.preventDefault()},handlePointerEnd(n,e,a){JSON.parse(localStorage.getItem("draggedPerson"))&&(this.handleDrop(e,a),this.currentDropTarget={date:null,shiftType:null})},isDropTarget(n,e){return this.currentDropTarget.date?this.currentDropTarget.date.toDateString()===n.toDateString()&&this.currentDropTarget.shiftType===e:!1},handleClickResetShift(n,e){if(n[e]!==null){n[e]=null,n[e+"Name"]="Usunięto",n[e+"Ratownik"]=null,n[e+"UserChanged"]=!0;const a={dayShift1:n.dayShift1,dayShift2:n.dayShift2,nightShift1:n.nightShift1,nightShift2:n.nightShift2};this.localData[n.date.toDateString()]=a,localStorage.setItem(n.date.toDateString(),JSON.stringify(a)),n[e]="Usunięto",this.madeChanges=!0}},resolvePersonName(n){const e=this.people.find(a=>a.id===n);return e?{name:e.name,isRatownik:e.ratownik}:{name:void 0,isRatownik:!1}},generateMonthDays(){const n=this.selectedYear,e=this.selectedMonth,a=new Date(n,e+1,0).getDate();this.monthDays=[];for(let s=1;s<=a;s++)this.monthDays.push({date:new Date(n,e,s),dayShift1:null,dayShift2:null,nightShift1:null,nightShift2:null,dayShift1Name:"Not assigned",dayShift2Name:"Not assigned",nightShift1Name:"Not assigned",nightShift2Name:"Not assigned",isCurrentMonth:!0});this.loadFromLocalStorage()},changeMonth(n){this.madeChanges&&!confirm("You have unsaved changes. Are you sure you want to switch the month? Your changes will be discarded.")||(this.selectedMonth=this.selectedMonth+n,this.generateMonthDays())},emitEditingMode(n){this.$emit("update-editing-mode",n)},async fetchServerShiftData(){this.syncedChanges={};try{const n=await fetch("https://mc.kot.li/?key=shiftData.json",{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw n.status===404&&u("Data not found on server","red"),new Error(`Failed to fetch data from server: ${n.status}`);return await n.json()}catch(n){return console.error("Error fetching data from server:",n),u("Failed to fetch data from server","red"),null}},async checkShiftDataSync(){this.resetSyncedChangesSessionStorage();const n=await this.fetchServerShiftData();if(!n){console.log("No remote data fetched.");return}const e={};for(const[a,s]of Object.entries(n)){const r=localStorage.getItem(a),i=r?JSON.parse(r):null,l={};if(!i)e[a]={...s},localStorage.setItem(a,JSON.stringify(s));else{for(const[f,S]of Object.entries(s)){const t=i[f]||null;t!==S&&(l[f]={from:t||"Empty",to:S||"Empty"})}Object.keys(l).length>0&&(e[a]=l),localStorage.setItem(a,JSON.stringify(s))}}this.generateMonthDays(),this.syncedChanges=e,console.log("Updated syncedChanges:",this.syncedChanges),sessionStorage.setItem("syncedChanges",JSON.stringify(this.syncedChanges)),setTimeout(()=>{console.log("Clearing syncedChanges."),this.syncedChanges={},sessionStorage.removeItem("syncedChanges")},5e3)},loadFromLocalStorage(){const n=this.selectedYear,e=this.selectedMonth;for(let a=1;a<=31;a++){const s=new Date(n,e,a).toDateString();if(this.syncedChanges[s])continue;const r=localStorage.getItem(s);if(r)try{const i=JSON.parse(r),l=this.monthDays.find(f=>f.date.toDateString()===s);if(l){l.dayShift1=i.dayShift1,l.dayShift2=i.dayShift2,l.nightShift1=i.nightShift1,l.nightShift2=i.nightShift2;const f=this.resolvePersonName(l.dayShift1);l.dayShift1Name=f.name,l.dayShift1Ratownik=f.isRatownik;const S=this.resolvePersonName(l.dayShift2);l.dayShift2Name=S.name,l.dayShift2Ratownik=S.isRatownik;const t=this.resolvePersonName(l.nightShift1);l.nightShift1Name=t.name,l.nightShift1Ratownik=t.isRatownik;const p=this.resolvePersonName(l.nightShift2);l.nightShift2Name=p.name,l.nightShift2Ratownik=p.isRatownik}}catch(i){u("Failed to load local data: "+i,"red")}}},resetSyncedChangesSessionStorage(){const n=sessionStorage.getItem("syncedChanges");n&&(this.syncedChanges=JSON.parse(n),setTimeout(()=>{this.syncedChanges={},sessionStorage.removeItem("syncedChanges")},5e3))},resetUserChanges(){for(const n in localStorage)if(localStorage.hasOwnProperty(n)){const e=JSON.parse(localStorage.getItem(n)||"{}");(e.dayShift1UserChanged||e.dayShift2UserChanged||e.nightShift1UserChanged||e.nightShift2UserChanged)&&localStorage.removeItem(n)}this.localData={},this.madeChanges=!1},handleScroll(n){this.scrollContainer&&(n.preventDefault(),this.scrollContainer.scrollLeft+=n.deltaY)},getDayClass(n){return w[n]==="Nd"?"nd-color":w[n]==="Sob"?"sob-color":"normal-color"},showPasswordPrompt(){this.showPasswordModal=!0},handleAuthorization(){this.showPasswordModal=!1,this.madeChanges=!1},getShiftAriaLabel(n,e){const a=n[e],s=e.includes("day")?"Zmiana dzienna":"Zmiana nocna",r=n[`${e}Name`];return a?`${s}: ${r}. Kliknij aby usunąć zmianę.`:`${s}: Pusta zmiana. Przeciągnij członka zespołu by nadać im zmianę.`},getShiftTooltip(n,e){const a=n[e],s=e.includes("day")?"Zmiana dzienna":"Zmiana nocna";return a?`${s}: ${n[`${e}Name`]} (Kliknij by usunąć)`:`Przeciągnij członka zespołu by nadać im - ${s.toLowerCase()}`},checkMobilePlatform(){const n=navigator.userAgent||navigator.vendor||window.opera;this.isMobileDevice=/android|iphone|ipad|ipod/i.test(n.toLowerCase())},handleMobileWarningClose(){this.showMobileWarning=!1,this.emitEditingMode(!1)}},async mounted(){this.resetUserChanges(),await this.checkShiftDataSync(),this.scrollContainer=this.$refs.scrollContainer,this.checkMobilePlatform()},watch:{isEditingMode(n){localStorage.setItem("isEditingMode",JSON.stringify(n)),n&&this.isMobileDevice&&(this.showMobileWarning=!0)}}},E=["disabled"],O={key:0,class:"mobile-warning-overlay"},j={class:"mobile-warning"},U={class:"monthChange"},L={style:{"font-weight":"bold",width:"200px !important"},role:"heading","aria-level":"2"},W={class:"top-right-buttons compact-toggle",title:"Przełącz tryb edytowania"},A=["checked"],I=["aria-checked"],T={key:0,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round",class:"pencil-icon"},x={key:1,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round",class:"pencil-icon"},J={class:"calendar-container"},Y={class:"calendar-grid"},Z=["onDrop"],F={class:"day-header"},B=["onDrop"],V={class:"day-date"},K=["clickable","onDrop","onPointerup","onPointermove","onClick","aria-label","title"],q={key:0,class:"assigned-person"},G={key:1,class:"empty-slot"},H=["clickable","onDrop","onPointerup","onPointermove","onClick","aria-label","title"],Q={key:0,class:"assigned-person"},X={key:1,class:"empty-slot"},$=["clickable","onDrop","onPointerup","onPointermove","onClick","aria-label","title"],ee={key:0,class:"assigned-person"},te={key:1,class:"empty-slot"},ne=["clickable","onDrop","onPointerup","onPointermove","onClick","aria-label","title"],ie={key:0,class:"assigned-person"},ae={key:1,class:"empty-slot"},oe={key:1,style:{display:"flex","flex-direction":"column","align-items":"center"}};function se(n,e,a,s,r,i){const l=y("AuthorizationModal"),f=y("PeopleListWindow"),S=y("ShiftCountWindow");return d(),c(C,null,[v(l,{show:r.showPasswordModal,localData:r.localData,onClose:e[0]||(e[0]=t=>r.showPasswordModal=!1),onAuthorized:i.handleAuthorization,"aria-label":"Zapisz zmiany",title:"Zapisz zmiany w harmonogramie"},null,8,["show","localData","onAuthorized"]),o("button",{disabled:!r.madeChanges,onClick:e[1]||(e[1]=(...t)=>i.showPasswordPrompt&&i.showPasswordPrompt(...t)),class:"submit-button","aria-label":"Zapisz zmiany",title:"Zapisz zmiany w harmonogramie"}," Zapisz ",8,E),r.showMobileWarning?(d(),c("div",O,[o("div",j,[e[13]||(e[13]=o("h3",null,"Urządzenie mobilne wykryte",-1)),e[14]||(e[14]=o("p",null," Niestety, tryb edycji kalendarza nie jest obsługiwany na urządzeniach mobilnych. ",-1)),e[15]||(e[15]=o("p",null,"Proszę przejdź do widoku tabelarycznego lub skorzystaj z komputera.",-1)),o("button",{onClick:e[2]||(e[2]=(...t)=>i.handleMobileWarningClose&&i.handleMobileWarningClose(...t)),class:"warning-button"}," Ok :( ")])])):b("",!0),o("section",null,[o("section",U,[o("button",{class:"buttonMonthChange",onClick:e[3]||(e[3]=t=>i.changeMonth(-1)),"aria-label":"Poprzedni miesiąc",title:"Idź do poprzedniego miesiąca"}," ‹ "),o("span",L,m(i.monthYear.toUpperCase()),1),o("button",{class:"buttonMonthChange",onClick:e[4]||(e[4]=t=>i.changeMonth(1)),"aria-label":"Następny miesiąc",title:"Idź do następnego miesiąca"}," › ")]),o("button",{class:"top-right-buttons buttonRefresh",onClick:e[5]||(e[5]=t=>i.checkShiftDataSync()),"aria-label":"Odśwież harmonogram"},e[16]||(e[16]=[o("img",{src:"/assets/icons/refresh.svg",style:{width:"30px",height:"30px",cursor:"pointer"},alt:"Refresh",role:"presentation",title:"Odśwież harmonogram"},null,-1)])),o("label",W,[o("input",{type:"checkbox",checked:a.isEditingMode,onChange:e[6]||(e[6]=t=>i.emitEditingMode(t.target.checked)),"aria-label":"Przełącz tryb edytowania"},null,40,A),o("span",{class:"slider",role:"switch","aria-checked":a.isEditingMode},[a.isEditingMode?(d(),c("svg",x,e[18]||(e[18]=[o("path",{d:"M12 20h9"},null,-1),o("path",{d:"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"},null,-1)]))):(d(),c("svg",T,e[17]||(e[17]=[o("path",{d:"M12 20h9"},null,-1),o("path",{d:"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"},null,-1)])))],8,I)])]),o("div",J,[o("section",{class:"scrollable-container",onWheel:e[12]||(e[12]=g((...t)=>i.handleScroll&&i.handleScroll(...t),["prevent"])),ref:"scrollContainer"},[o("div",Y,[(d(!0),c(C,null,R(r.monthDays,(t,p)=>(d(),c("div",{key:p,class:"day-column",onDragover:e[11]||(e[11]=g(()=>{},["prevent"])),onDrop:h=>i.handleDrop(t.date,"day")},[o("div",null,[o("div",{class:k(["day-cell",{"current-month":t.isCurrentMonth,"nd-color":r.daysOfWeek[t.date.getDay()]==="Nd","sob-color":r.daysOfWeek[t.date.getDay()]==="Sob"}])},[o("div",F,m(r.daysOfWeek[t.date.getDay()]),1),o("div",{class:"shift",onDrop:h=>i.handleDrop(t.date,"day"),onDragover:e[10]||(e[10]=g(()=>{},["prevent"]))},[o("div",V,m(t.date.getDate()),1),o("div",{class:k(["shift-slot day",{"synced-changed":r.syncedChanges[t.date.toDateString()]?.dayShift1,ratownik:t.dayShift1Ratownik===!0,pielegniarka:t.dayShift1Ratownik===!1,userChanged:t.dayShift1UserChanged===!0}]),clickable:a.isEditingMode,onDragover:e[7]||(e[7]=g(()=>{},["prevent"])),onDrop:h=>i.handleDrop(t.date,"dayShift1"),onPointerup:g(h=>n.handlePointerUp(h,t.date,"dayShift1"),["prevent"]),onPointermove:g(h=>i.handlePointerMove(h,t.date,"dayShift1"),["prevent"]),onClick:h=>i.handleClickResetShift(t,"dayShift1"),"aria-label":i.getShiftAriaLabel(t,"dayShift1"),title:i.getShiftTooltip(t,"dayShift1"),role:"button",tabindex:"0"},[t.dayShift1?(d(),c("div",q,m(t.dayShift1Name),1)):(d(),c("div",G,"D"))],42,K),o("div",{class:k(["shift-slot day",{"synced-changed":r.syncedChanges[t.date.toDateString()]?.dayShift2,ratownik:t.dayShift2Ratownik===!0,pielegniarka:t.dayShift2Ratownik===!1,userChanged:t.dayShift2UserChanged===!0}]),clickable:a.isEditingMode,onDrop:h=>i.handleDrop(t.date,"dayShift2"),onPointerup:g(h=>n.handlePointerUp(h,t.date,"dayShift2"),["prevent"]),onPointermove:g(h=>i.handlePointerMove(h,t.date,"dayShift2"),["prevent"]),onClick:h=>i.handleClickResetShift(t,"dayShift2"),"aria-label":i.getShiftAriaLabel(t,"dayShift2"),title:i.getShiftTooltip(t,"dayShift2"),role:"button",tabindex:"0"},[t.dayShift2?(d(),c("div",Q,m(t.dayShift2Name),1)):(d(),c("div",X,"D"))],42,H),o("div",{class:k(["shift-slot night",{"synced-changed":r.syncedChanges[t.date.toDateString()]?.nightShift1,ratownik:t.nightShift1Ratownik===!0,pielegniarka:t.nightShift1Ratownik===!1,userChanged:t.nightShift1UserChanged===!0}]),clickable:a.isEditingMode,onDragover:e[8]||(e[8]=g(()=>{},["prevent"])),onDrop:h=>i.handleDrop(t.date,"nightShift1"),onPointerup:g(h=>n.handlePointerUp(h,t.date,"nightShift1"),["prevent"]),onPointermove:g(h=>i.handlePointerMove(h,t.date,"nightShift1"),["prevent"]),onClick:h=>i.handleClickResetShift(t,"nightShift1"),"aria-label":i.getShiftAriaLabel(t,"nightShift1"),title:i.getShiftTooltip(t,"nightShift1"),role:"button",tabindex:"0"},[t.nightShift1?(d(),c("div",ee,m(t.nightShift1Name),1)):(d(),c("div",te,"N"))],42,$),o("div",{class:k(["shift-slot night",{"synced-changed":r.syncedChanges[t.date.toDateString()]?.nightShift2,ratownik:t.nightShift2Ratownik===!0,pielegniarka:t.nightShift2Ratownik===!1,userChanged:t.nightShift2UserChanged===!0}]),clickable:a.isEditingMode,onDragover:e[9]||(e[9]=g(()=>{},["prevent"])),onDrop:h=>i.handleDrop(t.date,"nightShift2"),onPointerup:g(h=>n.handlePointerUp(h,t.date,"nightShift2"),["prevent"]),onPointermove:g(h=>i.handlePointerMove(h,t.date,"nightShift2"),["prevent"]),onClick:h=>i.handleClickResetShift(t,"nightShift2"),"aria-label":i.getShiftAriaLabel(t,"nightShift2"),title:i.getShiftTooltip(t,"nightShift2"),role:"button",tabindex:"0"},[t.nightShift2?(d(),c("div",ie,m(t.nightShift2Name),1)):(d(),c("div",ae,"N"))],42,ne)],40,B)],2)])],40,Z))),128))])],544)]),v(f,{people:r.people,isEditingMode:a.isEditingMode},null,8,["people","isEditingMode"]),a.isEditingMode?(d(),c("div",oe,e[19]||(e[19]=[o("h1",{class:"editing-mode-label"},[D(" Tryb edytowania "),o("a",{style:{color:"#4caf50"}},"Włączony"),o("br"),D(" Przeciągaj członków zespołu na miejsca w grafiku."),o("br"),D("Kliknij na zajętą zmianę, aby ją wyczyścić. ")],-1)]))):b("",!0),v(S,{people:r.people,monthDays:r.monthDays},null,8,["people","monthDays"])],64)}const de=N(_,[["render",se],["__scopeId","data-v-4c4c3d8b"]]);export{de as default};
