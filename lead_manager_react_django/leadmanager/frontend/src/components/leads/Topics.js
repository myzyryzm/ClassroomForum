import React, { Component } from 'react'
import {connect} from "react-redux"
import {getTopics, addTopic, changeTopic, addingTopic} from "../../actions/topics"

export class Topics extends Component {
    state = {
        newTopic: '',
        addingNewTopic: false,
        newDescription: '',
        newLink: ''
    }
    componentDidMount(){
        this.props.getTopics()
    }

    changeTopic = (id) => {
        const{addingNewTopic} = this.state
        this.props.changeTopic(id)
        if(addingNewTopic){
            this.setState({addingNewTopic: false})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: [e.target.value]})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const{newTopic, newDescription, newLink} = this.state
        if(newTopic.length === 0){
            return
        }
        let description = ''
        if(newDescription.length > 0){
            description = newDescription[0]
        }
        let link = ''
        if(newLink.length > 0){
            link = newLink[0]
        }
        let name = newTopic[0]
        let topic = {name, description, link}
        this.props.addTopic(topic)
        this.setState({addingNewTopic: false, newTopic: '', description: '', link: ''})
    }

    showTopicField = () => {
        const{addingNewTopic} = this.state
        if(!addingNewTopic){
            this.setState({addingNewTopic: true})
        }
        this.props.addingTopic()
    }

    render() {
        const{newTopic, addingNewTopic, newDescription, newLink} = this.state
        let tabs = []
        const{topics, activeTopic} = this.props.topics
        let activeDescription = ''
        let activeLink = ''
        if(topics.length > 0){
            tabs = topics.map(topic => {
                if(topic.id === activeTopic){
                    activeDescription = topic.description
                    activeLink = topic.link
                }
                return(
                <div key = {topic.id}>
                    <li className="nav-item">
                        <a onClick = {() => this.changeTopic(topic.id)} className={activeTopic === topic.id && !addingNewTopic ? "nav-link active": "nav-link"} data-toggle="tab" href="#">{topic.name}</a>
                    </li>
                </div>)
            })
        }
        return (
            <div>
                <ul className="nav nav-tabs">
                    {tabs}
                    <li className="nav-item">
                        <p onClick = {() => this.showTopicField()} className={addingNewTopic ? "nav-link active" : "nav-link"} data-toggle="tab" href="#">ADD TOPIC</p>
                    </li>
                </ul>
                {addingNewTopic ? null: 
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="#">
                        <a href = {activeLink}>{activeDescription}</a>
                    </div>
                </div>}
                {!addingNewTopic ? null: 
                <div className="card card-body mt-4 mb-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>New Topic Name</label>
                            <input
                            className="form-control"
                            type="text"
                            name="newTopic"
                            onChange={this.onChange}
                            value={newTopic}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description (optional)</label>
                            <textarea
                            className="form-control"
                            type="text"
                            name="newDescription"
                            onChange={this.onChange}
                            value={newDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Link (optional)</label>
                            <input
                            className="form-control"
                            type="text"
                            name="newLink"
                            onChange={this.onChange}
                            value={newLink}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {topics: state.topics}
}

export default connect(mapStateToProps, {getTopics, changeTopic, addTopic, addingTopic})(Topics)
