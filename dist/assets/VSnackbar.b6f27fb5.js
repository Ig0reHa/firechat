import{j as V,m as C,k as w,r as p,l as P,n as y,a as u,p as I,q as g,v as h,x as R,y as T,z as _,A as B,B as F,C as x,D,E as L,F as k,G as A,H as N,I as M,J as O,K as j}from"./index.f99a5bfa.js";const E=V({name:"VForm",props:{...C()},emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,i){let{slots:n,emit:t}=i;const r=w(e),c=p();function f(s){s.preventDefault(),r.reset()}function b(s){const o=s,a=r.validate();o.then=a.then.bind(a),o.catch=a.catch.bind(a),o.finally=a.finally.bind(a),t("submit",o),o.defaultPrevented||a.then(v=>{let{valid:d}=v;if(d){var l;(l=c.value)==null||l.submit()}}),o.preventDefault()}return P(()=>{var s;return u("form",{ref:c,class:"v-form",novalidate:!0,onReset:f,onSubmit:b},[(s=n.default)==null?void 0:s.call(n,r)])}),y(r,c)}});function q(){const i=I("useScopeId").vnode.scopeId;return{scopeId:i?{[i]:""}:void 0}}const G=V({name:"VSnackbar",props:{contentClass:{type:String,default:""},multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,modelValue:Boolean,...g({location:"bottom"}),...h(),...R(),...T(),..._({transition:"v-snackbar-transition"})},emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:n}=i;const t=B(e,"modelValue"),{locationStyles:r}=F(e),{positionClasses:c}=x(e),{scopeId:f}=q(),{colorClasses:b,colorStyles:s,variantClasses:o}=D(e),{roundedClasses:a}=L(e),v=p();k(t,l),k(()=>e.timeout,l),A(()=>{t.value&&l()});let d=-1;function l(){window.clearTimeout(d);const m=Number(e.timeout);!t.value||m===-1||(d=window.setTimeout(()=>{t.value=!1},m))}function S(){window.clearTimeout(d)}return P(()=>u(j,O({modelValue:t.value,"onUpdate:modelValue":m=>t.value=m,ref:v,class:["v-snackbar",{"v-snackbar--active":t.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},c.value],style:[s.value],contentProps:{style:r.value},contentClass:e.contentClass,persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",transition:e.transition},f),{default:()=>[u("div",{class:["v-snackbar__wrapper",b.value,a.value,o.value],onPointerenter:S,onPointerleave:l},[N(!1,"v-snackbar"),n.default&&u("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[n.default()]),n.actions&&u(M,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[u("div",{class:"v-snackbar__actions"},[n.actions()])]})])],activator:n.activator})),y({},v)}});export{E as V,G as a};