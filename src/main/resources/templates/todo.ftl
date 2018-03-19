<div class="todo-content">
    <h1 class="page-title">My Todos</h1>
<div class="todo-create">
      <form ng-submit="ctrl.createPoint()" name="myForm">
        <input type="text" id="title" class="form-control" placeholder="Type a todo and press enter..." 
               required 
               name="title" ng-model="ctrl.newtodo" >
        <div ng-show="myForm.$invalid || myForm.$pristine"
             class="alert alert-danger">
            <div ng-hide="!title.errors.required">
              Title is required.
            </div>
        </div>
      </form>
    </div>
    <ul class="todo-list" ng-repeat="point in ctrl.getAllPoints()">
      <li ng-class="{completed: point.completed===true}" >
        <div class="todo-row" >
            <a class="todo-completed" ng-click="ctrl.completeTodo(point.id)">
              <i class="material-icons toggle-completed-checkbox"></i> 
            </a> 
            <span class="todo-title">
              {{point.title}}
            </span>
            <span class="todo-actions">
                <a ng-click="ctrl.deleteTodo(point.id)">
                  <i class="material-icons delete">clear</i>
                </a>
            </span>
        </div>
      </li>
    </ul>
    <div class="no-todos" ng-if="ctrl.getAllPoints() == 0">
        <p>No Todos Found!</p>
    </div>
</div>