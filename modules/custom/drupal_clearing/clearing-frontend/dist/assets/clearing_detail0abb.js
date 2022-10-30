import{_ as b,a as m,S as f,C as u,b as _,c as a,d as k,e,t as o,f as r,F as p,r as v,p as y,g as x,h as n,i as w,o as l,j as C}from"./plugin-vue_export-helper.938277ca.js";const D={components:{Network:m},props:["ucas"],data(){return{clearingData:{data:[]},loading:!1,networkError:!1}},computed:{course(){return f.addClearingStatusToData(this.clearingData.data,void 0,this.clearingData.stage).find(i=>i.ucas===this.ucas)},hotline(){return this.clearingData.stage===u.pre_embargo?_.preEmbargoHotline:_.openHotline},internationalHotline(){return _.intHotline},registerURL(){return _.registerURL},error(){return _.errorText},hasData(){return this.clearingData.data.length!==0},isLoading(){return this.loading&&!this.hasData},hasCourse(){return!!this.course},isError(){return this.networkError},isOpen(){return this.clearingData.stage!==u.embargo&&this.clearingData.stage!==u.applications_closed},isEmbargo(){return this.clearingData.stage===u.embargo},isGradeRelease(){return this.clearingData.stage===u.grade_release}}},t=i=>(y("data-v-b2eedfb0"),i=i(),x(),i),U={key:0},S={class:"container lg:flex basic-page py-12"},E={class:"heading-m"},H={key:1},A={key:0,class:"container lg:flex basic-page py-12"},F=t(()=>e("div",{class:"basic-page-content copy lg:w-3/4"},[e("h2",{class:"heading-m"},"Loading clearing data...")],-1)),N=[F],L={key:1},O={key:0,class:"container py-12"},T=t(()=>e("div",null,[e("h1",{class:"mb-8"},"Clearing vacancies")],-1)),K={key:0,class:"text-xl text-river"},R=t(()=>e("p",{class:"pb-4"},"Our course vacancies page will not display any courses during the UCAS Results Embargo. Our Course vacancies list will be open on the 18th August from 08:00.",-1)),V={class:"pb-4"},I=n("Please check back on this date or "),q=["href"],B=n("."),M=t(()=>e("p",{class:"pb-4"},[n("For further information on the UCAS Results Embargo visit our "),e("a",{href:"https://www.southampton.ac.uk/clearing/frequently-asked-questions",class:"link-base"},"FAQs page"),n(".")],-1)),W={key:1,class:"text-xl text-river"},Y=t(()=>e("p",{class:"pb-4"},[n("Clearing is now closed, please visit "),e("a",{href:"/",class:"link-base"},"our home page"),n(" to find out how to apply outside of clearing.")],-1)),j=[Y],G={key:1},P={key:0,class:"container lg:flex basic-page py-12"},Q={class:"basic-page-content lg:w-3/4"},z={class:"text-5xl mb-4"},J=t(()=>e("p",{class:"text-xl mb-0 pb-0",id:"ucas-description"},"UCAS course code",-1)),X={class:"font-bold mt-0 pb-8","aria-describedby":"ucas-description"},Z={class:"copy"},$=n("Open to UK applicants? "),ee=n("Open to international applicants? "),se=t(()=>e("h2",null,"Clearing Entry Requirements",-1)),te=t(()=>e("h3",null,"A level",-1)),ae={class:"lg:w-1/4"},le={class:"mb-4 mt-2"},oe=["href"],re=t(()=>e("span",{"aria-hidden":"true",class:"absolute right-1"},[e("svg",{class:"h-5 w-6 fill-current"},[e("use",{"xlink:href":"https://www.southampton.ac.uk/themes/custom/drupal_endeavour/dist/icons/icons.svg#arrow_right"})])],-1)),ne={key:1,disabled:"",class:"btn cursor-normal"},ce={key:2,disabled:"",class:"btn cursor-normal"},ie=t(()=>e("div",{class:"mb-4"},[e("a",{href:"https://www.southampton.ac.uk/courses/clearing.page",class:"btn btn-secondary",role:"button",target:"_self"},[e("span",null,"Clearing information"),e("span",{"aria-hidden":"true",class:"absolute right-1"},[e("svg",{class:"h-5 w-6 fill-current"},[e("use",{"xlink:href":"https://www.southampton.ac.uk/themes/custom/drupal_endeavour/dist/icons/icons.svg#arrow_right"})])])])],-1)),de=t(()=>e("p",{class:"text-lg block text-black pb-2"},"Our Clearing Hotline is now closed for 2022 entry.",-1)),ue=t(()=>e("p",{class:"text-lg block text-black pb-8"},"We have a small number of places available on courses in our School of Health Sciences - please apply using our online form.",-1)),_e=t(()=>e("p",{class:"pb-2"},"For more information call our hotline on:",-1)),he=t(()=>e("p",{class:"text-xl block font-bold text-black"},"UK:",-1)),pe={class:"pb-2"},ge=["href"],be=t(()=>e("p",{class:"text-xl block font-bold text-black"},"International:",-1)),me={class:"pb-2"},fe=["href"],ke=t(()=>e("p",{class:"text-sm pt-2"},[e("strong",null,"Thursday 18 and Friday 19 August:"),e("br"),n("8:15am to 6pm UK time")],-1)),ve=t(()=>e("p",{class:"text-sm"},[e("strong",null,"At all other times:"),e("br"),n("9am to 5pm UK time, Monday to Friday")],-1)),ye={key:1,class:"container basic-page py-12"},xe=t(()=>e("p",{class:"text-river text-xl mb-8"},"This course has no places available in clearing.",-1)),we=t(()=>e("p",{class:"text-lg block text-black pb-2"},"Our Clearing Hotline is now closed for 2022 entry.",-1)),Ce=t(()=>e("p",{class:"text-lg block text-black pb-8"},"We have a small number of places available on courses in our School of Health Sciences - please apply using our online form.",-1)),De=t(()=>e("p",null,"For more information call our hotline on:",-1)),Ue=t(()=>e("p",{class:"text-xl block font-bold text-black"},"UK:",-1)),Se={class:"pb-2"},Ee=["href"],He=t(()=>e("p",{class:"text-xl block font-bold text-black"},"International:",-1)),Ae={class:"pb-2"},Fe=["href"],Ne=t(()=>e("p",{class:"text-sm pt-2"},[e("strong",null,"Thursday 18 and Friday 19 August:"),e("br"),n("8:15am to 6pm UK time")],-1)),Le=t(()=>e("p",{class:"text-sm"},[e("strong",null,"At all other times:"),e("br"),n("9am to 5pm UK time, Monday to Friday")],-1));function Oe(i,d,Ke,Re,h,s){const g=w("Network");return l(),a(p,null,[k(g,{modelValue:h.clearingData,"onUpdate:modelValue":d[0]||(d[0]=c=>h.clearingData=c),onLoading:d[1]||(d[1]=c=>this.loading=c),onFailure:d[2]||(d[2]=c=>this.networkError=c)},null,8,["modelValue"]),s.isError?(l(),a("div",U,[e("div",S,[e("h2",E,o(s.error),1)])])):r("",!0),s.isError?r("",!0):(l(),a("div",H,[s.isLoading?(l(),a("div",A,N)):r("",!0),s.isLoading?r("",!0):(l(),a("div",L,[s.isOpen?r("",!0):(l(),a("div",O,[T,s.isEmbargo?(l(),a("div",K,[R,e("p",V,[I,e("a",{href:s.registerURL,class:"link-base"},"register for updates",8,q),B]),M])):r("",!0),s.isEmbargo?r("",!0):(l(),a("div",W,j))])),s.isOpen?(l(),a("div",G,[s.hasCourse?(l(),a("div",P,[e("div",Q,[e("h1",z,o(s.course.award)+" "+o(s.course.title),1),J,e("p",X,o(s.course.ucas),1),e("div",Z,[e("ul",null,[e("li",null,[e("p",null,[$,e("b",null,o(s.course.uk_vacancy?"Yes":"No"),1)])]),e("li",null,[e("p",null,[ee,e("b",null,o(s.course.int_vacancy?"Yes":"No"),1)])])]),se,te,(l(!0),a(p,null,v(s.course.er_full.split(`
`).filter(c=>c.length>0),c=>(l(),a("p",null,o(c),1))),256))])]),e("div",ae,[e("div",le,[s.course.vacancies&&s.course.applyUrl?(l(),a("a",{key:0,href:s.course.applyUrl,class:"btn btn-primary",role:"button",target:"_self"},[e("span",null,o(s.course.applyText),1),re],8,oe)):r("",!0),s.course.vacancies&&!s.course.applyUrl?(l(),a("button",ne,o(s.course.applyText),1)):r("",!0),s.course.vacancies?r("",!0):(l(),a("button",ce,"No clearing vacancies"))]),ie,e("div",null,[de,ue,_e,he,e("p",pe,[e("a",{href:"tel:"+s.hotline.replace("(0)","").replace(/ /g,""),class:"link-base"},o(s.hotline),9,ge)]),be,e("p",me,[e("a",{href:"tel:"+s.internationalHotline.replace("(0)","").replace(/ /g,""),class:"link-base"},o(s.internationalHotline),9,fe)]),ke,ve])])])):r("",!0),s.hasCourse?r("",!0):(l(),a("div",ye,[xe,we,Ce,De,Ue,e("p",Se,[e("a",{href:"tel:"+s.hotline.replace("(0)","").replace(/ /g,""),class:"link-base"},o(s.hotline),9,Ee)]),He,e("p",Ae,[e("a",{href:"tel:"+s.internationalHotline.replace("(0)","").replace(/ /g,""),class:"link-base"},o(s.internationalHotline),9,Fe)]),Ne,Le]))])):r("",!0)]))]))],64)}var Te=b(D,[["render",Oe],["__scopeId","data-v-b2eedfb0"]]);C(Te,{ucas}).mount("#clearing_detail");