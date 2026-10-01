'use strict';
const CONTACT_EMAIL = 'researchdeb2025@gmail.com';
const THESIS_SERVICE = 'PhD / thesis writing support';
function composeEnquiry(data) {
 const subject = 'Machine learning research enquiry: ' + data.service;
 const body = ['Hello,', '', 'Name: ' + data.name, 'Contact email: ' + data.email, 'Service: ' + data.service, 'Project type: ' + data.projectType, 'Target venue / level or university: ' + (data.venue || 'To be discussed'), 'Approximate thesis pages: ' + (data.projectType==='PhD / thesis' ? data.pages : 'Not applicable'), 'Required delivery: ' + data.duration + ' calendar days after agreed start', '', 'Requirements:', data.message, '', 'Please provide a quotation based on the scope, page count or venue tier, and required delivery time.'].join('\n');
 return {gmail:'https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(CONTACT_EMAIL)+'&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body),email:'mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)};
}
const form=document.getElementById('enquiry');
function updateDelivery() {
 const thesis=form.elements.projectType.value==='PhD / thesis';
 const select=form.elements.duration,previous=select.value;
 const choices=thesis?[[90,'90 days (3 months)'],[60,'60 days (2 months)'],[30,'30 days (1 month)'],[7,'7 days (1 week), subject to scope review']]:[[45,'45 days (1.5 months)'],[30,'30 days (1 month)'],[14,'14 days (2 weeks)'],[7,'7 days (1 week)']];
 select.replaceChildren(...choices.map(([value,label])=>new Option(label,String(value))));
 if(choices.some(([value])=>String(value)===previous))select.value=previous;
 document.getElementById('page-count-label').hidden=!thesis;
 form.elements.pages.disabled=!thesis;form.elements.pages.required=thesis;
 document.getElementById('enquiry-timing').textContent=thesis?'Thesis quotations depend on page count, work required and delivery period. Urgent scope requires assessment.':'Journal and conference support: 7–45 calendar days. Quotes depend on venue tier, scope and deadline.';
}
form.elements.projectType.addEventListener('change',updateDelivery);
form.elements.service.addEventListener('change',()=>{if(form.elements.service.value===THESIS_SERVICE){form.elements.projectType.value='PhD / thesis';updateDelivery();}});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{form.elements.service.value=link.dataset.service;form.elements.projectType.value='PhD / thesis';updateDelivery();}));
form.addEventListener('submit',function(event){
 event.preventDefault();
 const urls=composeEnquiry(Object.fromEntries(new FormData(this)));
 const status=document.getElementById('status');
 if(event.submitter?.value==='email'){
  window.location.href=urls.email;
  status.textContent='Your email app should open. Review the draft, add attachments and press Send. If it does not open, use Compose in Gmail or email the address directly.';
 }else{
  const link=document.createElement('a');link.href=urls.gmail;link.target='_blank';link.rel='noopener noreferrer';document.body.appendChild(link);link.click();link.remove();
  status.textContent='Gmail should open in a new tab. Sign in if needed, review the draft and press Send. No enquiry has been sent by this website.';
 }
});
updateDelivery();
