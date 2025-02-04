// const baseUrl = "https://accbucketlists.herokuapp.com";
const baseUrl = "http://localhost:3000";

// READ
// run once the html has loaded (document is ready)
$(document).ready(function () {
  let route = "bucket";
  let endpoint = `${baseUrl}/${route}`;
  fetch(endpoint)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw Error("Issue getting data from server");
    })
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (el) {
        // let doggy = el.isComplete ? "completed" : ""
        $("ul").append(
          `<li data-bucketid="${el._id}"  class="${el.isComplete ? "completed" : ""}"  >${el.description}<span><i class="far fa-trash-alt"></i></span></li>`
        );
      });
    })
    .catch(function (err) {
      console.error(`Error reading data from API: ${err}`);
    });
});

// UPDATE
$("ul").on("click", "li", function (e) {
  e.stopPropagation()
  let itemId = $(this).data("bucketid");
  let route = `bucket/${itemId}`
  let endpoint = `${baseUrl}/${route}`
  let self = this
  fetch(endpoint, {method: "PUT"})
  .then(function(response){
    if(response.ok) return response.json()
    throw Error("Unable to update data from front end")
  })
  .then(function(data){
    $(self).toggleClass("completed");
  })
  .catch(function(error){
    console.error(`Error updating data from front end: ${error}`)
  })
});

// DELETE
$("ul").on("click", "span", function (event) {
  // stop the click propagating to the li under the span
  event.stopPropagation();

  // find the item's unique identifier from it's data-id attribute
  let itemId = $(this).parent().data("bucketid");

  // define the backend endpoint
  let endpoint = `${baseUrl}/bucket/${itemId}`;

  fetch(endpoint, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw Error("Unable to connect to backend for deletion of data");
    })
    .then(function (data) {
      $(this).parent().remove();
    })
    .catch(function (err) {
      console.error(`Unable to delete item from frontend: ${err}`);
    });
});

// CREATE - POST
$("input").keypress(function (event) {
  // if the user clicks "return" or "enter" key
  // and the input has a value
  if (event.which === 13 && $(this).val()) {
    let route = "bucket";
    let endpoint = `${baseUrl}/${route}`;
    // need to create an object with description and value
    let listItem = {
      description: $(this).val().substring(0, 30),
    };
    fetch(endpoint, {
      method: "POST", // need to explicitly tell fetch to use POST
      // NOTE: only need for POST
      // need to set the headers
      // and tell how we are trenferring data from client to server
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        // success case
        if (response.ok) {
          return response.json();
        }
        // failure case
        throw Error("We messed up the create on front end!!");
      })
      .then(function (data) {
        // data is an object
        $("ul").append(
          `<li data-bucketid="${data._id}">${data.description}<span><i class="far fa-trash-alt"></i></span></li>`
        );
        $("input").val("");
      })
      .catch(function (err) {
        console.error(`Error creating data on frontend: ${err}`);
      });
  }
});

