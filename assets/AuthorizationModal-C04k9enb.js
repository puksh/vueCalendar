const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/md5-hf_1SqVf.js","assets/crypto-vendor-lIZFEAA1.js"])))=>i.map(i=>d[i]);
import{_ as m}from"./index-Da6PXnhi.js";import{_ as y,a as l}from"./utils-BY5kvcl7.js";import{o as h,c as p,d as e,k as z,m as w,p as g,t as _,i as f}from"./vue-vendor-F-eyJ2U6.js";const b={name:"AuthorizationModal",props:{show:{type:Boolean,required:!0}},emits:["close","authorized"],data(){return{password:"",isAuthorizing:!1}},methods:{async authorize(){if(!this.isAuthorizing){this.isAuthorizing=!0;try{const{default:d}=await m(async()=>{const{default:a}=await import("./md5-hf_1SqVf.js").then(r=>r.m);return{default:a}},__vite__mapDeps([0,1]));if(d(this.password).toString()!=="71d114fc94f6a0badc14cf88cb4b8d98"){l("Nieprawidłowe hasło","red"),this.password="",this.isAuthorizing=!1;return}const n={};for(let a=0;a<localStorage.length;a++){const r=localStorage.key(a);if(r!=="isEditingMode")try{n[r]=JSON.parse(localStorage.getItem(r))}catch{}}if(Object.keys(n).length===0){l("Brak zmian do zapisania","yellow"),this.isAuthorizing=!1;return}const c=JSON.stringify(n),i=new Blob([c],{type:"application/json"}),s=new FileReader,o=await new Promise((a,r)=>{s.onloadend=()=>a(s.result.split(",")[1]),s.onerror=r,s.readAsDataURL(i)}),u=await fetch("https://mc.kot.li/?key=shiftData.json",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"shiftData",value:o})});if(!u.ok)throw new Error(`Server error: ${u.status}`);l("Zmiany zapisano pomyślnie!","green"),this.$emit("authorized"),this.closeModal()}catch{l("Nie udało się zaktualizować danych","red")}finally{this.isAuthorizing=!1}}},closeModal(){this.password="",this.$emit("close")},cancel(){this.isAuthorizing||this.closeModal()}},mounted(){this.$nextTick(()=>{this.$refs.passwordInput?.focus()})}},k={key:0,class:"modal"},A={class:"modal-content"},v={class:"input-container"},D={class:"button-container"},S=["disabled"],M={key:0,class:"spinner"},j=["disabled"];function N(d,t,n,c,i,s){return n.show?(h(),p("section",k,[e("div",A,[t[4]||(t[4]=e("h3",null,"Autoryzacja",-1)),t[5]||(t[5]=e("p",null,"Wpisz hasło aby zapisać zmiany:",-1)),e("div",v,[z(e("input",{type:"password","onUpdate:modelValue":t[0]||(t[0]=o=>i.password=o),onKeyup:t[1]||(t[1]=g((...o)=>s.authorize&&s.authorize(...o),["enter"])),placeholder:"Hasło...",autocomplete:"current-password",ref:"passwordInput"},null,544),[[w,i.password]])]),e("div",D,[e("button",{class:"primary-button",onClick:t[2]||(t[2]=(...o)=>s.authorize&&s.authorize(...o)),disabled:i.isAuthorizing},[e("span",null,_(i.isAuthorizing?"Weryfikacja...":"Zapisz"),1),i.isAuthorizing?(h(),p("span",M)):f("",!0)],8,S),e("button",{class:"secondary-button",onClick:t[3]||(t[3]=(...o)=>s.cancel&&s.cancel(...o)),disabled:i.isAuthorizing}," Anuluj ",8,j)])])])):f("",!0)}const E=y(b,[["render",N],["__scopeId","data-v-7605e9d2"]]);export{E as default};
