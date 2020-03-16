function profilesave() {
  const name = $("#name")
    .val()
    .trim();
  const phone = $("#phone")
    .val()
    .trim();

  if (name === "" || name === null) {
    alert("姓名不能为空.");
  } else {
    $.ajax({
      type: "post",
      url: "user/profilesave.do",
      dataType: "json",
      data: { name: name, phone: phone },
      success: function(data) {
        if (data === 1) {
          setCookie("userName", name, 1);
          setCookie("userPhone", phone, 1);
          alert("修改成功.");
          window.location.href = "info.html";
        } else if (data === -2) {
          alert("请登录.");
          window.location.href = "index.html";
        } else {
          alert("修改失败.");
        }
      },
      error: function() {
        alert("修改失败.");
      }
    });
  }
}

function passreset() {
  const oldpass = $("#oldpass")
    .val()
    .trim();
  const newpass = $("#newpass")
    .val()
    .trim();
  const renewpass = $("#renewpass")
    .val()
    .trim();

  if (newpass !== renewpass) {
    alert("两次密码输入不同.");
  } else {
    $.ajax({
      type: "post",
      url: "user/passreset.do",
      dataType: "json",
      data: { oldpass: oldpass, newpass: newpass },
      success: function(data) {
        if (data === 1) {
          alert("修改成功,请重新登录.");
          logout();
        } else if (data === -1) {
          alert("原密码不正确，修改失败.");
        } else if (data === -2) {
          alert("请登录.");
          window.location.href = "index.html";
        } else {
          alert("修改失败，请重试.");
        }
      },
      error: function() {
        alert("修改失败，请重试.");
      }
    });
  }
}

function showinfo() {
  $("#name").val(getCookie("userName"));
  $("#phone").val(getCookie("userPhone"));
  $("#id").text(getCookie("userId"));
  $("#username_a").text(getCookie("userName"));
}

function getuserresv() {
  const today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  const date = today.getFullYear() + month + day;
  $.ajax({
    type: "post",
    url: "user/getuserresv.do",
    dataType: "json",
    data: { date: date },
    success: function(data) {
      if (data != null) {
        let table = "";
        $.each(data, function(num) {
          table +=
            "<tr><td class=" +
            '"' +
            data[num].resvid +
            '"' +
            ">" +
            data[num].name +
            "</td><td class=" +
            '"' +
            data[num].resvid +
            '"' +
            ">" +
            data[num].date +
            "</td><td class=" +
            '"' +
            data[num].resvid +
            '"' +
            ">" +
            data[num].begintime +
            "--" +
            data[num].endtime +
            "</td><td><button onclick=\"cancelresv('" +
            data[num].resvid +
            "')\"> 取消 </button></td></tr>";
        });
        $("#tbody").html(table);
      }
    },
    error: function() {
      alert("error");
    }
  });
}

function cancelresv(id) {
  let item = document.getElementsByClassName(id);

  let cfm = confirm(
    "确认取消？\n " +
      item[0].innerText +
      "\n" +
      item[1].innerText +
      "\n" +
      item[2].innerText
  );
  if (cfm) {
    $.ajax({
      type: "post",
      url: "user/cancelresv.do",
      dataType: "json",
      data: { resvid: id },
      success: function(data) {
        if (data === 1) {
          alert("已取消.");
          getuserresv();
        } else if (data === 2) {
          alert("已取消.");
          getallresv();
        } else {
          alert("出现错误.");
        }
      },
      error: function() {
        alert("error");
      }
    });
  }
}

function getallresv() {
 // getAll();
 $.ajax({
  type: "get",
  url: "https://api.myjson.com/bins/t0op6",
  dataType: "json",

  success: function(data) {
    for(i = 0;i<5;i++){
      console.log(data[i].resvid);
    }
    displayList(data,rows,current_page);
    SetupPagination(data,pagination_element,rows);
    
  }
});
  
}

function venuelist() {
  $.ajax({
    type: "post",
    url: "user/getallvenue.do",
    dataType: "json",

    success: function(data) {
      if (data !== null) {
        let tabel = "";
        $.each(data, function(num) {
          tabel +=
            "<tr><td class=" +
            '"' +
            data[num].vid +
            '">' +
            data[num].name +
            "</td><td class=" +
            '"' +
            data[num].vid +
            '"' +
            ">" +
            data[num].tel +
            "</td><td class=" +
            '"' +
            data[num].vid +
            '"' +
            ">" +
            data[num].location +
            "</td><td class=" +
            '"' +
            data[num].vid +
            '"' +
            ">" +
            data[num].note +
            "</td><td  class=" +
            '"' +
            data[num].vid +
            '"' +
            ">" +
            data[num].status +
            "</td><td><button onclick=\"editvenue('" +
            data[num].vid +
            "')\"> 修改 </button></td></tr>";
        });
        $("#venuelist").html(tabel);
      }
    },
    error: function() {}
  });
}



let current_page = 1;
let rows = 6;

const pagination_element = document.getElementById('pagination');

function displayList(data,rows_per_page,page){
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = data.slice(start,end);
  let table = "";
  console.log(paginatedItems);
  for(let i = 0; i < paginatedItems.length; i++){
    let item = paginatedItems[i];

    table +=
      "<tr><td class=" +
      '"' +
      item.resvid +
      '">' +
      item.id +
      "</td><td class=" +
      '"' +
      item.resvid +
      '"' +
      ">" +
      item.name +
      "</td><td class=" +
      '"' +
      item.resvid +
      '"' +
      ">" +
      item.date +
      "</td><td class=" +
      '"' +
      item.resvid +
      '"' +
      ">" +
      item.begintime +
      "--" +
      item.endtime +
      "</td><td><button onclick=\"cancelresv('" +
      item.resvid +
      "')\"> 取消 </button></td></tr>";

      $("#tbody").html(table);
  }

}

function SetupPagination (data,wrapper,rows_per_page){
  wrapper.innerHTML = "";
  let page_count = Math.ceil(data.length / rows_per_page);
  for(let i = 1; i < page_count + 1;i++){
    let btn = PaginationButton(i,data);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page,data){
  let button = document.createElement('button');
  button.innerText = page;
  button.classList.add('btn');

  button.classList.add('btn-primary');

  if (current_page == page) {
    button.classList.add('active');
  }

  button.addEventListener('click', function(){
    current_page = page;
    displayList(data,rows,current_page);
    let current_btn = document.querySelector('#pagination button.active');
    current_btn.classList.remove('active');
    button.classList.add('active');
  });
  return button;
}

// https://api.myjson.com/bins/t0op6
