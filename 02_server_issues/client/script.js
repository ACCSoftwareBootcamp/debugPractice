// CRUD - Create, Read, Update, Delete
let baseUrl = "http://localhost:3000";

// READ
$(document).ready(function () {
  let route = "bucket";
  let endpoint = `${baseUrl}/${route}`;
  // make our http call to API
  fetch(endpoint)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw Error("Issues with data from server");
    })
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (bucketItem) {
        let completedClass = bucketItem.isComplete ? "completed" : "";
        $("ul").append(
          `<li data-id="${bucketItem.id}" class="${completedClass}">${bucketItem.description}<span><i class="fa fa-trash-alt"></i></span></li>`
        );
      });
    })
    .catch(function (error) {
      console.log("Error getting data from server: ", error);
    });
});

// Update
$("ul").on("click", "li", function () {
  let that = this;
  let itemId = $(this).data("id")
  let route = `bucket/${itemId}`
  let endpoint = `${baseUrl}/${route}`
  fetch(endpoint, {
    method: "PUT"
  })
  .then(function(response){
    if(response.ok){
      return response.json()
    }
    throw Error("Issue updateing data from server")
  })
  .then(function(data){
    $(that).toggleClass("completed");
  })
  .catch(error => {
    console.error("Issues with updating: ", error)
  })
});

// Delete
$("ul").on("click", "span", function (e) {
  e.stopPropagation();
  let self = this;
  let itemId = $(this).parent().data("id");
  let route = `bucket/${itemId}`;
  let endpoint = `${baseUrl}/${route}`;
  fetch(endpoint, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw Error("Cannot delete data at this time");
    })
    .then(function (data) {
      $(self).parent().remove();
    })
    .catch(function (err) {
      console.log("Error getting deleted data from backend: ", err);
    });
});

// Create
$("input").keypress(function (event) {
  if (event.which === 13 && $(this).val().trim()) {
    let route = "bucket";
    let endpoint = `${baseUrl}/${route}`;
    // let self = this DELETE:
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ description: $(this).val() }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw Error("Issue posting data to server");
      })
      .then(function (data) {
        $("ul").append(
          `<li data-id="${data.id}">${data.description}<span><i class="fa fa-trash-alt"></i></span></li>`
        );
        $("input").val("");
      })
      .catch(function (error) {
        console.log("Error posting data", error);
      });
  }
});
