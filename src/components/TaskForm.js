import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status: false
        }
    }

    componentDidMount(){
        if(this.props.itemEditing && this.props.itemEditing.id !==null){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        }else if(!nextProps.task){
            this.setState({
                id : '',
                name : '',
                status: false
            });
        }
    }

    onCloseForm = () =>{
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        //this.props.onSubmit(this.state);
        this.props.onAddTask(this.state);
        // Cancel & Close Form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () =>{
        this.setState({
            name : '',
            status : false
        })
    }
    render() {
        if(!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }
                  <span 
                    className="fa fa-times-circle text-right"
                    onClick={ this.onCloseForm }
                ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={ this.onChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            name="status"
                            value={this.state.status}
                            onChange={ this.onChange }
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại</button>&nbsp;
                    <button 
                        type="submit" 
                        className="btn btn-danger"
                        onClick={ this.onClear }
                    >
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () =>{
          dispatch(actions.closeForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
