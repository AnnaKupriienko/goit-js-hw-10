import"./assets/styles-914fda3b.js";import{f as S,i as b}from"./assets/vendor-77e16229.js";const u=document.getElementById("datetime-picker"),o=document.querySelector("[data-start]"),p=document.querySelector("[data-days]"),g=document.querySelector("[data-hours]"),C=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]");o.addEventListener("click",()=>{o.disabled=!0,u.disabled=!0,M()});o.disabled=!0;let a,n,s;const k={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){a=new Date(e[0]).getTime();const t=Date.now();a<t?(o.disabled=!0,b.error({title:"Error",fontSize:"large",close:!1,position:"topCenter",messageColor:"black",timeout:3e3,backgroundColor:"red",message:'"Please choose a date in the future"'})):(o.disabled=!1,n=a-t,c(l(n)),console.log(c))}};S(u,k);function v(){n>1e3?(n-=1e3,c(l(n))):(clearInterval(s),u.disabled=!1)}function M(){clearInterval(s),s=setInterval(v,1e3)}function c({days:e,hours:t,minutes:d,seconds:i}){p.textContent=`${e}`,g.textContent=`${t}`,C.textContent=`${d}`,D.textContent=`${i}`}function r(e){return String(e).padStart(2,"0")}function l(e){const m=r(Math.floor(e/864e5)),f=r(Math.floor(e%864e5/36e5)),h=r(Math.floor(e%864e5%36e5/6e4)),y=r(Math.floor(e%864e5%36e5%6e4/1e3));return{days:m,hours:f,minutes:h,seconds:y}}
//# sourceMappingURL=commonHelpers.js.map