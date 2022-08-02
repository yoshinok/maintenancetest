let todoList = [];
const newTodo = $("#newTodo");

function escapeHtml (string) {
    let returnString = string.replace("/","\/");
    returnString = returnString.replace("?","\?")
    return returnString.replace(/[&'`"<>]/g, function (match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match];
    });
  }

function updateTodoUL(){
    $("#todoUL").children().remove();
    todoList.forEach( (item,index) => {
        const text = escapeHtml(item.todo);
        if(item.isDone) {
            $("#todoUL").append(
                `<li class="list-group-item" onclick ="toggleDone(${index});" style="text-decoration: line-through;">${text}</li>`
            );
        } else {
            $("#todoUL").append(
                `<li class="list-group-item" onclick ="toggleDone(${index});">${text}</li>`
            );
        }
    });
}

function addTodo(){
    const text = newTodo.val();

    $("#newTodo").val("");
    todoList.push({
        todo: text,
        isDone:false
    });
    updateTodoUL();
}

function toggleDone(index){
    const newTodoList = todoList.concat();
    newTodoList[index].isDone = !newTodoList[index].isDone;
    todoList = newTodoList;
    updateTodoUL();
}

$("#addTodo").on("click", () => addTodo());

$("#newTodo").keydown((e) => {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        addTodo();
        return false;
    } else {
        return true;
    }
});

const queryParam = new URLSearchParams(window.location.search);
const user = queryParam.has("user") ? queryParam.get("user") : "guest";
const account = queryParam.has("account") ? queryParam.get("account") : "guest";


(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');

        // This function creates anonymous visitor IDs in Pendo unless you change the visitor id field to use your app's values
        // This function uses the placeholder 'ACCOUNT-UNIQUE-ID' value for account ID unless you change the account id field to use your app's values
        // Call this function after users are authenticated in your app and your visitor and account id values are available
        // Please use Strings, Numbers, or Bools for value types.
        pendo.initialize({
            visitor: {
                id:              user  // Required if user is logged in, default creates anonymous ID
                // email:        // Recommended if using Pendo Feedback, or NPS Email
                // full_name:    // Recommended if using Pendo Feedback
                // role:         // Optional

                // You can add any additional visitor level key-values here,
                // as long as it's not one of the above reserved names.
            },

            account: {
                id:           account // Required if using Pendo Feedback, default uses the value 'ACCOUNT-UNIQUE-ID'
                // name:         // Optional
                // is_paying:    // Recommended if using Pendo Feedback
                // monthly_value:// Recommended if using Pendo Feedback
                // planLevel:    // Optional
                // planPrice:    // Optional
                // creationDate: // Optional

                // You can add any additional account level key-values here,
                // as long as it's not one of the above reserved names.
            }
        });
})('e9c0bc7c-3889-4151-6020-6ef315967bfa');