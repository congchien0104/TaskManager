
import './App.css';
import { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isDisplayForm : false,
      //taskEditing : null,
      // filter : {
      //   name : '',
      //   status : -1
      // },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }


  onToggleForm =() =>{ // Thêm task
    // if(this.state.isDisplayForm && this.state.taskEditing !== null){
    //   this.setState({
    //     isDisplayForm : true,
    //     taskEditing : null
    //   });
    // }else{
    //   this.setState({
    //     isDisplayForm : !this.state.isDisplayForm,
    //     taskEditing : null
    //   });
    // }
    var { itemEditing } = this.props;
    if(itemEditing && itemEditing.id !== ''){
      this.props.onOpenForm();

    }else{
      this.props.onToggeForm();
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : false
    });
  }

  // onCloseForm = () =>{
  //   this.setState({
  //     isDisplayForm : false
  //   });
  // }

  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    });
  }

  
  // onUpdateStatus = (id) =>{
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if(index !== -1){
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks : tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  // }

  findIndex = (id) =>{
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) =>{
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }

  // onDelete = (id) =>{
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if(index !== -1){
  //     tasks.splice(index, 1);
  //     this.setState({
  //       tasks : tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  //   this.onCloseForm();
  // }

  // onUpdate = (id) =>{
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   var taskEditing = tasks[index];
  //   this.setState({
  //     taskEditing : taskEditing
  //   });
  //   this.onShowForm();
  // }

  // onFilter = (filterName, filterStatus) =>{
  //   //console.log(filterName + '-' + filterStatus);
  //   filterStatus = parseInt(filterStatus, 10);
  //   //console.log(typeof filterStatus);
  //   this.setState({
  //     filter : {
  //       name : filterName.toLowerCase(),
  //       status : filterStatus
  //     }
  //   });

  // }

  onSearch = (keyword) =>{
    this.setState({
      keyword : keyword.toLowerCase()
    });
  }

  onSort = (sortBy, sortValue) =>{
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }


  render() {
    var {
        //isDisplayForm, 
        //taskEditing, 
        //filter, 
        //keyword,
        sortBy,
        sortValue
    } = this.state    // var tasks = this.state.tasks

    var { isDisplayForm } = this.props;
    // if(filter){
    //   if(filter.name){
    //     tasks = tasks.filter((task) =>{
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) =>{
    //     if(filter.status === -1){
    //       return task;
    //     }else{
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }

    // if(keyword){
    //   tasks = tasks.filter((task) =>{
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }
    // if(sortBy === 'name'){
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sortValue;
    //     else if(a.name < b.name) return -sortValue;
    //     else return 0;
    //   })
    // }else{
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return -sortValue;
    //     else if(a.status < b.status) return sortValue;
    //     else return 0;
    //   })
    // }
    // var elmTaskForm = isDisplayForm ? 
    //   <TaskForm
    //             onSubmit={ this.onSubmit }
    //             task={ taskEditing }
    //   /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            
            <TaskForm
                onSubmit={ this.onSubmit }
                //task={ taskEditing }
            />
          </div>
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
                                            "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={ this.onToggleForm }
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <Control 
              //onSearch={ this.onSearch }
              //onSort={ this.onSort }
              //sortBy={ sortBy }
              //sortValue= { sortValue }
            />
            <TaskList 
              //onUpdateStatus={ this.onUpdateStatus }
              //onDelete={ this.onDelete }
              //onUpdate={ this.onUpdate }
              //onFilter={ this.onFilter }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditing : state.itemEditing
  };
};

const mapDispatchToProps = (dispatch, props) =>{
  return {
    onToggeForm : () =>{
      dispatch(actions.toggleForm())
    },
    onClearTask : (task) =>{
      dispatch(actions.editTask(task));
    },
    onOpenForm : () =>{
      dispatch(actions.openForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
