var button = document.querySelector('#btn');

button.addEventListener('click', onSubmit);

function onSubmit(e){
    e.preventDefault();
    const expense = document.querySelector('#input-expense').value;
    const description = document.querySelector('#input-description').value;
    const category = document.querySelector('#input-category').value;

    if(expense==='' || description==='' || category===''){
        const msg = document.querySelector('.msg');
        msg.classList.add('error');
        msg.innerHTML= 'Please enter value in all the fields';
        setTimeout(() => msg.remove(), 3000);
    } 

    else{
        let obj = {
            "expense" : expense,
            "description" : description,
            "category" : category,
        };
        let obj_serailized = JSON.stringify(obj);

        localStorage.setItem(obj.description ,obj_serailized);

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${obj.expense} - ${obj.description} - ${obj.category}`));
        li.id = obj.description;
        li.className = "list-group-item";
        lists.appendChild(li);

        // Adding a delete button for deleting the details
        const addBtn = document.createElement('button');
        addBtn.className = "btn btn-danger m-2";
        addBtn.appendChild(document.createTextNode("Delete"));
        li.appendChild(addBtn);

        addBtn.addEventListener('click', (e) =>{
            e.preventDefault();
            localStorage.removeItem(description);
            lists.removeChild(document.getElementById(obj.description));
        });

        // Adding a edit button for editing the details
        const addEditBtn = document.createElement('button');
        addEditBtn.className = "btn btn-success m-2";
        addEditBtn.appendChild(document.createTextNode("Edit"));
        li.appendChild(addEditBtn);

        addEditBtn.addEventListener('click', (e) =>{
            // popullating the values to the input-
            expense.value = obj.expense;
            description.value = obj.description;
            category.value = obj.category;

            // removing the element from storage and screen-
            e.preventDefault();
            localStorage.removeItem(description);
            lists.removeChild(document.getElementById(obj.description));
        });
    }
}