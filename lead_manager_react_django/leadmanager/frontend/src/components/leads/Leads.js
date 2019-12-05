import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getLeads, deleteLead} from "../../actions/leads"

const mapStateToProps = state => {
    return {leads: state.leads.leads, auth: state.auth, topics: state.topics}
}

export class Leads extends Component {

    static propTypes = {
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getLeads()
    }

    deleteLead = (id) => {
        return this.props.deleteLead(id)
    }

    getTime = (created_at) => {
        let nuDate = new Date(created_at)
        let msDiff = Date.now() - nuDate.getTime()
        let sDiff = Math.floor(msDiff / 1000)
        let minDiff = Math.floor(sDiff/60)
        let hrDiff = Math.floor(minDiff/60)
        let dayDiff = Math.floor(hrDiff / 24)
        if(dayDiff > 0){
            return `${dayDiff} Day${dayDiff === 1 ? "" : "s"} Ago`
        }
        else if(hrDiff > 0){
            return `${hrDiff} Hour${hrDiff === 1 ? "" : "s"} Ago`
        }
        else if(minDiff > 0){
            return `${minDiff} Minute${minDiff === 1 ? "" : "s"} Ago`
        }
        return 'Just Now'
    }

    render() {
        let {activeTopic, addingTopic} = this.props.topics
        if(addingTopic){
            return(<div></div>)
          }
        let grid = null
        if(this.props.leads.length > 0){
            grid = this.props.leads.filter(lead => lead.table_id === activeTopic).map(lead =>{
                let timeStr = this.getTime(lead.created_at)
                return (
                <div key = {lead.id}>
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{lead.name}</h5>
                                <small>{timeStr}</small>
                            </div>
                            <p className="mb-1">{lead.message}</p>
                            {this.props.auth.user !== null && lead.owner === this.props.auth.user.id ?
                            <button onClick = {() => this.deleteLead(lead.id)} className = "btn btn-danger btn-sm">Delete</button> : null}
                        </div>
                    </div>
                </div>
            )})
        }
        return (
            <Fragment>
                {grid}
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, {getLeads, deleteLead})(Leads)

{/* <table className = "table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grid}
                    </tbody>
                </table> */}
// if(this.props.leads.length > 0){
//     console.log(this.props.leads[0].created_at, this.props.auth.user)
//     grid = this.props.leads.map(lead =>{
//         return <tr key = {lead.id}>
//             <td>{lead.id}</td>
//             <td>{lead.name}</td>
//             <td>{lead.email}</td>
//             <td>{lead.message}</td>
//             <td>
//                 {this.props.auth.user !== null && lead.owner === this.props.auth.user.id ?
//                 <button onClick = {() => this.deleteLead(lead.id)} className = "btn btn-danger btn-sm">Delete</button> : null}
//             </td>
//         </tr>
//     })
// }