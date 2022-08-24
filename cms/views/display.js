function getAllCustomer() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/customers/",
        success: function (data) {
            let table = document.getElementById("list")
            if (table.style.display == "none") {
                table.style.display = "block"
                document.getElementById("form").style.display = "none"
            }
            document.getElementById("list").innerHTML = displayTable(data)
        }
    })
}

function displayTable(data) {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>ID</th>"
    result += "<th>Name</th>"
    result += "<th>Age</th>"
    result += "<th>Address</th>"
    result += "<th>Department</th>"
    result += "<th colspan='2'>Action</th>"
    result += "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<th>"+ data[i].id +"</th>"
        result += "<th>"+ data[i].name +"</th>"
        result += "<th>"+ data[i].age +"</th>"
        result += "<th>"+ data[i].address +"</th>"
        result += "<th>"+ data[i].department +"</th>"
        result += "<th><button onclick='update("+ data[i].id +")'>Update</button></th>"
        result += "<th><button onclick='deleteCustomer("+ data[i].id +")'>Delete</button></th>"
        result += "</tr>"
    }
    result += "</table>"
    return result
}

function formCreate() {
    document.getElementById("name").value =""
    document.getElementById("age").value =""
    document.getElementById("address").value =""
    document.getElementById("department").value =""
    document.getElementById("button").innerHTML ="Create"
    document.getElementById("form").style.display ="block"
    document.getElementById("list").style.display ="none"
    document.getElementById("button").setAttribute("onclick", "createCustomer()")
}

let idCustomer;

function update(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/customers/" + id,
        success: function (data) {
            idCustomer = data.id
            document.getElementById("name").value = data.name
            document.getElementById("age").value = data.name
            document.getElementById("address").value = data.name
            document.getElementById("department").value = data.name
            document.getElementById("button").innerHTML = "Update"
            document.getElementById("button").setAttribute("onclick", "updateCustomer()")
            document.getElementById("form").style.display = "block"
        }
    })
}

function deleteCustomer(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8088/customers" + id,
        success: getAllCustomer()
    })
}
