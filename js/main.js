var websitename = document.getElementById("websitename");
var websiteurl = document.getElementById("websiteurl");
var addbutton = document.getElementById("addbutton");
var tablebody = document.getElementById("tablebody");
var dialog = document.getElementById("dialog");

var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*$/i;
var regex2 = /^[\w ]{3,}$/i;
var websites;
var mainindex;
websites = JSON.parse(localStorage.getItem("websites")) || [];
displaywebsites();
addbutton.addEventListener("click", function () {
  for (var i = 0; i < websites.length; i++) {
    if (websitename.value.toLowerCase() == websites[i].name.toLowerCase()) {
        dialog.showModal();
      return;
    }
  }
  if (websitename.value == "" || websiteurl.value == "") {
    dialog.showModal();

    return;
  }
  if (regex.test(websiteurl.value) && regex2.test(websitename.value)) {
    if (!websiteurl.value.includes("https://")) {
      websiteurl.value = "https://" + websiteurl.value;
    }
    var website = {
      name: websitename.value,
      url: websiteurl.value,
    };
    websites.push(website);
    localStorage.setItem("websites", JSON.stringify(websites));
    displaywebsites();
    removeall();
  } else {
    dialog.showModal();

  }
});

websitename.addEventListener("input", function () {
  if (!regex2.test(websitename.value)) {
    websitename.classList.add("is-invalid");
  } else {
    websitename.classList.replace("is-invalid", "is-valid");
  }
});
websiteurl.addEventListener("input", function () {
  if (!regex.test(websiteurl.value)) {
    websiteurl.classList.add("is-invalid");
  } else {
    websiteurl.classList.replace("is-invalid", "is-valid");
  }
});

function removeall() {
  websitename.value = "";
  websiteurl.value = "";
}
function displaywebsites() {
  var cartona = "";
  for (var i = 0; i < websites.length; i++) {
    cartona += `        <tr>
                            <th>${i}</th>
                            <td>${websites[i].name}</td>
                            <td><a target="_blank" href="${websites[i].url}" class="btn button-visit" data-index="0"><i
                                        class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                            <td><button  onclick="Deletewebsite(${i})" class="btn btn-danger pe-2" data-index="0">
                                    <i class="fa-solid fa-trash-can"></i>
                                    Delete
                                </button></td>
                        </tr>`;
  }
  tablebody.innerHTML = cartona;
}
function Deletewebsite(websiteindex) {
  mainindex = websiteindex;
  websites.splice(websiteindex, 1);
  localStorage.setItem("websites", JSON.stringify(websites));
  displaywebsites();
}



