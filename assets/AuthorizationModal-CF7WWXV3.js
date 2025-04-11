const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/md5-hf_1SqVf.js","assets/crypto-vendor-lIZFEAA1.js"])))=>i.map(i=>d[i]);
import{_ as m}from"./index-DbsTQnuD.js";import{_ as y,N as w,a as l}from"./utils-BV2iPCIX.js";import{c as h,d as e,w as z,u as g,x as _,t as b,i as p,o as f}from"./vue-vendor-BNAjV1iG.js";const k={name:"AuthorizationModal",props:{show:{type:Boolean,required:!0}},emits:["close","authorized"],components:{NotificationMessage:w},data(){return{password:"",isAuthorizing:!1}},methods:{async authorize(){if(!this.isAuthorizing){this.isAuthorizing=!0;try{const{default:d}=await m(async()=>{const{default:a}=await import("./md5-hf_1SqVf.js").then(r=>r.m);return{default:a}},__vite__mapDeps([0,1]));if(d(this.password).toString()!=="71d114fc94f6a0badc14cf88cb4b8d98"){l("Nieprawidłowe hasło","red"),this.password="",this.isAuthorizing=!1;return}const n={};for(let a=0;a<localStorage.length;a++){const r=localStorage.key(a);if(r!=="isEditingMode")try{n[r]=JSON.parse(localStorage.getItem(r))}catch{}}if(Object.keys(n).length===0){l("Brak zmian do zapisania","yellow"),this.isAuthorizing=!1;return}const c=JSON.stringify(n),i=new Blob([c],{type:"application/json"}),s=new FileReader,o=await new Promise((a,r)=>{s.onloadend=()=>a(s.result.split(",")[1]),s.onerror=r,s.readAsDataURL(i)}),u=await fetch("https://mc.kot.li/?key=shiftData.json",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"shiftData",value:o})});if(!u.ok)throw new Error(`Server error: ${u.status}`);l("Zmiany zapisano pomyślnie!","green"),this.$emit("authorized"),this.closeModal()}catch{l("Nie udało się zaktualizować danych","red")}finally{this.isAuthorizing=!1}}},closeModal(){this.password="",this.$emit("close")},cancel(){this.isAuthorizing||this.closeModal()}},mounted(){this.$nextTick(()=>{this.$refs.passwordInput?.focus()})}},A={key:0,class:"modal"},v={class:"modal-content"},D={class:"input-container"},M={class:"button-container"},N=["disabled"],S={key:0,class:"spinner"},j=["disabled"];function x(d,t,n,c,i,s){return n.show?(f(),h("section",A,[e("div",v,[t[4]||(t[4]=e("h3",null,"Autoryzacja",-1)),t[5]||(t[5]=e("p",null,"Wpisz hasło aby zapisać zmiany:",-1)),e("div",D,[z(e("input",{type:"password","onUpdate:modelValue":t[0]||(t[0]=o=>i.password=o),onKeyup:t[1]||(t[1]=_((...o)=>s.authorize&&s.authorize(...o),["enter"])),placeholder:"Hasło...",autocomplete:"current-password",ref:"passwordInput"},null,544),[[g,i.password]])]),e("div",M,[e("button",{class:"primary-button",onClick:t[2]||(t[2]=(...o)=>s.authorize&&s.authorize(...o)),disabled:i.isAuthorizing},[e("span",null,b(i.isAuthorizing?"Weryfikacja...":"Zapisz"),1),i.isAuthorizing?(f(),h("span",S)):p("",!0)],8,N),e("button",{class:"secondary-button",onClick:t[3]||(t[3]=(...o)=>s.cancel&&s.cancel(...o)),disabled:i.isAuthorizing}," Anuluj ",8,j)])])])):p("",!0)}const I=y(k,[["render",x],["__scopeId","data-v-379414a7"]]);export{I as default};
