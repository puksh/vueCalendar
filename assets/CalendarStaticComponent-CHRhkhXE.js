import{S as w,P as D,d as m}from"./PeopleListWindow-vtoTSmwy.js";import{addNotification as y}from"./NotificationMessage-I6Xc2_rv.js";import{_ as v,r as p,o as l,c,a as i,t as g,d as N,F as k,e as _,f as C,n as S}from"./index-BvKA24WJ.js";const M={name:"CalendarComponent",components:{ShiftCountWindow:w,PeopleListWindow:D},data(){return{selectedMonth:new Date().getMonth(),selectedYear:new Date().getFullYear(),monthDays:[],localData:{},changedShifts:{},syncedChanges:{},daysOfWeek:m,currentDate:new Date,people:[{id:1,name:"Milena",ratownik:!1},{id:2,name:"Mikołaj",ratownik:!1},{id:3,name:"Aleksandra",ratownik:!1},{id:4,name:"Łukasz",ratownik:!0},{id:5,name:"Joanna",ratownik:!1},{id:6,name:"Natalia",ratownik:!0},{id:7,name:"Marcin",ratownik:!0},{id:8,name:"Alina",ratownik:!1},{id:9,name:"Ewelina",ratownik:!1},{id:7,name:"Teresa",ratownik:!1}],locale:"pl",scrollContainer:null}},computed:{monthYear(){return new Date(this.selectedYear,this.selectedMonth).toLocaleString(this.locale,{month:"long",year:"numeric"})}},methods:{resolvePersonName(e){const n=this.people.find(a=>a.id===e);return n?{name:n.name,isRatownik:n.ratownik}:{name:void 0,isRatownik:!1}},generateMonthDays(){const e=this.selectedYear,n=this.selectedMonth,a=new Date(e,n+1,0).getDate();this.monthDays=[];for(let r=1;r<=a;r++)this.monthDays.push({date:new Date(e,n,r),dayShift1:null,dayShift2:null,nightShift1:null,nightShift2:null,dayShift1Name:"Not assigned",dayShift2Name:"Not assigned",nightShift1Name:"Not assigned",nightShift2Name:"Not assigned",isCurrentMonth:!0});this.loadFromLocalStorage()},changeMonth(e){if(this.madeChanges){if(!confirm("You have unsaved changes. Are you sure you want to switch the month? Your changes will be discarded."))return;this.changedShifts={}}this.selectedMonth=this.selectedMonth+e,this.generateMonthDays()},async fetchServerShiftData(){this.syncedChanges={};try{const e=await fetch("https://vuecalendar.kot.li/?key=shiftData.json",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw e.status===404&&y("Data not found on server","red"),new Error(`Failed to fetch data from server: ${e.status}`);return await e.json()}catch(e){return console.error("Error fetching data from server:",e),y("Failed to fetch data from server","red"),null}},async checkShiftDataSync(){this.resetSyncedChangesSessionStorage();const e=await this.fetchServerShiftData();if(!e){console.log("No remote data fetched.");return}const n={};for(const[a,r]of Object.entries(e)){const o=localStorage.getItem(a),h=o?JSON.parse(o):null,s={};if(!h)n[a]={...r},localStorage.setItem(a,JSON.stringify(r));else{for(const[d,t]of Object.entries(r)){const f=h[d]||null;f!==t&&(s[d]={from:f||"Empty",to:t||"Empty"})}Object.keys(s).length>0&&(n[a]=s),localStorage.setItem(a,JSON.stringify(r))}}this.generateMonthDays(),this.syncedChanges=n,console.log("Updated syncedChanges:",this.syncedChanges),sessionStorage.setItem("syncedChanges",JSON.stringify(this.syncedChanges)),setTimeout(()=>{console.log("Clearing syncedChanges."),this.syncedChanges={},sessionStorage.removeItem("syncedChanges")},5e3)},loadFromLocalStorage(){const e=this.selectedYear,n=this.selectedMonth;for(let a=1;a<=31;a++){const r=new Date(e,n,a).toDateString();if(this.syncedChanges[r])continue;const o=localStorage.getItem(r);if(o)try{const h=JSON.parse(o),s=this.monthDays.find(d=>d.date.toDateString()===r);if(s){s.dayShift1=h.dayShift1,s.dayShift2=h.dayShift2,s.nightShift1=h.nightShift1,s.nightShift2=h.nightShift2;const d=this.resolvePersonName(s.dayShift1);s.dayShift1Name=d.name,s.dayShift1Ratownik=d.isRatownik;const t=this.resolvePersonName(s.dayShift2);s.dayShift2Name=t.name,s.dayShift2Ratownik=t.isRatownik;const f=this.resolvePersonName(s.nightShift1);s.nightShift1Name=f.name,s.nightShift1Ratownik=f.isRatownik;const u=this.resolvePersonName(s.nightShift2);s.nightShift2Name=u.name,s.nightShift2Ratownik=u.isRatownik}}catch(h){y("Failed to load local data: "+h,"red")}}this.calculateAllShiftCounts()},resetSyncedChangesSessionStorage(){const e=sessionStorage.getItem("syncedChanges");e&&(this.syncedChanges=JSON.parse(e),setTimeout(()=>{this.syncedChanges={},sessionStorage.removeItem("syncedChanges")},5e3))},handleScroll(e){this.scrollContainer&&(e.preventDefault(),this.scrollContainer.scrollLeft+=e.deltaY)},getDayClass(e){return m[e]==="Nd"?"nd-color":m[e]==="Sob"?"sob-color":"normal-color"},countShiftsForPerson(e){if(!e)return 0;let n=0;for(let a=0;a<this.monthDays.length;a++)this.monthDays[a].dayShift1===e&&(n+=1),this.monthDays[a].dayShift2===e&&(n+=1),this.monthDays[a].nightShift1===e&&(n+=1),this.monthDays[a].nightShift2===e&&(n+=1);return n},calculateAllShiftCounts(){this.people.forEach(e=>{e.shiftCount=this.countShiftsForPerson(e.id)})}},async mounted(){await this.checkShiftDataSync(),this.scrollContainer=this.$refs.scrollContainer}},R={class:"monthChange"},b={style:{"font-weight":"bold"}},O={class:"calendar-container"},P={class:"calendar-grid"},W={class:"day-header"},F={class:"shift"},Y={class:"day-date"},E={key:0,class:"assigned-person"},L={key:1,class:"empty-slot"},j={key:0,class:"assigned-person"},J={key:1,class:"empty-slot"},T={key:0,class:"assigned-person"},U={key:1,class:"empty-slot"},A={key:0,class:"assigned-person"},x={key:1,class:"empty-slot"};function V(e,n,a,r,o,h){const s=p("PeopleListWindow"),d=p("ShiftCountWindow");return l(),c(k,null,[i("section",null,[i("section",R,[i("button",{class:"buttonMonthChange",onClick:n[0]||(n[0]=t=>h.changeMonth(-1))}," ‹ "),i("span",b,g(h.monthYear.toUpperCase()),1),i("button",{class:"buttonMonthChange",onClick:n[1]||(n[1]=t=>h.changeMonth(1))},"›")]),i("button",{class:"top-right-buttons buttonRefresh",onClick:n[2]||(n[2]=t=>h.checkShiftDataSync())},n[4]||(n[4]=[i("img",{src:"/assets/icons/refresh.svg",style:{width:"30px",height:"30px",cursor:"pointer"},alt:"Refresh"},null,-1)]))]),i("div",O,[i("section",{class:"scrollable-container",onWheel:n[3]||(n[3]=N((...t)=>h.handleScroll&&h.handleScroll(...t),["prevent"])),ref:"scrollContainer"},[i("div",P,[(l(!0),c(k,null,_(o.monthDays,(t,f)=>(l(),c("div",{key:f,class:"day-column"},[i("div",null,[i("div",{class:S(["day-cell",{"current-month":t.isCurrentMonth,"nd-color":o.daysOfWeek[t.date.getDay()]==="Nd","sob-color":o.daysOfWeek[t.date.getDay()]==="Sob"}])},[i("div",W,g(o.daysOfWeek[t.date.getDay()]),1),i("div",F,[i("div",Y,g(t.date.getDate()),1),i("div",{class:S(["shift-slot day",{"synced-changed":o.syncedChanges[t.date.toDateString()]?.dayShift1,ratownik:t.dayShift1Ratownik===!0,pielegniarka:t.dayShift1Ratownik===!1,userChanged:t.dayShift1UserChanged===!0}])},[t.dayShift1?(l(),c("div",E,g(t.dayShift1Name),1)):(l(),c("div",L,"D"))],2),i("div",{class:S(["shift-slot day",{"synced-changed":o.syncedChanges[t.date.toDateString()]?.dayShift2,ratownik:t.dayShift2Ratownik===!0,pielegniarka:t.dayShift2Ratownik===!1,userChanged:t.dayShift2UserChanged===!0}])},[t.dayShift2?(l(),c("div",j,g(t.dayShift2Name),1)):(l(),c("div",J,"D"))],2),i("div",{class:S(["shift-slot night",{"synced-changed":o.syncedChanges[t.date.toDateString()]?.nightShift1,ratownik:t.nightShift1Ratownik===!0,pielegniarka:t.nightShift1Ratownik===!1,userChanged:t.nightShift1UserChanged===!0}])},[t.nightShift1?(l(),c("div",T,g(t.nightShift1Name),1)):(l(),c("div",U,"N"))],2),i("div",{class:S(["shift-slot night",{"synced-changed":o.syncedChanges[t.date.toDateString()]?.nightShift2,ratownik:t.nightShift2Ratownik===!0,pielegniarka:t.nightShift2Ratownik===!1,userChanged:t.nightShift2UserChanged===!0}])},[t.nightShift2?(l(),c("div",A,g(t.nightShift2Name),1)):(l(),c("div",x,"N"))],2)])],2)])]))),128))])],544)]),C(s,{people:o.people},null,8,["people"]),C(d,{people:o.people,monthDays:o.monthDays},null,8,["people","monthDays"])],64)}const G=v(M,[["render",V]]);export{G as default};
