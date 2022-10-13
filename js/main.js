'use strict'

const dropContent=document.querySelector(".drop-content")
dropContent.addEventListener("dragover",function(e){
    e.preventDefault()
    dropContent.classList.add("active")
})
function DefaultRemove(e){
    e.preventDefault();
    dropContent.classList.remove("active")
}

dropContent.addEventListener("dragleave",function(e){
    DefaultRemove(e);
})

dropContent.addEventListener("dragend",function(e){
    DefaultRemove(e);
})

dropContent.addEventListener("drop",function(e){
    DefaultRemove(e);
    AddImage(e.dataTransfer.files)
})

function AddImage(files){
    for(let img of files){
        if(img.type.match("image*")){
            const myTr=document.createElement("tr");
            var myRead=new FileReader();
            myRead.onload=function(res){
                const td=document.createElement("td");
                const myImg=document.createElement("img");
                myImg.src=res.target.result;
                myImg.width=200;
                myImg.height=200;
                td.appendChild(myImg);
                myTr.insertBefore(td,myTr.firstChild);
            }
            myRead.readAsDataURL(img);
            const nameTd=document.createElement("td");
            nameTd.innerText=img.name;
            const sizeTd=document.createElement("td");
            sizeTd.innerText=(img.size/1024).toFixed(2)+"kb";

            const typeTd=document.createElement("td");
            typeTd.innerText=img.type;

            const lastTd=document.createElement("td");
            lastTd.innerText=img.lastModifiedDate;

            const myItag=document.createElement("i");
            myItag.className="fas fa-times text-danger";
            const removeTd=document.createElement("td");
            removeTd.appendChild(myItag)

            myTr.appendChild(nameTd)
            myTr.appendChild(sizeTd)
            myTr.appendChild(typeTd)
            myTr.appendChild(lastTd)
            myTr.appendChild(removeTd)

            document.querySelector(".imageTable tbody")
            .appendChild(myTr)
            document.querySelector(".imageTable")
            .classList.remove("d-none")
            myItag.onclick=function(){
                this.parentNode.parentNode.remove();
            }
        }
    }
}