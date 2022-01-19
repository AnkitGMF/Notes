console.log('hello world');
let notesObj = [];
let headObj = [];
document.getElementById('add-notes').addEventListener('click',function(){
    let note = document.getElementById('text').value;
    let head = document.getElementById('head-text').value;
    document.getElementById('text').value="";
    document.getElementById('head-text').value="";
    if(note.trim()!=""){
        notesObj.push(note);
        headObj.push(head);
        localStorage.setItem('notes',JSON.stringify(notesObj));
        localStorage.setItem('heads',JSON.stringify(headObj));
    }
    showNotes();
})

document.getElementById('search-box').addEventListener('keyup',function(){
    let val = document.getElementById('search-box').value.toLowerCase();
    let html="";
    notesObj = JSON.parse(localStorage.getItem('notes'));
    headObj = JSON.parse(localStorage.getItem('heads'));
    for(let i = 0;i<notesObj.length;i++){
        if(notesObj[i].toLowerCase().includes(val)|| headObj[i].toLowerCase().includes(val)){
            html+= `
            <div class="notes">
                <h3 id='note-head'>${headObj[i]}</h3>
                <hr id="note-rule"/>
                <p>${notesObj[i]}</p>
                <input id="${i}" onclick="deleteFunc(this.id)" class="delete-note" type="button" value="Delete Note"/>
            </div>`;
            }
    }
    document.getElementById('mainNotesTab').innerHTML=html;
})
function showNotes(){
    notesObj = JSON.parse(localStorage.getItem('notes'));
    headObj = JSON.parse(localStorage.getItem('heads'));
    let html="";
    for(let i = 0 ;i<notesObj.length;i++){
        html+= `
        <div class="notes">
            <h3 id='note-head'>${headObj[i]}</h3>
            <hr id="note-rule"/>
            <p>${notesObj[i]}</p>
            <input id="${i}" onclick="deleteFunc(this.id)" class="delete-note" type="button" value="Delete Note"/>
        </div>`;
    }
    document.getElementById('mainNotesTab').innerHTML=html;
}

function deleteFunc(id){
    notesObj.splice(id,1);
    headObj.splice(id,1);
    localStorage.removeItem('notes');
    localStorage.removeItem('heads');
    localStorage.setItem('notes',JSON.stringify(notesObj));
    localStorage.setItem('heads',JSON.stringify(headObj));
    showNotes();
}