<div class="toc"></div>

{% raw %}

This tutorial will help you to get an overview of resthub-backbone-stack.

If you want to use this tutorial in a training mode, [a version without answers is also available](/docs/backbone/tutorial-no-answers).

**Code**: you can find the code of the sample application on [Github](https://github.com/resthub/resthub-backbone-tutorial).

## Step 1: Model and View

### Find:

1. **Backbone documentation and description of Backbone.Events, Model, Collection, Router, Sync, View**

    > see [Backbone documentation](http://backbonejs.org/)

2. **RequireJS documentation:**

   * requirejs usage

     > RequireJS allows to define modules and dependencies between modules in order to load your js files

   * how to define a module as function

     > ```javascript
     > define(['backbone'], function(Backbone) { ... });
     > ```

   * how to use it

     > ```javascript
     > require(['model/task', 'view/task-view'], function(Task, TaskView) { ... });
     > ```

   * usage for config options shims and path

     > see [Requirejs documentation](http://requirejs.org/)

3. Description of Resthub-backbone standard project layout based on requireJS

    > see [Resthub Backbone layout](/docs/backbone/layout)

### Do:

1. Get an empty resthub-backbone project via an [archetype](/docs/spring/bootstrap) and discover the base application layout

2. **Create a Task model**

   >  ```javascript
   >  define(['backbone'], function(Backbone) {
   >
   >    var Task = Backbone.Model.extend();
   >
   >    return Task;
   >
   >  });
   >  ```

3. **Instantiate a task in app.js with attributes title and description**

   >  ```javascript
   >  var task = new Task({
   >    title: 'Learn Backbone',
   >    description: 'To write great Rich Internet Applications.'
   >  });
   >  ```

4. **Try to see your task object in the console. Make it work**

    > attach task to window with
    >
    > ```javascript
    > window.task = new Task(...)
    > ```

5. **Try to access to title and description. Is task.title working?**

    > task.title does not work.

6. **Inspect task and find where attributes are stored**

    > In *attributes*.

7. **Access title attribute value**

    > ```javascript
    > task.get("title")
    > ```

8. **Change description attribute. What operation does backbone perform whena a model attrbute is modified?**

    > ```javascript
    > task.set("description", "newDesc");
    > ```
    >
    > Backbone raise events on attribute modification ("change", etc.) so we have to use getters / setters to
    > manipulate attributes

9. **Create a TaskView and implement render with a function that simply logs "rendered"**

   > ```javascript
   > define(['backbone'], function(Backbone) {
   >
   >   var TaskView = Backbone.View.extend({
   >     render: function() {
   >       console.log("rendered");
   >       return this;
   >     }
   >   });
   >
   >   return TaskView;
   > });
   > ```

10. **Instantiate view in app and render it. Verify that "rendered" is logged. Try to render view multiple times in console**

    > ```javascript
    > window.taskView = new TaskView();
    > taskView.render();
    > ```
    >
    > **Output:**
    >
    > ```javascript
    > rendered
    >
    > >>> taskView.render()
    > rendered
    > Object { cid="view1", options={...}, $el=[1], more...}
    >
    > >>> taskView.render()
    > rendered
    > Object { cid="view1", options={...}, $el=[1], more...}
    > ```

11. **Instantiate the view with a task model in app. Modify TaskView render to log the title of the task. No other modification should be made on TaskView**

    > app.js:
    >
    > ```javascript
    > window.task = new Task({
    > title: 'Learn Backbone',
    > description: 'To write great Rich Internet Applications.'
    > });
    >
    > window.taskView = new TaskView({model: task});
    > taskView.render();
    > ```
    >
    > view/task.js:
    >
    > ```javascript
    > render: function() {
    > console.log(this.model.get("title"));
    > return this;
    > }
    > ```
    >
    > **Output:**
    >
    > ```javascript
    > Learn Backbone
    >
    > >>> taskView.render()
    > Learn Backbone
    > Object { cid="view1", options={...}, $el=[1], more...}
    > ```

### Write in DOM

View rendering is done in view relative el element that could be attached anywhere in DOM with jQuery DOM
insertion API

#### Find:

1. **backbone view's DOM element documentation**

    > see [here](http://backbonejs.org/#View-el)

2. **jquery documentation and search for $(), html(), append() methods**

    > see [here](http://api.jquery.com/category/manipulation/dom-insertion-inside/)

#### Do:

1. **Modify render to display a task inside a div with class='task' containing title in a h1 and description in a p**

    > ```javascript
    > render: function() {
    >   this.$el.html("<div class='task'><h1>" + this.model.get("title") + "</h1><p>" + this.model.get("description") + "</p></div>");
    >   return this;
    > }
    > ```

2. **render the view and attach $el to the DOM 'tasks' element (in app.js)**

    > ```javascript
    > $('#tasks').html(taskView.render().el);
    > ```

### Templating

Let's render our task in DOM with a template engine: Handlebars

#### Find:

1. **Handlebars documentation**

    > see [here](http://handlebarsjs.com/)

2. **How to pass a full model instance as render context in backbone**

    > see [here](http://backbonejs.org/#View-render)

### Do:

1. **Create Task handlebars template to display task. Template should start with a div with class='task'**

    > ```html
    > <div class="task">
    >   <h1>{{title}}</h1>
    >   <p>{{description}}</p>
    > </div>
    > ```

2. **Load (with requirejs text plugin), compile template in view and render it (pass all model to template)**

    > ```javascript
    > define(['backbone', 'text!template/task.hbs', 'handlebars'], function(Backbone, taskTemplate, Handlebars) {
    >
    >   var TaskView = Backbone.View.extend({
    >
    >     template: Handlebars.compile(taskTemplate),
    >
    >     render: function() {
    >       this.$el.html(this.template(this.model.toJSON()));
    >       return this;
    >     }
    >   });
    >
    >   return TaskView;
    > });
    > ```

3. Resthub comes with a [hbs RequireJS extension](/docs/backbone/templating) to replace Handlebars.compile.
   **Change TaskView to use this extension. Remove Handlebars requirement**

    > ```javascript
    > define(['backbone', 'hbs!template/task'], function(Backbone, taskTemplate) {
    >
    >   var TaskView = Backbone.View.extend({
    >     render: function() {
    >       this.$el.html(taskTemplate(this.model.toJSON()));
    >       return this;
    >     }
    >   });
    >
    >   return TaskView;
    > });
    > ```

### Model events

#### Find:

1. **Backbone events documentation and model events catalog**

    > see [here](http://backbonejs.org/#Events) and [here](http://backbonejs.org/#Events-catalog)

#### Do:

1. **Update task in the console -> does not update the HTML**

2. **Bind model's change event in the view to render. Update task in console: HTML is magically updated!**

    > ```javascript
    >   var TaskView = Backbone.View.extend({
    >     initialize: function() {
    >       this.listenTo(this.model, 'change', this.render);
    >     },
    >     render: function() {
    >       this.$el.html(taskTemplate(this.model.toJSON()));
    >       return this;
    >     }
    >   });
    > ```

## Step 2: Collections

1. **Create a Tasks collection in** `collection` **directory**

    > ```javascript
    > define(['backbone'], function(Backbone) {
    >
    >   var Tasks = Backbone.Collection.extend();
    >
    >   return Tasks;
    >
    > });
    > ```

2. **Create a TasksView** in `view` **and a tasks template in** `template`.
3. **Implement rendering in TasksView**
4. **Pass the collection as context**
5. **Iterate through the items in the collection in the template**. **Template should start with an** `ul`
   **element with class='task-list'**

   > ```javascript
   > // view
   > define(['backbone', 'hbs!template/tasks'], function(Backbone, tasksTemplate) {
   >
   >   var TasksView = Backbone.View.extend({
   >     render: function() {
   >       this.$el.html(tasksTemplate(this.collection.toJSON()));
   >       return this;
   >     }
   >   });
   >
   >   return TasksView;
   >
   > });
   > ```
   >
   > ```html
   > // template
   > <ul class="task-list">
   >   {{#each this}}
   >     <li class="task">{{title}}</li>
   >   {{/each}}
   > </ul>
   > ```

6. **In app: instanciate two task and add them into a new tasks collections. Instantiate View and render it
   and attach $el to '#tasks' div**

    > ```javascript
    > define(['model/task', 'collection/tasks', 'view/tasks'], function(Task, Tasks, TasksView) {
    >
    >   var tasks = new Tasks();
    >
    >   var task1 = new Task({
    >     title: 'Learn Backbone',
    >     description: 'To write great Rich Internet Applications.'
    >   });
    >
    >   var task2 = new Task({
    >     title: 'Learn RESThub',
    >     description: 'Use rethub.org.'
    >   });
    >
    >   tasks.add(task1);
    >   tasks.add(task2);
    >
    >   var tasksView = new TasksView({collection: tasks});
    >   $('#tasks').html(tasksView.render().el);
    >
    > });
    > ```

7. **try adding an item to the collection in the console**

    > ```javascript
    > require(['model/task', 'collection/tasks', 'view/tasks'], function(Task, Tasks, TasksView) {
    >
    >   window.Task = Task;
    >   window.tasks = new Tasks();
    >
    >   ...
    >
    > });
    > ```
    >
    > **Output:**
    >
    > ```javascript
    > >>> task3 = new Task()
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("title", "Learn again");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("description", "A new learning");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> tasks.add(task3);
    > Object { length=3, models=[3], _byId={...}, more...}
    > ```
    >
    > HTML was not updated.

8. **Bind collection's add event in the view to render**

    > ```javascript
    > define(['backbone', 'hbs!template/tasks'], function(Backbone, tasksTemplate) {
    >
    >   var TasksView = Backbone.View.extend({
    >     initialize: function() {
    >       this.listenTo(this.collection, 'add', this.render);
    >     },
    >     render: function() {
    >         this.$el.html(tasksTemplate(this.collection.toJSON()));
    >       return this;
    >     }
    >   });
    >
    >   return TasksView;
    >
    > });
    > ```
    >
    > **Output:**
    >
    > ```javascript
    > >>> task3 = new Task()
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("title", "Learn again");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("description", "A new learning");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> tasks.add(task3);
    > Object { length=3, models=[3], _byId={...}, more...}
    > ```
    >
    > HTML is updated with the new task in collection.

9. **Add a task to the collection in the console** -> the *whole* collection in rerendered.

    > ```javascript
    > >>> task3 = new Task()
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("title", "Learn again");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("description", "A new learning");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> tasks.add(task3);
    > Object { length=3, models=[3], _byId={...}, more...}
    > ```

## Step 3: Nested Views

1. Remove the each block in template.

   >  ```html
   > <ul class="task-list"></ul>
   > ```

2. Use TaskView in TasksView to render each tasks.

    > ```javascript
    > // view/tasks.js
    > render: function() {
    >   this.$el.html(tasksTemplate(this.collection.toJSON()));
    >   this.collection.forEach(this.add, this);
    >   return this;
    > },
    > ```

3. Update a task in the console -> the HTML for the task is automatically updated.

    > ```javascript
    > // app.js
    >
    > ...
    >
    > window.task1 = new Task({
    >   title: 'Learn Backbone',
    >   description: 'To write great Rich Internet Applications.'
    > });
    > ```

    **output:**

    > ```javascript
    > >>> task1.set("title", "new Title");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c0", more...}
    > ```

4. Add tasks to the collection in the console -> the *whole* list is still rerendered.

    > ```javascript
    > >>> task3 = new Task()
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("title", "Learn again");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> task3.set("description", "A new learning");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c3", more...}
    >
    > >>> tasks.add(task3);
    > Object { length=3, models=[3], _byId={...}, more...}
    > ```

5. Update TasksView to only append one task when added to the collection instead of rendering the whole list again.

    > ```javascript
    > initialize: function() {
    >   this.render();
    >   this.listenTo(this.collection, 'add', this.add);
    > },
    > ```

6. Test in the console.
7. Remove automatic generated divs and replace them with lis

   goal is to have:

   > ```html
   > <ul>
   >     <li class='task'></li>
   >     <li class='task'></li>
   > </ul>
   > ```

   instead of:

   > ```html
   > <ul>
   >     <div><li class='task'></li></div>
   >     <div><li class='task'></li></div>
   > </ul>
   > ```

    example:

    > ```javascript
    >
    > // view/task.js
    > var TaskView = Backbone.View.extend({
    >
    >   tagName:'li',
    >   className: 'task',
    >
    >   ...
    > ```


8. Manage click in TaskView to toggle task's details visibility.

    > ```javascript
    > events: {
    >   click: 'toggleDetails'
    > },
    >
    > ...
    >
    > toggleDetails: function() {
    >   this.$('p').slideToggle();
    > }
    > ```

## Step 4: Rendering strategy

### Find:

1. **Resthub documentation for default rendering strategy**

    > see [here](/docs/backbone/templating#default-render)

### Do:

1. **Use Resthub.View for managing rendering in TaskView. Remove render method in TaskView and modify
   add method in TasksView to set root element**

    > ```javascript
    > // view/task.js
    > define(['backbone', 'resthub', 'hbs!template/task'], function(Backbone, Resthub, taskTemplate) {
    >
    >   var TaskView = Resthub.View.extend({
    >     template: taskTemplate,
    >     tagName: 'li',
    >     className: 'task',
    >     strategy: 'append',
    >
    >     events: {
    >       click: 'toggleDetails'
    >     },
    >
    >     initialize: function() {
    >       this.listenTo(this.model, 'change', this.render);
    >     },
    >
    >     toggleDetails: function() {
    >       this.$('p').slideToggle();
    >     }
    >
    >   });
    >
    >   return TaskView;
    > });
    >
    > // view/tasks.js
    > ...
    > add: function(task) {
    >   var taskView = new TaskView({root: this.$('.task-list'), model: task});
    >   taskView.render();
    > }
    > ...
    > ```

2. **Use Resthub.View for managing rendering in TasksView. Call the parent render function.**

    > ```javascript
    > define(['backbone', 'resthub', 'view/task-view', 'hbs!template/tasks'], function(Backbone, Resthub, TaskView, tasksTemplate) {
    >
    >   var TasksView = Resthub.View.extend({
    >     template: tasksTemplate,
    >     initialize: function() {
    >       this.render();
    >       this.listenTo(this.collecion, 'add', this.add);
    >     },
    >     render: function() {
    >       TasksView.__super__.render.apply(this);
    >       this.collection.forEach(this.add, this);
    >       return this;
    >     },
    >     add: function(task) {
    >       var taskView = new TaskView({root: this.$('.task-list'), model: task});
    >       taskView.render();
    >     }
    >   });
    >
    >   return TasksView;
    >
    > });
    > ```

3. **In the console try adding a Task: thanks to the effect we can see that only one more Task is
   rendered and not the entirely list**

    > ```javascript
    > >>> task3 = new Task()
    > Object { attributes={...}, _escapedAttributes={...}, cid="c5", more...}
    >
    > >>> task3.set("title", "Learn again");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c5", more...}
    >
    > >>> task3.set("description", "A new learning");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c5", more...}
    >
    > >>> tasks.add(task3);
    > Object { length=3, models=[3], _byId={...}, more...}
    > ```

4. **In the console, update an existing Task: thanks to the effect we can see that just this task is updated**

    > ```javascript
    > >>> task3.set("title", "new Title");
    > Object { attributes={...}, _escapedAttributes={...}, cid="c5", more...}
    > ```

## Step 5: Forms

### Do:

1. **Create TaskFormView which is rendered in place when double clicking on a TaskView. Wrap your each form
   field in a div with** `class='control-group'` **. Add** `class='btn btn-success'` **on your input submit**

    > ```javascript
    > // view/task.js
    > define(['backbone', 'resthub', 'view/taskform-view', 'hbs!template/task'], function(Backbone, Resthub, TaskFormView, taskTemplate) {
    >
    >   var TaskView = Resthub.View.extend({
    >     ...
    >
    >     events: {
    >       click: 'toggleDetails',
    >       dblclick: 'edit'
    >     },
    >
    >     ...
    >
    >     edit: function() {
    >       var taskFormView = new TaskFormView({root: this.$el, model: this.model});
    >       taskFormView.render();
    >     },
    >
    >     ...
    >
    >   });
    >
    >   return TaskView;
    > });
    >
    > // view/taskform.js
    > define(['backbone', 'resthub', 'hbs!template/taskform'], function(Backbone, Resthub, ,taskFormTemplate) {
    >
    >   var TaskFormView = Resthub.View.extend({
    >     template: taskFormTemplate,
    >     tagName: 'form',
    >   });
    >
    >   return TaskFormView;
    >
    > });
    > ```

    > ```html
    > <div class="control-group">
    >   <input class="title" type="text" placeholder="Title" value="{{model.title}}" />
    > </div>
    > <div class="control-group">
    >   <textarea class="description" rows="3" placeholder="Description">{{model.description}}</textarea>
    > </div>
    > <input type="submit" class="btn btn-success" value="Save" />

2. **When the form is submitted, update the task with the changes and display it
   again.**

    > ```javascript
    > // view/taskform.js
    >
    > ...
    > save: function() {
    >   this.model.save({
    >     title: this.$('.title').val(),
    >     description: this.$('.description').val(),
    >   });
    >   return false;
    > }
    > ...

3. **Add a button to create a new empty task. In TasksView, bind its click event
   to a create method which instantiate a new empty task with a TaskView which
   is directly editable. Add** `class="btn btn-primary"` **to this button**

    > ```html
    > <!-- template/tasks.hbs -->
    > <ul class="task-list"></ul>
    > <p>
    >   <button id="create" class="btn btn-primary" type="button">New Task</button>
    > </p>
    > ```

    > ```javascript
    > var TasksView = Resthub.View.extend({
    >   template: tasksTemplate,
    >
    >   events: {
    >     'click #create': 'create'
    >   },
    >
    >   ...
    >
    >   create: function() {
    >     var taskView = new TaskView({root: this.$('.task-list'), model: new Task()});
    >     taskView.edit();
    >   }
    > });
    > ```

4. **Note that you have to add the task to the collection otherwise when you
   render the whole collection again, the created tasks disappear. Try by attach
   tasksView to windows and call render() from console**

    > ```javascript
    > create: function() {
    >   var task = new Task();
    >   this.collection.add(task, {silent: true});
    >   var taskView = new TaskView({root: this.$('.task-list'), model: task});
    >   taskView.edit();
    > }
    > ```

5. **Add a cancel button in TaskFormView to cancel task edition. Add a**
   `class="btn cancel"` **to this button**

    > ```html
    > <!-- template/taskform.hbs -->
    > ...
    > <input type="button" class="btn cancel" value="Cancel" />
    > ```

    > ```javascript
    > var TaskFormView = Resthub.View.extend({
    >   ...
    >   events: {
    >     submit: 'save',
    >     'click .cancel': 'cancel'
    >   },
    >   ...
    >   cancel: function() {
    >     this.model.trigger('change');
    >   }
    > });```

7. **Add a delete button which delete a task. Add** `class="btn btn-danger delete"`
   **to this button. Remove the view associated to this task on delete click and remove
   the task from the collection**

   Note that we can't directly remove it from the collection cause the
   TaskFormView is not responsible for the collection management and does not
   have access to this one.

   **Then use the model's destroy method and note that Backbone will automatically
   remove the destroyed object from the collection on a destroy event**

    > ```javascript
    > // view/taskform.js
    > var TaskFormView = Resthub.View.extend({
    >   ...
    >   events: {
    >     submit: 'save',
    >     'click .cancel': 'cancel',
    >     'click .delete': 'delete'
    >   },
    >   ...
    >   delete: function() {
    >     this.model.destroy();
    >   }
    > });
    >
    > // view/task.js
    > ...
    > initialize: function() {
    >   this.listenTo(this.model, 'change', this.render);
    >   this.listenTo(this.model, 'destroy', this.remove);
    > },
    > ...
    > ```
    >
    > **output:**
    >
    > ```javascript
    > // no click on delete
    > >>> tasks
    > Object { length=2, models=[2], _byId={...}, more...}
    >
    > // on click on delete
    > >>> tasks
    > Object { length=1, models=[1], _byId={...}, more...}
    >
    > // two clicks on delete
    > >>> tasks
    > Object { length=0, models=[0], _byId={...}, more...}
    > ```

8. **Note in the console that when removing a task manually in the collection, it
   does not disappear**

    > ```javascript
    > >>> tasks
    > Object { length=2, models=[2], _byId={...}, more...}
    >
    > >>> tasks.remove(tasks.models[0]);
    > Object { length=1, models=[1], _byId={...}, more...}
    > ```
    >
    > But task is still displayed

9. **Bind remove event on the collection to call** `task.destroy()` **in TasksView**

    > ```javascript
    > ...
    > initialize: function() {
    >   this.listenTo(this.collection, 'add', this.add);
    >   this.listenTo(this.collection, 'remove', this.destroyTask);
    > },
    >
    > ...
    >
    > destroyTask: function(task) {
    >   task.destroy();
    > }
    > ```

10. **Test again in the console**

    > ```javascript
    > >>> tasks
    > Object { length=2, models=[2], _byId={...}, more...}
    >
    > >>> tasks.remove(tasks.models[0]);
    > Object { length=1, models=[1], _byId={...}, more...}
    > ```
    >
    > And task disapeared

## Step 6: Validation

### Find:

1. **Backbone documentation about model validation**

    > see [here](http://backbonejs.org/#Model-validate)

2. **Resthub documentation for populateModel**

    > see [here](/docs/backbone/resthub-view#view-model-population)

### Do:

1. **Implement validate function in Task model: make sure that the title is not
   blank**

    > ```javascript
    > define(['backbone'], function(Backbone) {
    >
    >   var Task = Backbone.Model.extend({
    >     validate: function(attrs) {
    >       if (/^\s*$/.test(attrs.title)) {
    >         return 'Title cannot be blank.';
    >       }
    >     }
    >   });
    >
    >   return Task;
    > });
    > ```

2. **In TaskFormView, on save method, get the result of set method call on attributes and
   trigger "change" event only if validation passes**

    > ```javascript
    > save: function() {
    >
    >   var success = this.model.set({
    >     title: this.$('.title').val(),
    >     description: this.$('.desc').val(),
    >   });
    >
    >   // If validation passed, manually force trigger
    >   // change event even if there were no actual
    >   // changes to the fields.
    >   if (success) {
    >     this.model.trigger('change');
    >   }
    >
    >   return false;
    > },
    > ```

3. **Update TaskForm template to add a span with class** `help-inline` **immediately after title input**

    > ```html
    > <div class="control-group">
    >   <input class="title" type="text" placeholder="Title" value="{{model.title}}" />
    >   <span class="help-inline"></span>
    > </div>
    > ```

4. **In TaskFormView bind model's error event on a function which renders
   validation errors. On error, add class "error" on title input and display error in span "help-inline"**

    > ```javascript
    > initialize: function() {
    >   this.listenTo(this.model, 'add', this.add);
    >   this.model.on('invalid', this.invalid, this);
    > },
    >
    > ...
    >
    > invalid: function(model, error) {
    >   this.$('.control-group:first-child').addClass('error');
    >   this.$('.help-inline').html(error);
    > }
    > ```


5. **Use Backbone.Validation for easy validation management**

    > ```javascript
    > // model/task.js
    > define(['backbone'], function(Backbone) {
    >
    >   var Task = Backbone.Model.extend({
    >     validation: {
    >       title: {
    >         required: true,
    >         msg: 'A title is required.'
    >       }
    >     }
    >   });
    >
    >   return Task;
    >
    > });
    >
    > // view/taskform.js
    > define(['backbone', 'hbs!template/taskform'], function(Backbone, taskFormTemplate) {
    >   ...
    >   initialize: function() {
    >     this.listenTo(this.model, 'invalid', this.invalid);
    >     Backbone.Validation.bind(this);
    >   },
    >   ...
    > });
    > ```

6. **Note that Backbone.Validation can handle for you error displaying in your
   views: remove error bindings and method and ensure that you form input have
   a name attribute equals to the model attribute name**

    > ```html
    > <div class="control-group">
    >   <input class="title" type="text" name="title" placeholder="Title" value="{{model.title}}" />
    >   <span class="help-inline"></span>
    > </div>
    > <div class="control-group">
    >   <textarea class="description" rows="3" name="description" placeholder="Description">{{model.description}}</textarea>
    > </div>
    > ```

    > ```javascript
    > // view/taskform.js
    > ...
    > initialize: function() {
    >   Backbone.Validation.bind(this);
    > },
    > ...
    > ```

7. **Rewrite save method using resthub** `populateModel` and backbone `isValid`

    > ```javascript
    > save: function() {
    >
    >   this.populateModel(this.$el);
    >
    >   // If validation passed, manually force trigger
    >   // change event even if there were no actual
    >   // changes to the fields.
    >   if (this.model.isValid()) {
    >     this.model.trigger('change');
    >   }
    >
    >   return false;
    > },
    > ```


## Step 7: Persist & Sync

* Our data are not persisted, after a refresh, our task collection will be
  reinitialized.
* Use Backbone local storage extension to persist our tasks into the local
  storage.
* Bind the collection's reset event on TasksView.render to render the
  collection once synced with the local storage.

<div class="alert alert-warning">
    you need to specify the model attribute in the Tasks collection to
    tell the collection which model object is gonna be used internally.
    Otherwise, when fetching, the returned JSON object will be added directly to
    the collection without instantiating a Task. As a consequence every specific
    attributes (like validation hash), would be unavailable in the model. At this
    step, if validation does not work anymore after fetching the tasks through
    Backbone.sync, check that the model attribute is correctly set in the
    collection.
</div>

## Step 8

* Download [RESThub Spring tutorial sample project](https://github.com/resthub/resthub-spring-tutorial/zipball/step5-solution) and extract it
* Create *jpa-webservice/src/main/webapp* directory, and move your JS application into it
* Run the jpa-webservice webapp thanks to Maven Jetty plugin
* Remove backbone-localstorage.js file and usage in JS application
* Make your application retrieving tasks from api/task?page=no URL

    > ```javascript
    > // collection/tasks.js
    > define(['backbone', 'model/task'], function(Backbone, Task) {
    >   var Tasks = Backbone.Collection.extend({
    >     url: 'api/task',
    >     model: Task
    >   });
    >   return Tasks;
    > });
    >
    > // app.js
    > tasks.fetch({ data: { page: 'no'} });
    > ```

* Validate that retrieve, delete, create and update actions work as expected with this whole new jpa-webservice
  backend

{% endraw %}