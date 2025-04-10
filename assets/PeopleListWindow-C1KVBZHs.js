import{_ as c,a as E}from"./utils-IDgkbHQc.js";import{o as l,c as a,d,F as u,a as g,n as h,p as m,t as P}from"./vue-vendor-DJOL9Rss.js";const f={name:"PeopleListWindow",props:{people:{type:Array,required:!0},isEditingMode:{type:Boolean,required:!0}},data(){return{draggedPerson:null,touchedPerson:null,touchStartTime:0,touchTimer:null,isDragging:!1}},methods:{startDrag(n){localStorage.setItem("draggedPerson",JSON.stringify(n))},handleDragEnd(){localStorage.removeItem("draggedPerson")},handlePointerDown(n,e){n.pointerType==="touch"&&(this.touchStartTime=Date.now(),this.touchedElement=n.currentTarget,this.touchedPerson=e,this.touchedElement.setPointerCapture(n.pointerId),this.touchTimer=setTimeout(()=>{this.isDragging=!0,localStorage.setItem("draggedPerson",JSON.stringify(e)),this.touchedElement.classList.add("being-touched"),navigator.vibrate&&navigator.vibrate(50),E(`Przeciągnij ${e.name} na slot`,"green")},500))},handlePointerMove(n){n.pointerType==="touch"&&(this.touchTimer&&(clearTimeout(this.touchTimer),this.touchTimer=null),!(!this.isDragging||!this.touchedElement)&&n.preventDefault())},handlePointerUp(n){n.pointerType==="touch"&&(this.touchTimer&&(clearTimeout(this.touchTimer),this.touchTimer=null),this.touchedElement&&(this.touchedElement.releasePointerCapture(n.pointerId),this.touchedElement.classList.remove("being-touched")),this.isDragging=!1,this.touchedElement=null,this.touchedPerson=null)},handlePointerCancel(n){this.handlePointerUp(n),localStorage.removeItem("draggedPerson")}}},v={class:"people-list"},D={class:"person-lists"},M=["draggable","onDragstart","onPointerdown"],b={class:"person-lists"},T=["draggable","onDragstart","onPointerdown"];function y(n,e,t,w,s,o){return l(),a("section",v,[e[9]||(e[9]=d("h3",{style:{"font-weight":"bold"}},"Zespół",-1)),d("div",null,[e[7]||(e[7]=d("h4",null,"Ratowniczki/cy",-1)),d("div",D,[(l(!0),a(u,null,g(t.people.filter(i=>i.ratownik),i=>(l(),a("div",{key:i.id,class:h(["person-item ratownik",{draggable:t.isEditingMode,"being-touched":s.touchedPerson?.id===i.id}]),style:m({borderRadius:t.isEditingMode?"var(--border-radius)":"0"}),draggable:t.isEditingMode,onDragstart:r=>t.isEditingMode?o.startDrag(i):null,onDragend:e[0]||(e[0]=(...r)=>o.handleDragEnd&&o.handleDragEnd(...r)),onPointerdown:r=>t.isEditingMode?o.handlePointerDown(r,i):null,onPointermove:e[1]||(e[1]=r=>t.isEditingMode?o.handlePointerMove:null),onPointerup:e[2]||(e[2]=r=>t.isEditingMode?o.handlePointerUp:null),onPointercancel:e[3]||(e[3]=r=>t.isEditingMode?o.handlePointerCancel:null)},P(i.name),47,M))),128))]),e[8]||(e[8]=d("h4",null,"Pielęgniarki/rze",-1)),d("div",b,[(l(!0),a(u,null,g(t.people.filter(i=>!i.ratownik),i=>(l(),a("div",{key:i.id,class:h(["person-item pielegniarka",{draggable:t.isEditingMode,"being-touched":s.touchedPerson?.id===i.id}]),style:m({borderRadius:t.isEditingMode?"var(--border-radius)":"0"}),draggable:t.isEditingMode,onDragstart:r=>t.isEditingMode?o.startDrag(i):null,onPointerdown:r=>t.isEditingMode?o.handlePointerDown(r,i):null,onPointermove:e[4]||(e[4]=r=>t.isEditingMode?o.handlePointerMove:null),onPointerup:e[5]||(e[5]=r=>t.isEditingMode?o.handlePointerUp:null),onPointercancel:e[6]||(e[6]=r=>t.isEditingMode?o.handlePointerCancel:null)},P(i.name),47,T))),128))])])])}const I=c(f,[["render",y],["__scopeId","data-v-3f5984d2"]]);export{I as default};
