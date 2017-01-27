
function initializeUI(){

    var button_div = $("#button_div");
    var button_1 = $("<input>");
    button_1.attr('id','flask_button');
    button_1.attr('type','button');
    button_1.attr('onclick',"makeDivs()");
    button_1.attr('value',"Get Page Info");
    button_div.append(button_1);

    var clear_page_div = $("#clear_page_div");
    var button_2 = $("<input>");
    button_2.attr('id','clear_page_button');
    button_2.attr('type','button');
    button_2.attr('onclick',"clearPage()");
    button_2.attr('value',"Clear the info");
    clear_page_div.append(button_2);

    var hide_page_div = $("#hide_page_div");
    var button_3 = $("<input>");
    button_3.attr('id','hide_page_elements');
    button_3.attr('type','button');
    button_3.attr('onclick',"hidePage()");
    button_3.attr('value',"hide page info");
    hide_page_div.append(button_3);

    var show_page_div = $("#show_page_div");
    var button_4 = $("<input>");
    button_4.attr('id','show_page_elements');
    button_4.attr('type','button');
    button_4.attr('onclick',"showPage()");
    button_4.attr('value',"show hidden info");
    show_page_div.append(button_4);
}

function makeDivs(){
    console.log('make divs');

    // First get a list of items which have a certain class (useful trick)
    var payload = [];
    var flask_endpoint = "/post_data";
    $(".flask_info").each(function( index ) {
        console.log( index + ": " + $( this ).attr('id') );
        payload.push($(this).attr('id'));
        console.log(payload);
    });
    $.ajax({
        type: "POST",
        url: $SCRIPT_ROOT + flask_endpoint,
        contentType: "application/json",
        data:JSON.stringify(payload),
        success:function(data){
            console.log('success');
            console.log(data)
            processOutput(data);
        },
        error:function(data){
            console.log('error');
        }
    });
}

function processOutput(data){
    console.log(data['msg']);

    dom_data = data['data'];

    // try appending a table from other parts of data, etc

    var div4 = $("#div4");
    div4.append(
        $("<pre>").append(
            $("<code>").append(
                JSON.stringify(dom_data,null,4)
            )
        )
    );
}

function clearPage(){
    console.log('clear page');
}

function hidePage(){
    console.log('hide page');
}

function showPage(){
    console.log('show page');
}

// AJAX POST
/*
$.ajax({
    type: "POST",
    url: $SCRIPT_ROOT + flask_endpoint,
    contentType: "application/json",
    data:payload,
    success:function(data){
        console.log('success');
    },
    error:function(data){
        console.log('error');
    }
});
*/

// AJAX GET
/*
$.ajax({
    url:$SCRIPT_ROOT + flask_endpoint,
    type:"GET",
    data:payload,
    success:function(data){
        console.log('success');
    },
    error:function(data){
        console.log('error');
    }
});
*/
