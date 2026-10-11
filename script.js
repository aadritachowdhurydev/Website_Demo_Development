
const events = [
 {name:"Code & Canvas",date:"2026-11-14T10:00:00+05:30",venue:"Seminar Hall 2",category:"Technical",desc:"A mini-hackathon where teams turn ideas into useful digital experiences.",icon:"⌘"},
 {name:"The Design Edit",date:"2026-11-21T11:00:00+05:30",venue:"Innovation Lab",category:"Workshop",desc:"Explore colour, layout and user experience in a hands-on design sprint.",icon:"✳"},
 {name:"Campus Unplugged",date:"2026-12-04T16:00:00+05:30",venue:"Open-Air Stage",category:"Cultural",desc:"An evening of music, poetry, comedy and student performances.",icon:"♫"},
 {name:"Future Forum",date:"2026-12-12T12:00:00+05:30",venue:"Main Auditorium",category:"Talk",desc:"Discuss emerging technology, careers and responsible innovation.",icon:"◎"},
 {name:"DataSprint",date:"2027-01-09T10:30:00+05:30",venue:"Computer Lab 3",category:"Technical",desc:"Explore a dataset, discover patterns and present your findings.",icon:"⌁"},
 {name:"The Maker's Table",date:"2027-01-23T14:00:00+05:30",venue:"Project Studio",category:"Workshop",desc:"A creative build session for prototypes and practical experiments.",icon:"✎"},
 {name:"Spring Social",date:"2027-02-06T15:30:00+05:30",venue:"College Courtyard",category:"Cultural",desc:"Celebrate campus friendships with games and creative activities.",icon:"❋"}
];

const $ = id => document.getElementById(id);
const dateInfo = d => new Date(d).toLocaleDateString("en-IN",{
    day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Kolkata"
});
let filter = "All";

function renderEvents() {
    const term = $("search").value.toLowerCase().trim();
    const list = events.filter(e =>
        (filter==="All" || e.category===filter) &&
        (e.name+" "+e.category+" "+e.desc+" "+e.venue).toLowerCase().includes(term)
    );
    $("eventList").innerHTML = list.map(e => `
        <article class="card">
        <div class="cardTop"><span class="date">${dateInfo(e.date)}</span>
        <h3>${e.icon} ${e.name}</h3></div>
        <div class="cardBody"><small>${e.category} · ${e.venue}</small>
        <p>${e.desc}</p><small>${new Date(e.date).toLocaleTimeString("en-IN",
        {hour:"numeric",minute:"2-digit",timeZone:"Asia/Kolkata"})} IST</small>
        <a href="#register" data-event="${e.name}">Register ↗</a></div>
        </article>`).join("");
    $("noEvents").hidden = list.length>0;

    document.querySelectorAll("[data-event]").forEach(a =>
        a.addEventListener("click", () => {
            $("eventChoice").value = a.dataset.event;
        })
    );
}

events.forEach(e => {
    const option = document.createElement("option");
    option.value = e.name;
    option.textContent = e.name+" — "+dateInfo(e.date);
    $("eventChoice").appendChild(option);
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        filter = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach(b =>
            b.classList.toggle("selected",b===button));
        renderEvents();
    });
});
$("search").addEventListener("input",renderEvents);

// Countdown to the next upcoming event
function countdown() {
    const now = Date.now();
    const next = events.filter(e=>new Date(e.date)>now)
        .sort((a,b)=>new Date(a.date)-new Date(b.date))[0];
    if (!next) {
        $("nextName").textContent="More events coming soon";
        $("nextDate").textContent="";
        ["days","hours","mins","secs"].forEach(id=>$(id).textContent="00");
        return;
    }
    $("nextName").textContent=next.name;
    $("nextDate").textContent=dateInfo(next.date)+" · "+next.venue;
    let n = new Date(next.date)-now;
    const values=[Math.floor(n/86400000),
        Math.floor(n%86400000/3600000),
        Math.floor(n%3600000/60000),Math.floor(n%60000/1000)];
    ["days","hours","mins","secs"].forEach((id,i)=>
        $(id).textContent=String(values[i]).padStart(2,"0"));
}
countdown();
setInterval(countdown,1000);

// Registration form validation
function error(id,msg) {
    $(id+"Err").textContent=msg;
    if ($(id)) $(id).classList.toggle("invalid",!!msg);
    return !msg;
}
$("regForm").addEventListener("submit",e=>{
    e.preventDefault();
    let ok=true;
    const name=$("name").value.trim(),roll=$("roll").value.trim();
    const email=$("email").value.trim(),phone=$("phone").value.trim();

    ok=error("name",/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(name)?"":"Enter your full name.")&&ok;
    ok=error("roll",/^[A-Za-z0-9/-]{4,20}$/.test(roll)?"":"Enter a valid roll number.")&&ok;
    ok=error("email",/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)?"":"Enter a valid email.")&&ok;
    ok=error("phone",/^[6-9]\d{9}$/.test(phone)?"":"Enter a valid 10-digit phone.")&&ok;
    ok=error("dept",$("dept").value?"":"Choose your department.")&&ok;
    ok=error("event",$("eventChoice").value?"":"Choose an event.")&&ok;
    $("consentErr").textContent=$("consent").checked?"":"Please confirm your details.";
    ok=$("consent").checked&&ok;

    $("regMsg").textContent=ok
        ?"Thank you, "+name+"! Demo registration for "+$("eventChoice").value+" completed. No data was sent."
        :"Please correct the highlighted fields.";
    if(ok) $("regForm").reset();
});

// Feedback form validation
$("feedbackForm").addEventListener("submit",e=>{
    e.preventDefault();
    let ok=true;
    const name=$("fName").value.trim(),email=$("fEmail").value.trim();
    const msg=$("message").value.trim();
    ok=error("fName",name.length>=2?"":"Enter your name.")&&ok;
    ok=error("fEmail",/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)?"":"Enter a valid email.")&&ok;
    ok=error("message",msg.length>=15?"":"Write at least 15 characters.")&&ok;
    $("feedbackMsg").textContent=ok
        ?"Thank you! Your demo feedback has been checked, not sent."
        :"Please correct the highlighted fields.";
    if(ok) $("feedbackForm").reset();
});

// Mobile navigation
$("menu").addEventListener("click",()=>$("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click",()=>$("nav").classList.remove("open")));

// Light/dark mode with saved preference
function setTheme(dark) {
    document.body.classList.toggle("dark",dark);
    $("theme").textContent=dark?"☀":"☾";
    localStorage.setItem("mosaic-theme",dark?"dark":"light");
}
setTheme(localStorage.getItem("mosaic-theme")==="dark");
$("theme").addEventListener("click",()=>
    setTheme(!document.body.classList.contains("dark")));

$("year").textContent=new Date().getFullYear();
renderEvents();
