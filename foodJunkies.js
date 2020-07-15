function cuisinesQuery() {
    var searchCity = $("#search-term").val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cuisines?city_id=302";
    return queryURL;
}
function updatePage(zomatoData) {
    // Loop through and build elements for the defined number of articles
    var searchSelect = $("#search-term")
    for (var i = 0; i < zomatoData.cuisines.length; i++) {
        var cuisineId = zomatoData.cuisines[i].cuisine.cuisine_id;
        var cuisineName = zomatoData.cuisines[i].cuisine.cuisine_name;
        searchSelect.append("<option value='" + cuisineId + "'>" + cuisineName + "</option>");
    }
}
// Function to empty out the articles
function clear() {
    $("#article-section").empty();
}

$("#run-search").on("click", function (event) {
    event.preventDefault();
    clear();

    var cuisineId = $("#search-term").val();
    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=302&entity_type=city&cuisines=" + cuisineId;
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "user-key": "c6a0b0d5eee196a3d4c3ecebfde6ffcd"

        }
    }).then(showResults);
});

function showResults(data) {
    var restaurants = data.restaurants;
    var resultList = $("#article-section").empty();
    for (var i = 0; i < restaurants.length; i += 1) {
        console.log(restaurants[i].restaurant);
        var name = restaurants[i].restaurant.name;
        resultList.append("<li>" + name + "</li>");
    }
}
$("#clear-all").on("click", clear);

var queryURL = cuisinesQuery();
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "user-key": "c6a0b0d5eee196a3d4c3ecebfde6ffcd"

        }
    }).then(updatePage);
