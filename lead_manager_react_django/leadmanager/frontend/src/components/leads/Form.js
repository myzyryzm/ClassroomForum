import React, { Component } from 'react'
import {addLead} from "../../actions/leads"
import { connect } from 'react-redux'
import PropTypes from "prop-types"

export class Form extends Component {
    constructor(props){
        super(props)
        this.state= {
            name: '',
            email: '',
            message: ''
        }
    }

    static propTypes = {
        addLead: PropTypes.func.isRequired
    };

    onChange = (e) => {
        this.setState({[e.target.name]: [e.target.value]})
    }

    onSubmit = e => {
        e.preventDefault();
        let { name, email, message } = this.state;
        let {topics, activeTopic} = this.props.topics
        let topic = null
        for(let i = 0; i < topics.length; i++){
          if(topics[i].id === activeTopic){
            topic = topics[i]
            break
          }
        }
        let table_id = topic.id
        // console.log(table_id)
        if(message.length === 0){
          return
        }
        name = name.length === 0 ? '': name[0]
        name = this.props.auth.user.username
        email = "h@yahoo.com"
        message = message[0]
        const lead = { name, email, message, table_id };
        // console.log(lead)
        this.props.addLead(lead);
        this.setState({
          name: "",
          email: "",
          message: ""
        });
    };

    render() {
        const { message } = this.state;
        let {addingTopic} = this.props.topics
        if(addingTopic){
          return(<div></div>)
        }
        return (
          <div className="card card-body mt-4 mb-4">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Post</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="message"
                  onChange={this.onChange}
                  value={message}
                />
              </div>
              {this.props.auth.isAuthenticated ? <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>: null}
              
            </form>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {auth: state.auth, topics: state.topics}
}

export default connect(mapStateToProps, {addLead})(Form)
